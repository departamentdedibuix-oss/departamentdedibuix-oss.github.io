// Lanzador de Contrapunto: solo guarda la portada y el icono para que la app se pueda instalar.
const C="lanzador-contrapunto-v1";
const BASE=["./","index.html","app.webmanifest","icono_192.png","icono_512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim());});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
