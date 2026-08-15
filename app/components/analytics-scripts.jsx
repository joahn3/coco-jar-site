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
              var extra = {};
              parts = parts.map(function(item) {
                return String(item || '').trim();
              });

              while (parts.length > 0 && parts[0] === '') {
                parts.shift();
              }

              var eventName = parts.shift() || 'interaction';
              var eventCategory = parts.shift() || 'conversion';
              var eventLabel = parts.shift() || window.location.pathname;

              parts.forEach(function(item) {
                if (!item) {
                  return;
                }

                var separator = item.indexOf('=');
                if (separator === -1) {
                  return;
                }

                var key = item.slice(0, separator).trim();
                var value = item.slice(separator + 1).trim();

                if (!key) {
                  return;
                }

                extra[key] = value || 'nedefinit';
              });

              var eventData = {
                event_category: eventCategory,
                event_label: eventLabel,
                source_page: extra.source_page || extra.source || window.location.pathname,
                journey_stage: extra.journey_stage || extra.journey || 'not_set',
                lead_type: extra.lead_type || 'general',
              };

              Object.keys(extra).forEach(function(key) {
                if (
                  key !== 'source' &&
                  key !== 'journey' &&
                  key !== 'lead_type'
                ) {
                  eventData[key] = extra[key];
                }
              });

              window.gtag('event', eventName, eventData);
            });
          })();
        `}
      </Script>
    </>
  );
}
