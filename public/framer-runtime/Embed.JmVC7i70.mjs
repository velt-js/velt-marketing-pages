import{t as e}from"./rolldown-runtime.gMpkHn_l.mjs";import{D as t,I as n,R as r,U as i,V as a,f as o,j as s,u as c}from"./react.Dy8FWk3w.mjs";import{P as l,c as u,tt as d}from"./framer.PjLCP2eg.mjs";import{A as f,M as p,d as m,g as h}from"./shared.CbYM9CxE.mjs";var g=e((()=>{m()}));function _({type:e,url:t,html:n,zoom:r,radius:i,border:a,style:s={}}){return e===`url`&&t?o(y,{url:t,zoom:r,radius:i,border:a,style:s}):e===`html`&&n?o(x,{html:n,style:s}):o(v,{style:s})}function v({style:e}){return o(`div`,{style:{minHeight:O(e),...p,overflow:`hidden`,...e},children:o(`div`,{style:j,children:`To embed a website or widget, add it to the properties\xA0panel.`})})}function y({url:e,zoom:t,radius:i,border:a,style:s}){let c=!s.height;/[a-z]+:\/\//.test(e)||(e=`https://`+e);let l=h(),[u,d]=r(l?void 0:!1);return n(()=>{if(!l)return;let t=!0;d(void 0);async function n(){let n=t&&d(false)}return n().catch(e=>{console.error(e),d(e)}),()=>{t=!1}},[e]),l&&c?o(D,{message:`URL embeds do not support auto height.`,style:s}):e.startsWith(`https://`)?u===void 0?o(E,{}):u instanceof Error?o(D,{message:u.message,style:s}):u===!0?o(D,{message:`Can’t embed ${e} due to its content security policy.`,style:s}):o(`iframe`,{src:e,style:{...k,...s,...a,zoom:t,borderRadius:i,transformOrigin:`top center`},loading:`lazy`,fetchPriority:l?`low`:`auto`,referrerPolicy:`no-referrer`,sandbox:b(l),allowFullScreen:!0,allow:`presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write`}):o(D,{message:`Unsupported protocol.`,style:s})}function b(e){let t=[`allow-same-origin`,`allow-scripts`];return e||t.push(`allow-downloads`,`allow-forms`,`allow-modals`,`allow-orientation-lock`,`allow-pointer-lock`,`allow-popups`,`allow-popups-to-escape-sandbox`,`allow-presentation`,`allow-storage-access-by-user-activation`,`allow-top-navigation-by-user-activation`),t.join(` `)}function x({html:e,...t}){if(e.includes(`<\/script>`)){let n=e.includes(`</spline-viewer>`),r=e.includes(`<!-- framer-direct-embed -->`);return o(n||r?C:S,{html:e,...t})}return o(w,{html:e,...t})}function S({html:e,style:t}){let a=s(),[c,l]=r(0);n(()=>{let e=a.current?.contentWindow;function t(t){if(t.source!==e)return;let n=t.data;if(typeof n!=`object`||!n)return;let r=n.embedHeight;typeof r==`number`&&l(r)}return i.addEventListener(`message`,t),e?.postMessage(`getEmbedHeight`,`*`),()=>{i.removeEventListener(`message`,t)}},[]);let u=`
<html>
    <head>
        <style>
            html, body {
                margin: 0;
                padding: 0;
            }

            body {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            :root {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            * {
                box-sizing: border-box;
                -webkit-font-smoothing: inherit;
            }

            h1, h2, h3, h4, h5, h6, p, figure {
                margin: 0;
            }

            body, input, textarea, select, button {
                font-size: 12px;
                font-family: sans-serif;
            }
        </style>
    </head>
    <body>
        ${e}
        <script type="module">
            let height = 0

            function sendEmbedHeight() {
                window.parent.postMessage({
                    embedHeight: height
                }, "*")
            }

            const observer = new ResizeObserver((entries) => {
                if (entries.length !== 1) return
                const entry = entries[0]
                if (entry.target !== document.body) return

                height = entry.contentRect.height
                sendEmbedHeight()
            })

            observer.observe(document.body)

            window.addEventListener("message", (event) => {
                if (event.source !== window.parent) return
                if (event.data !== "getEmbedHeight") return
                sendEmbedHeight()
            })
        <\/script>
    <body>
</html>
`,d={...k,...t};return t.height||(d.height=c+`px`),o(`iframe`,{ref:a,style:d,srcDoc:u})}function C({html:e,style:t}){let r=s();return n(()=>{let t=r.current;if(t)return t.innerHTML=e,T(t),()=>{t.innerHTML=``}},[e]),o(`div`,{ref:r,style:{...A,...t}})}function w({html:e,style:t}){return o(`div`,{style:{...A,...t},dangerouslySetInnerHTML:{__html:e}})}function T(e){if(e instanceof Element&&e.tagName===`SCRIPT`){let t=document.createElement(`script`);t.text=e.innerHTML;for(let{name:n,value:r}of e.attributes)t.setAttribute(n,r);e.parentElement.replaceChild(t,e)}else for(let t of e.childNodes)T(t)}function E(){return o(`div`,{className:`framerInternalUI-componentPlaceholder`,style:{...f,overflow:`hidden`},children:o(`div`,{style:j,children:`Loading…`})})}function D({message:e,style:t}){return o(`div`,{className:`framerInternalUI-errorPlaceholder`,style:{minHeight:O(t),...f,overflow:`hidden`,...t},children:o(`div`,{style:j,children:e})})}function O(e){if(!e.height)return 200}var k,A,j,M=e((()=>{a(),c(),t(),d(),g(),l(_,{type:{type:u.Enum,defaultValue:`url`,displaySegmentedControl:!0,options:[`url`,`html`],optionTitles:[`URL`,`HTML`]},url:{title:`URL`,type:u.String,description:`Some websites don’t support embedding.`,hidden(e){return e.type!==`url`}},html:{title:`HTML`,type:u.String,displayTextArea:!0,hidden(e){return e.type!==`html`}},border:{title:`Border`,type:u.Border,optional:!0,hidden(e){return e.type!==`url`}},radius:{type:u.BorderRadius,title:`Radius`,hidden(e){return e.type!==`url`}},zoom:{title:`Zoom`,defaultValue:1,type:u.Number,hidden(e){return e.type!==`url`},min:.1,max:1,step:.1,displayStepper:!0}}),k={width:`100%`,height:`100%`,border:`none`},A={width:`100%`,height:`100%`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`},j={textAlign:`center`,minWidth:140}}));export{M as n,_ as t};
//# sourceMappingURL=Embed.JmVC7i70.mjs.map