export default function Error500Page() {
  return (
    <main style={{ padding: 32, textAlign: 'center' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Sunucu Hatası</h1>
      <p style={{ marginTop: 8, color: '#666' }}>Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: 16, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8 }}>Ana sayfa</a>
    </main>
  );
}
