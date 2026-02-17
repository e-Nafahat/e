const CACHE_NAME = 'nafahat-v4'; // تم رفع الإصدار لـ v4 لإجبار تحديث الأيقونة

// القائمة المطابقة لهيكل مستودع "e" بالكامل
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

// مرحلة التثبيت - Logic Check: استخدام skipWaiting للتحديث الفوري
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// مرحلة التنشيط - تنظيف الكاش القديم فوراً
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجية جلب البيانات: Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // العودة للكاش في حال انقطاع الشبكة
      });

      return cachedResponse || fetchPromise;
    })
  );
});
