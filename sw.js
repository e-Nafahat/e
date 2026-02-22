const CACHE_NAME = 'nafahat-dynamic-v4'; // تحديث الإصدار لضمان تجديد الملفات عند المستخدمين

// الملفات الأساسية التي يجب أن تعمل حتى بدون إنترنت من اللحظة الأولى
const PRE_CACHE_ASSETS = [
  '/e/index.html',
  '/e/leader/LogoNafahat.png',
  '/e/manifest.json',
  '/e/leader/home.html'
];

// Install - التثبيت والتخزين المباشر للأصول الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Nafahat: Pre-caching core assets');
      return cache.addAll(PRE_CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate - تنظيف الكاش القديم لضمان عدم حدوث تضارب
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

// Fetch – استراتيجية (Network First) لضمان الفهرسة والسرعة
self.addEventListener('fetch', (event) => {
  // التعامل مع طلبات GET فقط
  if (event.request.method !== 'GET') return;

  // التركيز على طلبات الموقع الخاص بنا فقط (Domain-specific)
  const requestURL = new URL(event.request.url);
  if (requestURL.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // التحقق من صحة الاستجابة قبل تخزينها
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseClone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          // تخزين النسخة الجديدة في الكاش بصمت خلف الكواليس
          cache.put(event.request, responseClone);
        });

        return response;
      })
      .catch(() => {
        // في حال فشل الشبكة (أوفلاين)، ابحث عن النسخة في الكاش
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // إذا لم يجد شيئاً في الكاش، يمكن توجيهه لصفحة أوفلاين لاحقاً
        });
      })
  );
});
