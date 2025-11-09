export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-24 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Sayfa bulunamadı</h1>
      <p className="mt-2 text-gray-600">Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.</p>
      <a href="/" className="mt-6 inline-block rounded-lg border px-4 py-2">Ana sayfa</a>
    </div>
  );
}
