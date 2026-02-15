const CACHE_NAME = 'nafahat-v2'; // تحديث الإصدار لإجبار المتصفح على التنشيط

// القائمة المحدثة لتشمل الصفحات المفقودة (البحث، التأملات، المقالات)
const ASSETS_TO_CACHE = [
  '/e/',
  '/e/index.html',
  '/e/manifest.json',
  '/e/robots.txt',
  '/e/sitemap.xml',
  
  // مجلد leader - الأساسيات والوسائط (تم إضافة الصفحات الجديدة هنا)
  '/e/leader/home.html',
  '/e/leader/Nresearch.html',    // صفحة البحث الذكي المفقودة
  '/e/leader/articles.html',     // صفحة المقالات (تأكد من مطابقة الاسم)
  '/e/leader/reflections.html',  // صفحة تأملات (تأكد من مطابقة الاسم)
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
  
  // مجلد Textbook
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

// مرحلة التثبيت
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم تحديث كاش نفحات بنجاح ليشمل الصفحات الجديدة');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// استراتيجية الجلب (تحسين: الكاش أولاً للسرعة في وضع الأوفلاين)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// تنظيف الكاش القديم
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('جاري تنظيف الكاش القديم: ' + key);
          return caches.delete(key);
        }
      }));
    })
  );
});
