const V='v2.6', CORE=['./','index.html','induccion.webmanifest','induccion-192.png','induccion-512.png'], VIDS=["v/almagro.bin", "v/avcol.bin", "v/caro.bin", "v/dubai.bin", "v/est5.bin", "v/inst.bin", "v/obras.bin", "v/semana.bin", "v/six.bin", "v/squares.bin", "v/station.bin", "v/toreon.bin"], C='ind-'+V;
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(C);await Promise.all(CORE.map(u=>c.add(u).catch(()=>{})));for(const u of VIDS){try{await c.add(u)}catch(_){}}self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==C)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 const same=u.origin===location.origin;
 const isPage=same&&(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html'));
 e.respondWith((async()=>{const c=await caches.open(C);
  if(isPage){try{const n=await fetch(r);if(n&&n.ok)c.put('index.html',n.clone());return n}catch(_){const m=await c.match('index.html')||await c.match('./');if(m)return m;throw _}}
  const m=await c.match(r,{ignoreSearch:true});if(m)return m;
  try{const n=await fetch(r);if(n&&(n.ok||n.type==='opaque'))c.put(r,n.clone());return n}catch(_){throw _}})())});
