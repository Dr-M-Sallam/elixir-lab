// Elixir Lab offline cache. Change VERSION (v1 -> v2 ...) every time you upload new files.
const VERSION="elixir-lab-v40";
const FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png","icon-maskable-512.png","elixir-lab-content.xlsx","xlsx.mini.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(VERSION).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))))});
