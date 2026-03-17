const CACHE_NAME = 'nafahat-dynamic-v5'; // تحديث الإصدار

// الملفات الأساسية (تأكد من مطابقة حالة الأحرف تماماً كما في GitHub)
const PRE_CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './leader/LogoNafahat.png',
  './leader/home.html',
  './leader/lindo.mp3'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Nafahat: Pre-caching core assets');
      return cache.addAll(PRE_CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cache) => cache !== CACHE_NAME)
          .map((cache) => {
            console.log('Nafahat: Deleting old cache', cache);
            return caches.delete(cache);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch – استراتيجية (Network First) مع تحسينات الأداء
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // التحقق من صحة الاستجابة
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      })
      .catch(() => {
        // في حال فشل الشبكة
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          
          // Fallback للملاحة
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }

          // Fallback للصور المفقودة (اختياري)
          if (event.request.destination === 'image') {
            return caches.match('./leader/LogoNafahat.png');
          }
        });
      })
  );
});
