"use client";
import React from 'react';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export function GTMScript() {
  if (!GTM_ID) return null;
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script async src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
  );
}

export function GTMNoScript() {
  if (!GTM_ID) return null;
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
"use client";
import Script from 'next/script';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export function GTMHead() {
  if (!GTM_ID || process.env.NODE_ENV !== 'production') return null;
  return (
    <Script id="gtm-script" strategy="afterInteractive">
      {`(function(w,d, s, l, i){
        w[l]=w[l]||[]; w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
        j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f);
      })(window, document, 'script', 'dataLayer', '${GTM_ID}');`}
    </Script>
  );
}

export function GTMNoScript() {
  if (!GTM_ID || process.env.NODE_ENV !== 'production') return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
