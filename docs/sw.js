if(!self.define){let e,i={};const r=(r,a)=>(r=new URL(r+".js",a).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(a,s)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(i[f])return;let n={};const o=e=>r(e,f),d={module:{uri:f},exports:n,require:o};i[f]=Promise.all(a.map((e=>d[e]||o(e)))).then((e=>(s(...e),n)))}}define(["./workbox-b3e22772"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.css",revision:"1fbc674d87c62d41d9e89995dfd11616"},{url:"index.html",revision:"4a8989adf81d41cd286021382a3fccd9"},{url:"index.js",revision:"ae9929583a693077253263cb6f528c70"},{url:"worker.js",revision:"8b505347c0aacf9fbd01480e1905013e"},{url:"favicon.svg",revision:"0c9d51820cf45d0de1c73a4abb780b00"},{url:"favicon.ico",revision:"8745f60463d167fb0f848a7b0f5f27c1"},{url:"robots.txt",revision:"cd9cd94aaa699e0a16e692b6bb16f672"},{url:"apple-touch-icon.png",revision:"068fa9c75784d71f1bba05e55627b8fd"},{url:"worker.js",revision:"8b505347c0aacf9fbd01480e1905013e"},{url:"pwa-192x192.png",revision:"78f7c723f9d0fe37e1c7717f31e315e4"},{url:"pwa-512x512.png",revision:"7c42f711d15af8de07be76e2bb02ca95"},{url:"configs.json",revision:"038e379f100aa54fc57604b839025987"},{url:"model.dynamic.quant.onnx.json",revision:"ebfa2ada37ff44c9f7026cfecd495753"},{url:"model.onnx.json",revision:"a73ba2a55ee593f5466425430dc15853"},{url:"opencv.wasm",revision:"5ff8fbd31a5d5ba5d5faeb7ab999365f"},{url:"ort-wasm-simd-threaded.wasm",revision:"8a484917e96c56458f1e997a8fb5d2fa"},{url:"ort-wasm-simd.wasm",revision:"5ffa8be836bfa78c9b23a85b084dcd3b"},{url:"ort-wasm-threaded.wasm",revision:"d103792c44044b7c49cfb426f6087de4"},{url:"ort-wasm.wasm",revision:"4f29542ff4a65dabec6c6976a127e5c6"},{url:"manifest.webmanifest",revision:"e61b9a1b086188d9dbaa9210b65b83ad"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
