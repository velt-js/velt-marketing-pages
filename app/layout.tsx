import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before Next.js's dev error-overlay mounts. Two purposes:
            1. Swallow `unhandledrejection`s for Framer's missing dynamic imports
               (CMS/snippet chunks aren't shipped with the static export).
            2. Patch `console.error` to drop known-harmless Framer warnings.
            The IIFE guards against double-install via __framerWarningsPatched. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==="undefined"||window.__framerWarningsPatched)return;window.__framerWarningsPatched=true;var SUPPRESS=["__withFX","parentSize","providedWindow","motionChild","scopeId","clickTrackingId","preserveParams","relValues","element.ref was removed","Accessing element.ref was removed",'unique "key" prop',"hydration","Hydration","Invalid DOM property","non-boolean attribute","React does not recognize","Unknown event handler","Using kebab-case","aria-","Failed to import collection module","Failed to fetch dynamically imported module","Failed to fetch","Fatal error","framer.com/contact","/framer-runtime/"];function shouldSuppress(args){var msg=args.map(function(a){return typeof a==="string"?a:(a&&a.message)||"";}).join(" ");for(var i=0;i<SUPPRESS.length;i++){if(msg.indexOf(SUPPRESS[i])>=0)return true;}return false;}function installConsoleErrorPatch(){var upstream=console.error.bind(console);var patched=function(){var args=Array.prototype.slice.call(arguments);if(shouldSuppress(args))return;upstream.apply(null,args);};patched.__framerSuppressWrapper=true;console.error=patched;}installConsoleErrorPatch();setTimeout(function(){if(!console.error.__framerSuppressWrapper)installConsoleErrorPatch();},0);setTimeout(function(){if(!console.error.__framerSuppressWrapper)installConsoleErrorPatch();},500);setTimeout(function(){if(!console.error.__framerSuppressWrapper)installConsoleErrorPatch();},2000);window.addEventListener("unhandledrejection",function(e){var r=e&&e.reason;var m=(r&&r.message)||String(r||"");for(var i=0;i<SUPPRESS.length;i++){if(m.indexOf(SUPPRESS[i])>=0){e.preventDefault();e.stopImmediatePropagation();return;}}},true);})();`,
          }}
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
