import{t as e}from"./rolldown-runtime.gMpkHn_l.mjs";import{D as t,H as n,U as r,V as i,f as a,n as o,p as s,r as c,t as l,u}from"./react.Dy8FWk3w.mjs";import{C as d,t as f}from"./motion.v2krrVOQ.mjs";import{P as p,c as m,tt as h}from"./framer.PjLCP2eg.mjs";import{A as g,C as _,D as v,E as ee,M as y,N as b,S as te,T as x,b as S,h as C,p as w,v as T,w as E,y as ne}from"./shared.CbYM9CxE.mjs";import{t as re}from"./default-utils.js@_0.45.JI8dJ5A-.mjs";function D(e,t){M(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function O(e,t){t===void 0&&(t={});var n=t.insertAt;if(!(!e||typeof document>`u`)){var r=document.head||document.getElementsByTagName(`head`)[0],i=document.createElement(`style`);i.type=`text/css`,n===`top`&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y=e((()=>{i(),l(),k=`default`in o?c:o,A={},Object.defineProperty(A,`__esModule`,{value:!0}),j=k,M=function(e,t){return M=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},M(e,t)},N=function(){return N=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},N.apply(this,arguments)},O(`/*
  code is extracted from Calendly's embed stylesheet: https://assets.calendly.com/assets/external/widget.css
*/

.calendly-inline-widget,
.calendly-inline-widget *,
.calendly-badge-widget,
.calendly-badge-widget *,
.calendly-overlay,
.calendly-overlay * {
    font-size:16px;
    line-height:1.2em
}

.calendly-inline-widget iframe,
.calendly-badge-widget iframe,
.calendly-overlay iframe {
    display:inline;
    width:100%;
    height:100%
}

.calendly-popup-content {
    position:relative
}

.calendly-popup-content.calendly-mobile {
    -webkit-overflow-scrolling:touch;
    overflow-y:auto
}

.calendly-overlay {
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow:hidden;
    z-index:9999;
    background-color:#a5a5a5;
    background-color:rgba(31,31,31,0.4)
}

.calendly-overlay .calendly-close-overlay {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0
}

.calendly-overlay .calendly-popup {
    box-sizing:border-box;
    position:absolute;
    top:50%;
    left:50%;
    -webkit-transform:translateY(-50%) translateX(-50%);
    transform:translateY(-50%) translateX(-50%);
    width:80%;
    min-width:900px;
    max-width:1000px;
    height:90%;
    max-height:680px
}

@media (max-width: 975px) {
    .calendly-overlay .calendly-popup {
        position:fixed;
        top:50px;
        left:0;
        right:0;
        bottom:0;
        -webkit-transform:none;
        transform:none;
        width:100%;
        height:auto;
        min-width:0;
        max-height:none
    }
}

.calendly-overlay .calendly-popup .calendly-popup-content {
    height:100%;
}

.calendly-overlay .calendly-popup-close {
    position:absolute;
    top:25px;
    right:25px;
    color:#fff;
    width:19px;
    height:19px;
    cursor:pointer;
    background:url(https://assets.calendly.com/assets/external/close-icon.svg) no-repeat;
    background-size:contain
}

@media (max-width: 975px) {
    .calendly-overlay .calendly-popup-close {
        top:15px;
        right:15px
    }
}

.calendly-badge-widget {
    position:fixed;
    right:20px;
    bottom:15px;
    z-index:9998
}

.calendly-badge-widget .calendly-badge-content {
    display:table-cell;
    width:auto;
    height:45px;
    padding:0 30px;
    border-radius:25px;
    box-shadow:rgba(0,0,0,0.25) 0 2px 5px;
    font-family:sans-serif;
    text-align:center;
    vertical-align:middle;
    font-weight:bold;
    font-size:14px;
    color:#fff;
    cursor:pointer
}

.calendly-badge-widget .calendly-badge-content.calendly-white {
    color:#666a73
}

.calendly-badge-widget .calendly-badge-content span {
    display:block;
    font-size:12px
}

.calendly-spinner {
    position:absolute;
    top:50%;
    left:0;
    right:0;
    -webkit-transform:translateY(-50%);
    transform:translateY(-50%);
    text-align:center;
    z-index:-1
}

.calendly-spinner>div {
    display:inline-block;
    width:18px;
    height:18px;
    background-color:#e1e1e1;
    border-radius:50%;
    vertical-align:middle;
    -webkit-animation:calendly-bouncedelay 1.4s infinite ease-in-out;
    animation:calendly-bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode:both;
    animation-fill-mode:both
}

.calendly-spinner .calendly-bounce1 {
    -webkit-animation-delay:-0.32s;
    animation-delay:-0.32s
}

.calendly-spinner .calendly-bounce2 {
    -webkit-animation-delay:-0.16s;
    animation-delay:-0.16s
}

@-webkit-keyframes calendly-bouncedelay {
    0%,80%,100% {
        -webkit-transform:scale(0);
        transform:scale(0)
    } 
    
    40%{
        -webkit-transform:scale(1);
        transform:scale(1)
    }
}

@keyframes calendly-bouncedelay{ 
    0%,80%,100% {
        -webkit-transform:scale(0);
        transform:scale(0)
    }
    
    40% {
        -webkit-transform:scale(1);
        transform:scale(1)
    }
}`),P=function(){return function(){r.Calendly={},r.Calendly._util={}}.call(r),r.Calendly._util.domReady=function(e){var t=!1,n=function(){document.addEventListener?(document.removeEventListener(`DOMContentLoaded`,i),r.removeEventListener(`load`,i)):(document.detachEvent(`onreadystatechange`,i),r.detachEvent(`onload`,i))},i=function(){t||!document.addEventListener&&event.type!==`load`&&document.readyState!==`complete`||(t=!0,n(),e())};if(document.readyState===`complete`)e();else if(document.addEventListener)document.addEventListener(`DOMContentLoaded`,i),r.addEventListener(`load`,i);else{document.attachEvent(`onreadystatechange`,i),r.attachEvent(`onload`,i);var a=!1;try{a=r.frameElement==null&&document.documentElement}catch{}a&&a.doScroll&&function r(){if(!t){try{a.doScroll(`left`)}catch{return setTimeout(r,50)}t=!0,n(),e()}}()}},r.Calendly._util.assign=function(e){if(e==null)throw TypeError(`Cannot convert undefined or null to object`);for(var t=Object(e),n=1;n<arguments.length;n++){var r=arguments[n];if(r!=null)for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},function(){r.Calendly._url={},r.Calendly._url.extractQueryStringParams=function(e){var t,n,r,i,a,o,s,c,l,u;for(s=document.createElement(`a`),s.href=e,a=s.search.substr(1),o={},c=a.split(`&`),t=0,r=c.length;r>t;t++)i=c[t],l=i.split(`=`),n=l[0],u=l[1],u!==void 0&&(o[n.toLowerCase()]=decodeURIComponent(u));return o},r.Calendly._url.stripQuery=function(e){return e.split(`?`)[0]}}.call(r),function(){r.Calendly._util.snakeCaseKeys=function(e){var t,n,r={};for(n in e)t=n.split(/(?=[A-Z])/).join(`_`).toLowerCase(),r[t]=e[n];return r},r.Calendly._util.pick=function(e,t){var n,r,i,a;if(e){for(a={},n=0,i=t.length;i>n;n++)r=t[n],e[r]&&(a[r]=e[r]);return a}}}.call(r),function(e,t){var n={exports:{}};n.exports=A,t(n.exports),e.bodyScrollLock=n.exports}(r,function(e){function t(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(e,`__esModule`,{value:!0});var n=!1;if(r!==void 0){var i={get passive(){n=!0}};r.addEventListener(`testPassive`,null,i),r.removeEventListener(`testPassive`,null,i)}var a=r!==void 0&&r.navigator&&r.navigator.platform&&/iP(ad|hone|od)/.test(r.navigator.platform),o=[],s=!1,c=-1,l=void 0,u=void 0,d=function(e){return o.some(function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))})},f=function(e){var t=e||r.event;return d(t.target)||t.touches.length>1?!0:(t.preventDefault&&t.preventDefault(),!1)},p=function(e){setTimeout(function(){if(u===void 0){var t=!!e&&e.reserveScrollBarGap===!0,n=r.innerWidth-document.documentElement.clientWidth;t&&n>0&&(u=document.body.style.paddingRight,document.body.style.paddingRight=n+`px`)}l===void 0&&(l=document.body.style.overflow,document.body.style.overflow=`hidden`)})},m=function(){setTimeout(function(){u!==void 0&&(document.body.style.paddingRight=u,u=void 0),l!==void 0&&(document.body.style.overflow=l,l=void 0)})},h=function(e){return e?e.scrollHeight-e.scrollTop<=e.clientHeight:!1},g=function(e,t){var n=e.targetTouches[0].clientY-c;return d(e.target)?!1:t&&t.scrollTop===0&&n>0||h(t)&&0>n?f(e):(e.stopPropagation(),!0)};e.disableBodyScroll=function(e,r){if(a){if(!e)return void console.error(`disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.`);if(e&&!o.some(function(t){return t.targetElement===e})){var i={targetElement:e,options:r||{}};o=[].concat(t(o),[i]),e.ontouchstart=function(e){e.targetTouches.length===1&&(c=e.targetTouches[0].clientY)},e.ontouchmove=function(t){t.targetTouches.length===1&&g(t,e)},s||=(document.addEventListener(`touchmove`,f,n?{passive:!1}:void 0),!0)}}else{p(r);var l={targetElement:e,options:r||{}};o=[].concat(t(o),[l])}},e.clearAllBodyScrollLocks=function(){a?(o.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),s&&=(document.removeEventListener(`touchmove`,f,n?{passive:!1}:void 0),!1),o=[],c=-1):(m(),o=[])},e.enableBodyScroll=function(e){if(a){if(!e)return void console.error(`enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.`);e.ontouchstart=null,e.ontouchmove=null,o=o.filter(function(t){return t.targetElement!==e}),s&&o.length===0&&(document.removeEventListener(`touchmove`,f,n?{passive:!1}:void 0),s=!1)}else o=o.filter(function(t){return t.targetElement!==e}),o.length||m()}}),function(){var e,t,n,i,a;r.Calendly._autoLoadInlineWidgets=function(){return r.Calendly._util.domReady(function(){return t()})},r.Calendly.initBadgeWidget=function(t){return r.Calendly._util.domReady(function(){return e(t)})},r.Calendly.destroyBadgeWidget=function(){return r.Calendly.badgeWidget?(r.Calendly.badgeWidget.destroy(),delete r.Calendly.badgeWidget):void 0},r.Calendly.initPopupWidget=function(e){return r.Calendly._util.domReady(function(){return r.Calendly.showPopupWidget(e.url,`PopupButton`,e)})},r.Calendly.initInlineWidget=function(e){return e.url?(e.parentElement||=i(),r.Calendly._util.domReady(function(){return e.embedType=`Inline`,new r.Calendly.Iframe(e)})):void 0},r.Calendly.showPopupWidget=function(e,t,n){var i;return t??=`PopupButton`,n??={},r.Calendly.closePopupWidget(),i=function(){return delete r.Calendly.popupWidget},r.Calendly.popupWidget=new r.Calendly.PopupWidget(e,i,t,n),r.Calendly.popupWidget.show()},r.Calendly.closePopupWidget=function(){return r.Calendly.popupWidget?r.Calendly.popupWidget.close():void 0},i=function(){var e;return e=document.scripts[document.scripts.length-1],e.parentNode},t=function(){var e,t,n,i,o;for(t=document.querySelectorAll(`.calendly-inline-widget`),o=[],n=0,i=t.length;i>n;n++)e=t[n],a(e)?o.push(void 0):(e.setAttribute(`data-processed`,!0),o.push(new r.Calendly.Iframe({parentElement:e,inlineStyles:!0,embedType:`Inline`})));return o},a=function(e){return e.getAttribute(`data-processed`)||e.getAttribute(`data-auto-load`)===`false`},e=function(e){var t,i,a;return r.Calendly.destroyBadgeWidget(),t=n(e),a=function(){return r.Calendly.showPopupWidget(e.url,`PopupWidget`,e)},i=r.Calendly._util.assign({onClick:a},t),r.Calendly.badgeWidget=new r.Calendly.BadgeWidget(i)},n=function(e){var t,n;return t=[`color`,`textColor`,`text`,`branding`],n={},t.forEach(function(t){return n[t]=e[t],delete e[t]}),n}}.call(r),function(){r.Calendly.Iframe=function(){function e(e){this.options=e,this.parseOptions(),this.build(),this.inject()}return e.prototype.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n.userAgent),e.prototype.parseOptions=function(){var e;if(e={inlineStyles:!1},this.options=r.Calendly._util.assign({},e,this.options),this.parent=this.options.parentElement,!this.parent)throw`Calendly: Parent element not set`;if(this.parent.jquery&&(this.parent=this.parent[0]),this.inlineStyles=this.options.inlineStyles,this.embedType=this.options.embedType,this.url=(this.options.url||this.getUrlFromParent()).split(`#`)[0],!this.url)throw`Calendly: Widget URL not set`},e.prototype.build=function(){return this.node=document.createElement(`iframe`),this.node.src=this.getSource(),this.node.width=`100%`,this.node.height=`100%`,this.node.frameBorder=`0`,this.node.onload=function(){var e=document.querySelector(`.calendly-spinner`);e&&(e.style.visibility=`hidden`)}},e.prototype.inject=function(){return this.format(),this.parent.appendChild(this.buildSpinner()),this.parent.appendChild(this.node)},e.prototype.getSource=function(){var e;return e=r.Calendly._url.stripQuery(this.url)+`?`+this.getParams(),this.filterConsentParam(e)},e.prototype.getUrlFromParent=function(){return this.parent.getAttribute(`data-url`)},e.prototype.getParams=function(){var e,t={embed_domain:this.getDomain(),embed_type:this.embedType},n,i;for(e in t=r.Calendly._util.assign(t,this.getUtmParamsFromHost(),this.getParamsFromUrl(),this.getParamsFromOptions()),n=[],t)i=t[e],n.push(e+`=`+encodeURIComponent(i));return n.join(`&`)},e.prototype.getUtmParamsFromHost=function(){var e,t;return e=[`utm_campaign`,`utm_source`,`utm_medium`,`utm_content`,`utm_term`],t=r.Calendly._url.extractQueryStringParams(r.location.href),r.Calendly._util.pick(t,e)},e.prototype.getParamsFromUrl=function(){return r.Calendly._url.extractQueryStringParams(this.url)},e.prototype.getParamsFromOptions=function(){return r.Calendly._util.assign({},this.getPrefillParams(),this.getUtmParams())},e.prototype.getUtmParams=function(){var e;return this.options.utm?(e=[`utmCampaign`,`utmSource`,`utmMedium`,`utmContent`,`utmTerm`],r.Calendly._util.snakeCaseKeys(r.Calendly._util.pick(this.options.utm,e))):null},e.prototype.getPrefillParams=function(){var e,t,n,i,a;if(!this.options.prefill)return null;if(t=[`name`,`firstName`,`lastName`,`email`,`location`],n=r.Calendly._util.snakeCaseKeys(r.Calendly._util.pick(this.options.prefill,t)),this.options.prefill.customAnswers)for(e in i=this.options.prefill.customAnswers,i)a=i[e],e.match(/^a\d{1,2}$/)&&(n[e]=a);if(this.options.prefill.guests&&Array.isArray(this.options.prefill.guests)&&this.options.prefill.guests.length>0&&(n.guests=this.options.prefill.guests.join(`,`)),this.options.prefill.date&&this.options.prefill.date instanceof Date){var o=this.options.prefill.date.getMonth()+1,s=this.options.prefill.date.getDate(),c=this.options.prefill.date.getFullYear();n.date=[c,o<10?`0`+o:o,s<10?`0`+s:s].join(`-`)}return n},e.prototype.getDomain=function(){return document.location.host},e.prototype.filterConsentParam=function(e){return e.replace(/consent_accept=1&?/g,``)},e.prototype.format=function(){return this.isMobile?this.formatMobile():this.formatDesktop()},e.prototype.formatDesktop=function(){return this.inlineStyles?this.parent.setAttribute(`style`,`position: relative;`+this.parent.getAttribute(`style`)):void 0},e.prototype.formatMobile=function(){return this.inlineStyles?this.parent.setAttribute(`style`,`position: relative;overflow-y:auto;-webkit-overflow-scrolling:touch;`+this.parent.getAttribute(`style`)):this.parent.className+=` calendly-mobile`},e.prototype.buildSpinner=function(){var e;return e=document.createElement(`div`),e.className=`calendly-spinner`,e.appendChild(this.buildBounce(1)),e.appendChild(this.buildBounce(2)),e.appendChild(this.buildBounce(3)),e},e.prototype.buildBounce=function(e){var t;return t=document.createElement(`div`),t.className=`calendly-bounce`+e,t},e}()}.call(r),function(){var e=function(e,t){return function(){return e.apply(t,arguments)}};r.Calendly.PopupWidget=function(){function t(t,n,r,i){this.url=t,this.onClose=n,this.embedType=r,this.options=i??{},this.close=e(this.close,this)}return t.prototype.show=function(){return this.buildOverlay(),this.insertOverlay(),this.lockPageScroll()},t.prototype.close=function(){return this.unlockPageScroll(),this.destroyOverlay(),this.onClose()},t.prototype.buildOverlay=function(){return this.overlay=document.createElement(`div`),this.overlay.className=`calendly-overlay`,this.overlay.appendChild(this.buildCloseOverlay()),this.overlay.appendChild(this.buildPopup()),this.overlay.appendChild(this.buildCloseButton())},t.prototype.insertOverlay=function(){return document.body.appendChild(this.overlay)},t.prototype.buildCloseOverlay=function(){var e;return e=document.createElement(`div`),e.className=`calendly-close-overlay`,e.onclick=this.close,e},t.prototype.buildPopup=function(){var e;return e=document.createElement(`div`),e.className=`calendly-popup`,e.appendChild(this.buildPopupContent()),e},t.prototype.buildPopupContent=function(){var e;return e=document.createElement(`div`),e.className=`calendly-popup-content`,e.setAttribute(`data-url`,this.url),this.options.parentElement=e,this.options.embedType=this.embedType,new r.Calendly.Iframe(this.options),e},t.prototype.buildCloseButton=function(){var e;return e=document.createElement(`div`),e.className=`calendly-popup-close`,e.onclick=this.close,e},t.prototype.destroyOverlay=function(){return this.overlay.parentNode.removeChild(this.overlay)},t.prototype.lockPageScroll=function(){return bodyScrollLock.disableBodyScroll(this.overlay),document.addEventListener(`touchmove`,this.handleLockedTouchmove,{passive:!1})},t.prototype.unlockPageScroll=function(){return bodyScrollLock.enableBodyScroll(this.overlay),document.removeEventListener(`touchmove`,this.handleLockedTouchmove,{passive:!1})},t.prototype.handleLockedTouchmove=function(e){return e.preventDefault()},t}()}.call(r),function(){r.Calendly.BadgeWidget=function(){function e(e){this.options=e,this.buildWidget(),this.insertWidget()}return e.prototype.destroy=function(){return this.widget.parentNode.removeChild(this.widget)},e.prototype.buildWidget=function(){return this.widget=document.createElement(`div`),this.widget.className=`calendly-badge-widget`,this.widget.appendChild(this.buildContent())},e.prototype.insertWidget=function(){return document.body.insertBefore(this.widget,document.body.firstChild)},e.prototype.buildContent=function(){var e;return e=document.createElement(`div`),e.className=`calendly-badge-content`,this.options.color===`#ffffff`&&(e.className+=` calendly-white`),e.onclick=this.options.onClick,e.innerHTML=this.options.text,e.style.background=this.options.color,e.style.color=this.options.textColor,this.options.branding&&e.appendChild(this.buildBranding()),e},e.prototype.buildBranding=function(){var e;return e=document.createElement(`span`),e.innerHTML=`powered by Calendly`,e},e}()}.call(r),r.Calendly._autoLoadInlineWidgets()},(function(e){e.PROFILE_PAGE_VIEWED=`calendly.profile_page_viewed`,e.EVENT_TYPE_VIEWED=`calendly.event_type_viewed`,e.DATE_AND_TIME_SELECTED=`calendly.date_and_time_selected`,e.EVENT_SCHEDULED=`calendly.event_scheduled`})(F||={}),I=function(){r.Calendly||P()},L=function(e,t){if(!t)return e;var n=t.backgroundColor,r=t.hideEventTypeDetails,i=t.hideLandingPageDetails,a=t.primaryColor,o=t.textColor,s=t.hideGdprBanner,c=e.indexOf(`?`),l=c>-1,u=e.slice(c+1),d=l?e.slice(0,c):e,f=[u,n?`background_color=`+n:null,r?`hide_event_type_details=1`:null,i?`hide_landing_page_details=1`:null,a?`primary_color=`+a:null,o?`text_color=`+o:null,s?`hide_gdpr_banner=1`:null].filter(function(e){return e!==null}).join(`&`);return d+`?`+f},R=function(e){I();var t={url:L(e.url,e.pageSettings),prefill:e.prefill,utm:e.utm};r.Calendly.initPopupWidget(t)},z=function(){I(),r.Calendly.closePopupWidget()},B={minWidth:`320px`,height:`630px`},V=function(e){D(t,e);function t(t){var n=e.call(this,t)||this;return n.widgetParentContainerRef=j.createRef(),n.destroyInlineWidget=n.destroyInlineWidget.bind(n),n.getChildNodeCount=n.getChildNodeCount.bind(n),n.shouldWidgetUpdate=n.shouldWidgetUpdate.bind(n),n.initWidget=n.initWidget.bind(n),n}return t.prototype.componentDidUpdate=function(e){var t=this;this.shouldWidgetUpdate(e)&&(this.getChildNodeCount()?(this.destroyInlineWidget(),this.initWidget()):this.calendlyWidgetListener(`inserted`,function(){t.calendlyWidgetListener(`removed`,t.initWidget),t.destroyInlineWidget()}))},t.prototype.componentDidMount=function(){I(),r.Calendly.initInlineWidget({url:L(this.props.url,this.props.pageSettings),parentElement:this.widgetParentContainerRef.current,prefill:this.props.prefill,utm:this.props.utm})},t.prototype.render=function(){return j.createElement(`div`,{className:`calendly-inline-widget`,style:this.props.styles||B,ref:this.widgetParentContainerRef,"data-auto-load":`false`})},t.prototype.destroyInlineWidget=function(){this.widgetParentContainerRef.current.innerHTML=``},t.prototype.getChildNodeCount=function(){return this.widgetParentContainerRef.current.childNodes.length},t.prototype.initWidget=function(){r.Calendly.initInlineWidget({url:L(this.props.url,this.props.pageSettings),parentElement:this.widgetParentContainerRef.current,prefill:this.props.prefill,utm:this.props.utm})},t.prototype.calendlyWidgetListener=function(e,t){var n=e===`inserted`,r=e===`removed`;return new MutationObserver(function(e,i){i.disconnect(),n&&e.some(function(e){return!!e.addedNodes.length})&&t(),r&&e.some(function(e){return!!e.removedNodes.length})&&t()}).observe(this.widgetParentContainerRef.current,{childList:!0})},t.prototype.shouldWidgetUpdate=function(e){var t=this;return e.url!==this.props.url||[`pageSettings`,`prefill`,`utm`].some(function(n){return JSON.stringify(e[n])!==JSON.stringify(t.props[n])})},t}(j.Component),H=function(e){r.Calendly.initPopupWidget(e)},U=function(e){return function(t){return t.preventDefault(),H(e)}},W=function(e){D(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t.prototype.componentWillUnmount=function(){r.Calendly.closePopupWidget()},t.prototype.componentDidMount=function(){I()},t.prototype.render=function(){var e={url:L(this.props.url,this.props.pageSettings),prefill:this.props.prefill,utm:this.props.utm};return j.createElement(`button`,{onClick:U(e),style:this.props.styles||{},className:this.props.className||``},this.props.text)},t}(j.Component),G={branding:!1,color:`#00a2ff`,textColor:`#ffffff`,text:`Schedule time with me`},K=function(e){D(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t.prototype.componentDidUpdate=function(){var e=N(N(N({},G),this.props),{url:L(this.props.url,this.props.pageSettings)});r.Calendly.initBadgeWidget(e)},t.prototype.componentDidMount=function(){I();var e=N(N(N({},G),this.props),{url:L(this.props.url,this.props.pageSettings)});r.Calendly.initBadgeWidget(e)},t.prototype.componentWillUnmount=function(){r.Calendly.destroyBadgeWidget(),r.Calendly.closePopupWidget()},t.prototype.render=function(){return j.createElement(j.Fragment,null)},t}(j.Component),q=function(e){D(t,e);function t(t){var n=e.call(this,t)||this;return n.handleEvent=n.handleEvent.bind(n),n}return t.prototype.componentDidMount=function(){r.addEventListener(`message`,this.handleEvent)},t.prototype.componentWillUnmount=function(){r.removeEventListener(`message`,this.handleEvent)},t.prototype.handleEvent=function(e){var t=e.data.event;t===F.DATE_AND_TIME_SELECTED?this.props.onDateAndTimeSelected&&this.props.onDateAndTimeSelected(e):t===F.EVENT_SCHEDULED?this.props.onEventScheduled&&this.props.onEventScheduled(e):t===F.EVENT_TYPE_VIEWED?this.props.onEventTypeViewed&&this.props.onEventTypeViewed(e):t===F.PROFILE_PAGE_VIEWED&&this.props.onProfilePageViewed&&this.props.onProfilePageViewed(e)},t.prototype.render=function(){return this.props.children||null},t}(j.Component),A.InlineWidget=V,A.PopupButton=W,A.PopupWidget=K,A.CalendlyEventListener=q,A.openPopupWidget=R,A.closePopupWidget=z,A.__esModule,J=A.InlineWidget,A.PopupButton,A.PopupWidget,A.CalendlyEventListener,A.openPopupWidget,A.closePopupWidget})),ie=e((()=>{l(),Y(),Y()})),ae=e((()=>{h(),t(),b()})),oe=e((()=>{t(),h()})),se=e((()=>{b(),v(),ee(),x(),E(),_(),te(),S(),ne(),T(),ae(),oe(),C(),w()})),ce=e((()=>{se()})),X,Z,Q,le=e((()=>{ce(),X={...g,...y,textAlign:`center`,padding:15,width:200,height:100,overflow:`hidden`},{...X},Z={fontSize:12,fontWeight:600,margin:0},Q={fontSize:12,maxWidth:200,lineHeight:1.4,margin:`5px 0 0 0`}})),ue=e((()=>{le()}));function $({style:e,calendar:t,hideLandingPageDetails:n,hideGdprBanner:r,...i}){return a(d.div,{style:{...g,...e},...i,children:t?a(J,{url:`https://calendly.com/${t}`,styles:{width:`100%`,height:`100%`},pageSettings:{hideLandingPageDetails:n,hideGdprBanner:r}}):s(`div`,{style:{...X,...e},...i,children:[a(`h1`,{style:Z,children:`Calendly`}),a(`p`,{style:Q,children:`Set a calendar name in the Properties.`})]})})}var de=e((()=>{u(),h(),f(),ie(),re(),ue(),$.defaultProps={hideLandingPageDetails:!0,hideGdprBanner:!0},p($,{calendar:{type:m.String,defaultValue:`acmesales`,description:`Create a [Calendly](https://calendly.com/) account and copy your calendar name.`},hideLandingPageDetails:{type:m.Boolean,title:`Details`,disabledTitle:`Show`,enabledTitle:`Hide`},hideGdprBanner:{type:m.Boolean,title:`GDPR`,disabledTitle:`Show`,enabledTitle:`Hide`}})}));export{de as n,$ as t};
//# sourceMappingURL=Calendly.Drm9GwHu.mjs.map