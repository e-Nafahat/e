// اسم الإصدار - رفعه لضمان تحديث شامل وإجبار المتصفح على الاستجابة
const CACHE_NAME = 'nafahat-v6'; 

// القائمة الكاملة والمطابقة تماماً لهيكل مستودع "e"
const ASSETS_TO_CACHE = [
  '/e/',
  '/e/index.html',
  '/e/manifest.json',
  '/e/robots.txt',
  '/e/sitemap.xml',
  '/e/.nojekyll',
  '/e/favicon.png',
  '/e/sw.js',
  
  // مجلد leader
  '/e/leader/home.html',
  '/e/leader/admin.html',
  '/e/leader/FrontSmart.html',
  '/e/leader/more.html',
  '/e/leader/masbaha.html',
  '/e/leader/intro.html',
  '/e/leader/khatma.html',
  '/e/leader/Mehrab.html',
  '/e/leader/support.html',
  '/e/leader/main.js',
  '/e/leader/masbaha_script.js',
  '/e/leader/masbaha_style.css',
  '/e/leader/style.css',
  '/e/leader/LogoNafahat.png',
  '/e/leader/Nresearch.html',
  '/e/leader/live.html',
  '/e/leader/lindo.mp3',
  
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
  '/e/Tasmee/ejaza.html',
  '/e/Tasmee/ejaza-tests.html'
];

// مرحلة التثبيت: إجبار الملف الجديد على السيطرة فوراً
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم تحديث أرشفة مستودع e بنجاح للإصدار v6');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// مرحلة التنشيط: مسح شامل وشديد لكل النسخ القديمة لضمان سرعة التحديث
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('جاري حذف الذاكرة القديمة:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  event.waitUntil(clients.claim());
});

// الاستماع لرسالة التحديث من الواجهة الأمامية (زر التحديث في index.html)
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// استراتيجية جلب البيانات: (الشبكة أولاً) لضمان ظهور أي تعديل ترفعه على GitHub فوراً
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
