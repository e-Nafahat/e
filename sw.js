const CACHE_NAME = 'nafahat-v1';

// القائمة الكاملة للموارد بناءً على هيكل مستودع "e"
const ASSETS_TO_CACHE = [
  '/e/',
  '/e/index.html',
  '/e/manifest.json',
  '/e/robots.txt',
  '/e/sitemap.xml',
  
  // مجلد leader - الأساسيات والوسائط
  '/e/leader/home.html',
  '/e/leader/admin.html',
  '/e/leader/FrontSmart.html',
  '/e/leader/more.html',
  '/e/leader/masbaha.html',
  '/e/leader/intro.html',
  '/e/leader/khatma.html',
  '/e/leader/Mehrab.html',
  '/e/leader/support.html',
  '/e/leader/live.html',
  '/e/leader/main.js',
  '/e/leader/masbaha_script.js',
  '/e/leader/masbaha_style.css',
  '/e/leader/style.css',
  '/e/leader/LogoNafahat.png',
  
  // مجلد Library
  '/e/Library/library.html',
  
  // مجلد Textbook - الأذكار والكتب
  '/e/Textbook/nawawi.html',
  '/e/Textbook/hadith100.html',
  '/e/Textbook/azkarNight.html',
  '/e/Textbook/azkar.html',
  '/e/Textbook/bayqonia.html',
  '/e/Textbook/athkar-sleep.html',
  '/e/Textbook/AZKRONY.html',
  
  // مجلد Tasmee
  '/e/Tasmee/quran1.html',
  '/e/Tasmee/ejaza-tests.html'
];

// مرحلة التثبيت وحفظ الملفات في الكاش
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم حفظ كافة ملفات نفحات في الكاش بنجاح');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// استراتيجية جلب البيانات: محاولة الشبكة أولاً، ثم الكاش إذا انقطع الاتصال
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});

// تنظيف الكاش القديم عند تحديث الإصدار
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
