export default function NotFoundPage() {
  return (
    <main style={{ padding: 32, textAlign: 'center' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Sayfa bulunamadı</h1>
      <p style={{ marginTop: 8, color: '#666' }}>Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: 16, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8 }}>Ana sayfa</a>
    </main>
  );
}
