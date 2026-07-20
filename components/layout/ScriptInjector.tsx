import { getScriptSettings } from "@/lib/codeSnippets";
import Script from "next/script";

export default async function ScriptInjector() {
  const settings = await getScriptSettings().catch(() => null);
  if (!settings) return null;

  const {
    gaMeasurementId,
    gtmContainerId,
    metaPixelId,
    googleSiteVerification,
    snippets = [],
  } = settings;

  const activeSnippets = snippets.filter((s) => s.isActive && s.code && s.code.trim().length > 0);

  const headerSnippets = activeSnippets.filter((s) => s.location === "header");
  const bodyOpenSnippets = activeSnippets.filter((s) => s.location === "body_open");
  const footerSnippets = activeSnippets.filter((s) => s.location === "footer");

  // Google Search Console meta tag cleaning
  let gscContent = "";
  if (googleSiteVerification) {
    if (googleSiteVerification.includes("content=")) {
      const match = googleSiteVerification.match(/content=["']([^"']+)["']/i);
      gscContent = match ? match[1] : googleSiteVerification;
    } else {
      gscContent = googleSiteVerification.replace(/<[^>]*>/g, "").trim();
    }
  }

  return (
    <>
      {/* 1. Google Search Console Meta Verification */}
      {gscContent && (
        <meta name="google-site-verification" content={gscContent} />
      )}

      {/* 2. Google Analytics 4 (GA4) */}
      {gaMeasurementId && gaMeasurementId.trim().length > 0 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId.trim()}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId.trim()}');
            `}
          </Script>
        </>
      )}

      {/* 3. Google Tag Manager (GTM) */}
      {gtmContainerId && gtmContainerId.trim().length > 0 && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmContainerId.trim()}');
          `}
        </Script>
      )}

      {/* 4. Meta (Facebook) Pixel */}
      {metaPixelId && metaPixelId.trim().length > 0 && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId.trim()}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* 5. Custom Header Snippets */}
      {headerSnippets.map((snippet) => (
        <div
          key={snippet.id}
          dangerouslySetInnerHTML={{ __html: snippet.code }}
        />
      ))}

      {/* 6. Custom Body Open Snippets */}
      {bodyOpenSnippets.map((snippet) => (
        <div
          key={snippet.id}
          dangerouslySetInnerHTML={{ __html: snippet.code }}
        />
      ))}

      {/* 7. Custom Footer Snippets */}
      {footerSnippets.map((snippet) => (
        <div
          key={snippet.id}
          dangerouslySetInnerHTML={{ __html: snippet.code }}
        />
      ))}
    </>
  );
}
