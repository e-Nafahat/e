self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('nafahat-v1').then((cache) => {
      return cache.addAll(['/e/', '/e/index.html', '/e/leader/LogoNafahat.png']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
