"use client";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl py-24 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Beklenmedik bir hata oluştu</h1>
      <p className="mt-2 text-gray-600">Bir sorun oluştu. Aşağıdan yeniden deneyebilirsiniz.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={reset} className="rounded-lg bg-black text-white px-4 py-2">Tekrar Dene</button>
        <a href="/" className="rounded-lg border px-4 py-2">Ana sayfa</a>
      </div>
    </div>
  );
}
