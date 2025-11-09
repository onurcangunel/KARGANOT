"use client";
// Not: next/script tipi sürüm uyuşmazlığı nedeniyle klasik script etiketi kullanıyoruz.

export default function GoogleTagManager() {
  const id = process.env.NEXT_PUBLIC_GTAG_ID;
  if (!id) return null;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
            gtag('config', '${id}');
          `,
        }}
      />
    </>
  );
}
