const CACHE_NAME = 'nafahat-dynamic-v3';

// Install
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cache) => cache !== CACHE_NAME)
          .map((cache) => caches.delete(cache))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch – Network First (مناسب للفهرسة)
self.addEventListener('fetch', (event) => {

  if (event.request.method !== 'GET') return;

  // لا نخزن طلبات خارج الموقع
  const requestURL = new URL(event.request.url);
  if (requestURL.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {

        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseClone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;

      })
      .catch(() => {
        return caches.match(event.request);
      })
  );

});
