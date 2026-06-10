// Site-wide analytics tag pile. Ported 1:1 from the legacy Framer site's
// "End of <head>" custom-code block. Each tool keeps its original
// snippet shape so any analytics dashboards keep working without
// re-instrumentation.
//
// Tools in flight (in load order):
//   1.  Termly  — cookie-consent resource blocker (autoBlock=off,
//       so it loads but doesn't actively gate anything until consent UX
//       lands)
//   2.  Mixpanel — custom CDN at cdn.velt.dev/mp/lib.min.js, custom
//       api_host. Session recording + heatmap + autocapture enabled.
//   3.  Amplitude — session-replay plugin at 100% sample rate.
//   4.  Google — gtag for both Google Ads (conversion ID
//       AW-16764728482) and GA4 (measurement ID G-6D523BSLHR).
//       Single gtag.js load, two config() calls.
//   5.  Reddit Pixel — a2_g76ztnxffwu2.
//   6.  Twitter (X) Pixel — ootae.
//   7.  Apollo — appId 65e19e14dc524f01c61d1357.
//   8.  reb2b  — Q6J2RHMPWQ6D.
//   9.  Common Room — site 08f69d8a-754c-4c96-a7de-bef17fb066e1.
//   10. Intercom — app_id fxx14qnk (chat widget).
//   11. Calendly listener — listens for `calendly.event_scheduled`
//       postMessages and fires a `demoBooked` event on Mixpanel and
//       Koala (`window.ko`) with the page's query-string params.
//
// All use next/script `afterInteractive` so they fire after hydration
// without blocking initial paint. Script execution order is preserved
// within the same strategy bucket, which matters for the Amplitude /
// gtag pairs (external load → init) and for Mixpanel (custom URL var
// captured by the stub IIFE via closure).

import Script from "next/script";

export function Analytics() {
  return (
    <>
      {/* 1. Termly — resource blocker (autoBlock off; consent gating
          is handled out-of-band). */}
      <Script
        id="termly"
        src="https://app.termly.io/resource-blocker/a111c3d7-6bd6-43c8-9893-b926f0e05f4e?autoBlock=off"
        strategy="afterInteractive"
      />

      {/* 2. Mixpanel — custom CDN, custom api_host, session recording.
          Combined into a single tag so the IIFE captures
          MIXPANEL_CUSTOM_LIB_URL via lexical scope. Framer's original
          split (var in one <script>, IIFE in another) would have made
          the const script-scoped and inaccessible, silently falling
          back to Mixpanel's default CDN. */}
      <Script id="mixpanel" strategy="afterInteractive">
        {`
          const MIXPANEL_CUSTOM_LIB_URL = "https://cdn.velt.dev/mp/lib.min.js";
          (function (f, b) { if (!b.__SV) { var e, g, i, h; window.mixpanel = b; b._i = []; b.init = function (e, f, c) { function g(a, d) { var b = d.split("."); 2 == b.length && ((a = a[b[0]]), (d = b[1])); a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); }; } var a = b; "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel"); a.people = a.people || []; a.toString = function (a) { var d = "mixpanel"; "mixpanel" !== c && (d += "." + c); a || (d += " (stub)"); return d; }; a.people.toString = function () { return a.toString(1) + ".people (stub)"; }; i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" "); for (h = 0; h < i.length; h++) g(a, i[h]); var j = "set set_once union unset remove delete".split(" "); a.get_group = function () { function b(c) { d[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; } for (var d = {}, e = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]); return d; }; b._i.push([e, f, c]); }; b.__SV = 1.2; e = f.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === f.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; g = f.getElementsByTagName("script")[0]; g.parentNode.insertBefore(e, g); } })(document, window.mixpanel || []);
          if (window.mixpanel) {
            window.mixpanel.init("6fe5c5cd3adeb341288776482e7bb147", {
              track_pageview: "full-url",
              api_host: "https://cdn.velt.dev/mp",
              record_sessions_percent: 100,
              record_heatmap_data: true,
              autocapture: {
                pageview: "full-url",
                click: true,
                input: true,
                scroll: true,
                submit: true,
                capture_text_content: true,
              },
            });
          }
        `}
      </Script>

      {/* 3. Amplitude — base SDK bundle + session-replay plugin. The
          bundled stub queues init() calls until the actual SDK loads,
          so the inline init script directly after the external src
          is safe. */}
      <Script
        id="amplitude-sdk"
        src="https://cdn.amplitude.com/script/b539efb895d43d961b136736cba0d585.js"
        strategy="afterInteractive"
      />
      <Script id="amplitude-init" strategy="afterInteractive">
        {`
          if (window.amplitude && window.sessionReplay) {
            window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
            window.amplitude.init('b539efb895d43d961b136736cba0d585', {
              fetchRemoteConfig: true,
              autocapture: {
                attribution: true,
                fileDownloads: true,
                formInteractions: true,
                pageViews: true,
                sessions: true,
                elementInteractions: true,
                networkTracking: true,
                webVitals: true,
                frustrationInteractions: true,
              },
            });
          }
        `}
      </Script>

      {/* 4. Google gtag — single SDK load services both Google Ads
          (conversion ID AW-16764728482) and GA4 (measurement ID
          G-6D523BSLHR). Per Google's docs, gtag.js only needs to be
          loaded once with any valid ID; additional properties are
          activated via subsequent gtag('config', ID) calls. */}
      <Script
        id="gtag-sdk"
        src="https://www.googletagmanager.com/gtag/js?id=G-6D523BSLHR"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-6D523BSLHR');
          gtag('config', 'AW-16764728482');
        `}
      </Script>

      {/* 5. Reddit Pixel — async loader + init + PageVisit track. */}
      <Script id="reddit-pixel" strategy="afterInteractive">
        {`
          !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          rdt('init','a2_g76ztnxffwu2');
          rdt('track', 'PageVisit');
        `}
      </Script>

      {/* 6. Twitter / X Pixel — config-only (no track call). */}
      <Script id="x-pixel" strategy="afterInteractive">
        {`
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','ootae');
        `}
      </Script>

      {/* 7. Apollo — async loader + tracking onLoad. */}
      <Script id="apollo" strategy="afterInteractive">
        {`
          function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"65e19e14dc524f01c61d1357"})},document.head.appendChild(o)}
          initApollo();
        `}
      </Script>

      {/* 8. reb2b — async loader for visitor identification. */}
      <Script id="reb2b" strategy="afterInteractive">
        {`
          !function(key) { if (window.reb2b) return; window.reb2b = { loaded: true }; var s = document.createElement("script"); s.async = true; s.src = "https://b2bjsstore.s3.us-west-2.amazonaws.com/b/" + key + "/" + key + ".js.gz"; document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]); }("Q6J2RHMPWQ6D");
        `}
      </Script>

      {/* 9. Common Room (cr-relay) — signals stub + async loader. */}
      <Script id="common-room" strategy="afterInteractive">
        {`
          (function() {
            if (typeof window === 'undefined') return;
            if (typeof window.signals !== 'undefined') return;
            var script = document.createElement('script');
            script.src = 'https://cdn.cr-relay.com/v1/site/08f69d8a-754c-4c96-a7de-bef17fb066e1/signals.js';
            script.async = true;
            window.signals = Object.assign([], ['page', 'identify', 'form'].reduce(function (acc, method){ acc[method] = function () { signals.push([method, arguments]); return signals; }; return acc; }, {}));
            document.head.appendChild(script);
          })();
        `}
      </Script>

      {/* 10. Intercom chat widget — settings + bootstrap stub combined
          so window.intercomSettings is populated before the stub runs
          (otherwise the widget loads with empty config and the
          app_id never reaches Intercom). */}
      <Script id="intercom" strategy="afterInteractive">
        {`
          window.intercomSettings = {
            api_base: "https://api-iam.intercom.io",
            app_id: "fxx14qnk"
          };
          (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/fxx14qnk';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
        `}
      </Script>

      {/* 11. Calendly listener — fires `demoBooked` on Mixpanel
          (loaded above) and Koala (window.ko if present) whenever
          the embedded Calendly widget reports a successful booking.
          Wrapped in an IIFE so the helper fns don't pollute window. */}
      <Script id="calendly-listener" strategy="afterInteractive">
        {`
          (function() {
            function getAllQueryParams() {
              var search = window.location.search;
              if (!search) return {};
              var params = new URLSearchParams(search);
              var queryParams = {};
              if (params) {
                for (var pair of params) {
                  queryParams[pair[0]] = pair[1];
                }
              }
              return queryParams;
            }
            function isCalendlyEvent(e) {
              return e.data && e.data.event && e.data.event.indexOf('calendly') === 0;
            }
            window.addEventListener('message', function(e) {
              if (!isCalendlyEvent(e)) return;
              if (e.data.event !== 'calendly.event_scheduled') return;
              var queryParams = getAllQueryParams();
              if (window.mixpanel) window.mixpanel.track('demoBooked', queryParams);
              if (window.ko) window.ko.track('demoBooked', queryParams);
            });
          })();
        `}
      </Script>
    </>
  );
}
