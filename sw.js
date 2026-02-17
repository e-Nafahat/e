const CACHE_NAME = 'nafahat-v3';

const ASSETS_TO_CACHE = [
  '/e/',
  '/e/index.html',
  '/e/manifest.json',
  '/e/robots.txt',
  '/e/sitemap.xml',
  '/e/.nojekyll',
  
  // مجلد leader - المحرك والوسائط
  '/e/leader/home.html',
  '/e/leader/admin.html',
  '/e/leader/FrontSmart.html',
  '/e/leader/more.html',
  '/e/leader/masbaha.html',
  '/e/leader/intro.html',
  '/e/leader/khatma.html',
  '/e/leader/Mehrab.html',
  '/e/leader/support.html',
  '/e/leader/Nresearch.html',
  '/e/leader/live.html',
  '/e/leader/main.js',
  '/e/leader/masbaha_script.js',
  '/e/leader/masbaha_style.css',
  '/e/leader/style.css',
  '/e/leader/LogoNafahat.png',
  '/e/leader/lindo.mp3',
  
  // مجلد Library
  '/e/Library/library.html',
  
  // مجلد Textbook - الأذكار والمتون
  '/e/Textbook/nawawi.html',
  '/e/Textbook/hadith100.html'
];

// مرحلة التثبيت - تسريع التفعيل
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // إجبار الـ Service Worker الجديد على التنشيط فوراً
});

// مرحلة التنشيط - حذف الكاش القديم فوراً
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // السيطرة على الصفحات فوراً لضمان تحديثها
  );
});

// استراتيجية جلب البيانات: التحديث أثناء الاستخدام (Stale-While-Revalidate)
// تضمن ظهور المحتوى بسرعة من الكاش مع تحديثه في الخلفية للمرة القادمة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // تحديث الكاش بالنسخة الجديدة من الشبكة
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        // في حال عدم وجود إنترنت وفشل الشبكة
      });

      return cachedResponse || fetchPromise;
    })
  );
});
