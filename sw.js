// اسم الإصدار - قم بتغييره عند كل تحديث رئيسي للملفات
const CACHE_NAME = 'nafahat-v4'; 

// القائمة الكاملة للملفات المطلوب أرشفتها للعمل Offline
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

// مرحلة التثبيت: أرشفة الملفات
self.addEventListener('install', (event) => {
  // إجبار النسخة الجديدة على التنشيط فوراً وتجاوز الانتظار
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('جاري أرشفة الملفات للإصدار الجديد...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// مرحلة التنشيط: تنظيف الكاش القديم
self.addEventListener('activate', (event) => {
  // جعل الـ Service Worker يسيطر على الصفحة فوراً
  event.waitUntil(clients.claim());
  
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('جاري حذف الكاش القديم:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// استراتيجية جلب البيانات: الكاش أولاً ثم الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // إذا وجد الملف في الكاش نعرضه، وإلا نطلبه من الإنترنت
      return response || fetch(event.request);
    }).catch(() => {
      // يمكن إضافة صفحة خطأ هنا في حالة عدم وجود إنترنت
    })
  );
});
