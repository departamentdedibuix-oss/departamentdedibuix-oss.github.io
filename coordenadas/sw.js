// Copia para usar sin conexión. Solo afecta a la carpeta coordenadas/.
const C="coordenadas-v3";
const BASE=["./","index.html","coordenadas.dat","app.webmanifest","icono_192.png","icono_512.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;
  // primero la red (para tener siempre lo último) y, si no hay conexión, la copia guardada
  e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(C).then(c=>c.put(u.pathname.split("/").pop()||"./",cp)); return r; })
    .catch(()=>caches.match(u.pathname.split("/").pop()||"./").then(r=>r||caches.match(e.request))));
});
