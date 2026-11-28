// Elixir Lab offline cache. The version comes from version.js – do not edit it here.
importScripts("version.js");
const VERSION="elixir-lab-v"+self.APP_VERSION;
const FILES=["./","index.html","version.js","leaf-terms.js","manifest.json","icon-192.png","icon-512.png","icon-maskable-512.png","elixir-lab-content.xlsx","xlsx.mini.min.js","elixir-microscope-prototype.html"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;if(new URL(e.request.url).origin!==location.origin)return;
 const q=e.request.mode==="navigate"?e.request:new Request(e.request,{cache:"no-cache"});
 e.respondWith(fetch(q).then(r=>{if(r.ok){const cp=r.clone();caches.open(VERSION).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))))});
