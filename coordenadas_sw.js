// Copia para usar sin conexión. Solo afecta a los archivos coordenadas_geometria_plana*.
const C="coordenadas-v1";
const BASE=["coordenadas_geometria_plana.html","coordenadas_geometria_plana.dat","coordenadas_geometria_plana.webmanifest","coordenadas_icono_192.png","coordenadas_icono_512.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;
  // primero la red (para tener siempre lo último) y, si no hay conexión, la copia guardada
  e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(C).then(c=>c.put(u.pathname.split("/").pop()||u.pathname,cp)); return r; })
    .catch(()=>caches.match(u.pathname.split("/").pop()).then(r=>r||caches.match(e.request))));
});
