// Service worker: guarda la app para usarla sin conexión
const V='scpi-fd5a3924a2',FILES=["index.html", "plan.html", "tests.html", "repaso.html", "parcial.html", "medidores-2d.html", "medidores-3d.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(f=>'./'+f))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=='scpi-fonts').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 if(u.hostname.includes('fonts.googleapis.com')||u.hostname.includes('fonts.gstatic.com')){e.respondWith(caches.open('scpi-fonts').then(c=>c.match(e.request).then(r=>{const n=fetch(e.request).then(x=>{c.put(e.request,x.clone());return x}).catch(()=>r);return r||n})));return}
 if(u.origin!==location.origin)return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(x=>{if(x.ok){const y=x.clone();caches.open(V).then(c=>c.put(e.request,y))}return x}).catch(()=>caches.match('./index.html'))))});
