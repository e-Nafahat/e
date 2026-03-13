const CACHE_NAME = 'nafahat-dynamic-v4'; // تحديث الإصدار لضمان تجديد الملفات عند المستخدمين

// الملفات الأساسية التي يجب أن تعمل حتى بدون إنترنت من اللحظة الأولى
// Logic Check: تم التأكد من أن جميع المسارات تبدأ بـ /e/ لتتوافق مع بيئة GitHub Pages
const PRE_CACHE_ASSETS = [
  '/e/',
  '/e/index.html',
  '/e/leader/LogoNafahat.png',
  '/e/manifest.json',
  '/e/leader/home.html',
  '/e/leader/lindo.mp3'
];

// Install - التثبيت والتخزين المباشر للأصول الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Nafahat: Pre-caching core assets');
      // استخدام cache.addAll لضمان تخزين الأصول الأساسية
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
          .map((cache) => {
            console.log('Nafahat: Deleting old cache', cache);
            return caches.delete(cache);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch – استراتيجية (Network First) لضمان الفهرسة والسرعة مع دعم الأوفلاين
self.addEventListener('fetch', (event) => {
  // التعامل مع طلبات GET فقط لضمان استقرار التطبيق
  if (event.request.method !== 'GET') return;

  // التركيز على طلبات الموقع الخاص بنا فقط (Domain-specific)
  const requestURL = new URL(event.request.url);
  if (requestURL.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // التحقق من صحة الاستجابة قبل تخزينها (Logic Check: استبعاد response.type !== 'basic' للسماح ببعض موارد الـ CDN إذا لزم الأمر)
        if (!response || response.status !== 200) {
          return response;
        }

        const responseClone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          // تخزين النسخة الجديدة في الكاش بصمت خلف الكواليس لتحديث المحتوى
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
          
          // Logic Check: إذا كان الطلب لصفحة (navigation) ولم يوجد كاش، نرجعه للصفحة الرئيسية
          if (event.request.mode === 'navigate') {
            return caches.match('/e/index.html');
          }
        });
      })
  );
});
