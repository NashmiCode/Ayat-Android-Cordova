// Cache locally shipped pages and assets. Quran APIs and audio always use the network.
const CACHE='ayat-local-v1';
const CORE=["./index.html", "./web1.html", "./web2.html", "./web3.html", "./style.css", "./style1.css", "./style2.css", "./style3.css", "./app.js", "./app1.js", "./app2.js", "./app3.js", "./logo.png", "./ayat-shell.js", "./ayat-shell.css", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(cache=>cache.put(r,copy));}return resp;})));
});
