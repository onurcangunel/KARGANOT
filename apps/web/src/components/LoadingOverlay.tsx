"use client";
export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/20 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/40 border-t-white" />
    </div>
  );
}
