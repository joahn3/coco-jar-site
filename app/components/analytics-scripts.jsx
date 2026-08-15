import Script from "next/script";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export default function AnalyticsScripts() {
  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_title: document?.title,
          });
        `}
      </Script>
      <Script id="analytics-events" strategy="afterInteractive">
        {`
          (function() {
            document.addEventListener('click', function(event) {
              var target = event.target.closest('[data-analytics]');
              if (!target || !window.gtag) {
                return;
              }

              var payload = target.getAttribute('data-analytics') || '';
              var parts = payload.split('|');

              window.gtag('event', parts[0] || 'interaction', {
                event_category: parts[1] || 'conversion',
                event_label: parts[2] || window.location.pathname,
              });
            });
          })();
        `}
      </Script>
    </>
  );
}
