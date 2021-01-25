"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=true;exports.default=void 0;var _router=require("../next-server/lib/router/router");var _getAssetPathFromRoute=_interopRequireDefault(require("../next-server/lib/router/utils/get-asset-path-from-route"));var _isDynamic=require("../next-server/lib/router/utils/is-dynamic");var _parseRelativeUrl=require("../next-server/lib/router/utils/parse-relative-url");var _routeLoader=_interopRequireWildcard(require("./route-loader"));function normalizeRoute(route){if(route[0]!=='/'){throw new Error(`Route name should start with a "/", got "${route}"`);}if(route==='/')return route;return route.replace(/\/$/,'');}class PageLoader{constructor(buildId,assetPrefix){this.buildId=void 0;this.assetPrefix=void 0;this.promisedSsgManifest=void 0;this.promisedDevPagesManifest=void 0;this.routeLoader=void 0;this.routeLoader=(0,_routeLoader.default)(assetPrefix);this.buildId=buildId;this.assetPrefix=assetPrefix;/** @type {Promise<Set<string>>} */this.promisedSsgManifest=new Promise(resolve=>{if(window.__SSG_MANIFEST){resolve(window.__SSG_MANIFEST);}else{;window.__SSG_MANIFEST_CB=()=>{resolve(window.__SSG_MANIFEST);};}});}getPageList(){if(process.env.NODE_ENV==='production'){return(0,_routeLoader.getClientBuildManifest)().then(manifest=>manifest.sortedPages);}else{if(window.__DEV_PAGES_MANIFEST){return window.__DEV_PAGES_MANIFEST.pages;}else{if(!this.promisedDevPagesManifest){this.promisedDevPagesManifest=fetch(`${this.assetPrefix}/_next/static/development/_devPagesManifest.json`).then(res=>res.json()).then(manifest=>{;window.__DEV_PAGES_MANIFEST=manifest;return manifest.pages;}).catch(err=>{console.log(`Failed to fetch devPagesManifest`,err);});}return this.promisedDevPagesManifest;}}}/**
   * @param {string} href the route href (file-system path)
   * @param {string} asPath the URL as shown in browser (virtual path); used for dynamic routes
   * @returns {string}
   */getDataHref(href,asPath,ssg,locale){const{pathname:hrefPathname,query,search}=(0,_parseRelativeUrl.parseRelativeUrl)(href);const{pathname:asPathname}=(0,_parseRelativeUrl.parseRelativeUrl)(asPath);const route=normalizeRoute(hrefPathname);const getHrefForSlug=path=>{const dataRoute=(0,_getAssetPathFromRoute.default)((0,_router.addLocale)(path,locale),'.json');return(0,_router.addBasePath)(`/_next/data/${this.buildId}${dataRoute}${ssg?'':search}`);};const isDynamic=(0,_isDynamic.isDynamicRoute)(route);const interpolatedRoute=isDynamic?(0,_router.interpolateAs)(hrefPathname,asPathname,query).result:'';return isDynamic?interpolatedRoute&&getHrefForSlug(interpolatedRoute):getHrefForSlug(route);}/**
   * @param {string} href the route href (file-system path)
   */_isSsg(href){const{pathname:hrefPathname}=(0,_parseRelativeUrl.parseRelativeUrl)(href);const route=normalizeRoute(hrefPathname);return this.promisedSsgManifest.then(s=>s.has(route));}loadPage(route){return this.routeLoader.loadRoute(route).then(res=>{if('component'in res){return{page:res.component,mod:res.exports,styleSheets:res.styles.map(o=>({href:o.href,text:o.content}))};}throw res.error;});}prefetch(route){return this.routeLoader.prefetch(route);}}exports.default=PageLoader;
//# sourceMappingURL=page-loader.js.map