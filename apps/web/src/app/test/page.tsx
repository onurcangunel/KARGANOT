export default function TestPage() {
  return (
    <div style={{ padding: '50px', backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: 'black', fontSize: '48px' }}>✅ SAYFA ÇALIŞIYOR!</h1>
      <p style={{ color: 'black', fontSize: '24px' }}>
        Eğer bunu görüyorsanız, Next.js düzgün çalışıyor demektir.
      </p>
      <img 
        src="/image/logo.png" 
        alt="Logo" 
        style={{ width: '200px', marginTop: '20px' }} 
      />
    </div>
  )
}
