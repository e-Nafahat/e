const CACHE_NAME = 'nafahat-v3'; // رفعنا الإصدار لضمان تحديث شامل عند الزوار

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
  '/e/Textbook/hadith100.html',
  '/e/Textbook/azkarNight.html',
  '/e/Textbook/azkar.html',
  '/e/Textbook/bayqonia.html',
  '/e/Textbook/athkar-sleep.html',
  '/e/Textbook/AZKRONY.html',
  
  // مجلد Tasmee - التسميع والإجازة
  '/e/Tasmee/quran1.html',
  '/e/Tasmee/ejaza.html',
  '/e/Tasmee/ejaza-tests.html'
];

// تثبيت ملفات الموقع في ذاكرة الهاتف/المتصفح
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم أرشفة هيكل مستودع e بالكامل للعمل Offline');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// استراتيجية التشغيل: البحث في الكاش أولاً (لسرعة فائقة)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// مسح النسخ القديمة وتفعيل التحديث الجديد
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
