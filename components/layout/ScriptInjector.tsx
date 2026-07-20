"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface CodeSnippet {
  id: string;
  name: string;
  location: "header" | "body_open" | "footer";
  code: string;
  isActive: boolean;
}

interface ScriptSettings {
  gaMeasurementId?: string;
  gtmContainerId?: string;
  metaPixelId?: string;
  googleSiteVerification?: string;
  snippets: CodeSnippet[];
}

export default function ScriptInjector() {
  const [settings, setSettings] = useState<ScriptSettings | null>(null);

  useEffect(() => {
    fetch("/api/code-snippets", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!settings) return;

    const activeSnippets = (settings.snippets || []).filter(
      (s) => s.isActive && s.code && s.code.trim().length > 0
    );

    activeSnippets.forEach((snippet) => {
      const elementId = `custom-snippet-${snippet.id}`;
      if (document.getElementById(elementId)) return;

      const container = document.createElement("div");
      container.id = elementId;
      container.innerHTML = snippet.code;

      const scriptTags = container.querySelectorAll("script");
      scriptTags.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });

      if (snippet.location === "header") {
        document.head.appendChild(container);
      } else if (snippet.location === "body_open") {
        document.body.insertBefore(container, document.body.firstChild);
      } else {
        document.body.appendChild(container);
      }
    });
  }, [settings]);

  if (!settings) return null;

  const { gaMeasurementId, gtmContainerId, metaPixelId } = settings;

  return (
    <>
      {/* Google Analytics 4 (GA4) */}
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

      {/* Google Tag Manager (GTM) */}
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

      {/* Meta (Facebook) Pixel */}
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
    </>
  );
}
