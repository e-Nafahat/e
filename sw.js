// اسم الإصدار - رفعه لضمان تحديث شامل
const CACHE_NAME = 'nafahat-v5'; 

// القائمة المطابقة لهيكل مستودع "e" بناءً على الصور
const ASSETS_TO_CACHE = [
  '/e/',
  '/e/index.html',
  '/e/manifest.json',
  '/e/robots.txt',
  '/e/sitemap.xml',
  '/e/.nojekyll',
  '/e/favicon.png',
  
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

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('تم أرشفة مستودع e بنجاح');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
