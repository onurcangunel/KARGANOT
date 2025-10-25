// YÖK ATLAS Cache & Storage Manager
// localStorage + IndexedDB ile akıllı cache yönetimi

interface CacheItem<T> {
  data: T
  timestamp: number
  version: string
}

class YokAtlasCache {
  private dbName = 'yokatlas-cache'
  private storeName = 'data'
  private version = '2.0.0'
  private cacheTimeout = 24 * 60 * 60 * 1000 // 24 saat
  
  private db: IDBDatabase | null = null

  // IndexedDB başlat
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName)
        }
      }
    })
  }

  // Veri kaydet (hem localStorage hem IndexedDB)
  async set<T>(key: string, data: T): Promise<void> {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      version: this.version
    }

    // localStorage'a kaydet (hızlı erişim için)
    try {
      localStorage.setItem(
        `yokatlas_${key}`,
        JSON.stringify(cacheItem)
      )
    } catch (e) {
      console.warn('localStorage full, using only IndexedDB')
    }

    // IndexedDB'ye kaydet (büyük veriler için)
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        const request = store.put(cacheItem, key)
        
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    }
  }

  // Veri oku (önce localStorage, sonra IndexedDB)
  async get<T>(key: string): Promise<T | null> {
    // Önce localStorage'dan dene (hızlı)
    try {
      const cached = localStorage.getItem(`yokatlas_${key}`)
      if (cached) {
        const item: CacheItem<T> = JSON.parse(cached)
        
        // Version kontrolü
        if (item.version !== this.version) {
          console.log(`Cache version mismatch for ${key}, invalidating`)
          this.delete(key)
          return null
        }
        
        // Timeout kontrolü
        if (Date.now() - item.timestamp < this.cacheTimeout) {
          console.log(`✅ Cache hit (localStorage): ${key}`)
          return item.data
        }
      }
    } catch (e) {
      console.warn('localStorage read error:', e)
    }

    // IndexedDB'den dene (yavaş ama güvenilir)
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db!.transaction([this.storeName], 'readonly')
        const store = transaction.objectStore(this.storeName)
        const request = store.get(key)
        
        request.onsuccess = () => {
          const item = request.result as CacheItem<T> | undefined
          
          if (item && item.version === this.version && 
              Date.now() - item.timestamp < this.cacheTimeout) {
            console.log(`✅ Cache hit (IndexedDB): ${key}`)
            resolve(item.data)
          } else {
            resolve(null)
          }
        }
        
        request.onerror = () => resolve(null)
      })
    }

    return null
  }

  // Cache temizle
  async delete(key: string): Promise<void> {
    localStorage.removeItem(`yokatlas_${key}`)
    
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        store.delete(key)
        transaction.oncomplete = () => resolve()
      })
    }
  }

  // Tüm cache'i temizle
  async clear(): Promise<void> {
    // localStorage temizle
    Object.keys(localStorage)
      .filter(key => key.startsWith('yokatlas_'))
      .forEach(key => localStorage.removeItem(key))
    
    // IndexedDB temizle
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        store.clear()
        transaction.oncomplete = () => resolve()
      })
    }
  }
}

// Singleton instance
export const yokAtlasCache = new YokAtlasCache()

// Initialize on load
if (typeof window !== 'undefined') {
  yokAtlasCache.init().catch(console.error)
}
