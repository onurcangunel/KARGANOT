export default function Loading() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="flex items-center gap-3 text-gray-600">
        <span className="h-3 w-3 rounded-full bg-gray-300 animate-pulse" />
        <span className="h-3 w-3 rounded-full bg-gray-300 animate-pulse [animation-delay:.15s]" />
        <span className="h-3 w-3 rounded-full bg-gray-300 animate-pulse [animation-delay:.3s]" />
        <span>Yükleniyor…</span>
      </div>
    </div>
  );
}
