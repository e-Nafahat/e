<div align="center">

# 🌙 **مشروع نَفَحَات - e-Nafahat**

<img src="https://i.postimg.cc/xChCyRZ3/e-Nafahat.jpg" alt="واجهة تطبيق نفحات إيمانية" width="100%" style="border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);"/>

<br>

### **تطبيق ويب تقدمي (PWA) متكامل للأذكار والخدمات الإسلامية الرقمية**
**منصة دعوية جامعة، تُعنى بالتأصيل العلمي على منهج أهل السنة والجماعة، ونشر صحيح السنة وسير السلف الصالح بأسلوبٍ عصري موثق.**

[![Developer](https://img.shields.io/badge/Developer-Mohamed%20Younes-gold?style=for-the-badge&logo=codeforces&logoColor=white)](https://github.com/e-nafahat)
[![Clones](https://img.shields.io/badge/Total%20Clones-1600%2B-brightgreen?style=for-the-badge&logo=github)](https://github.com/e-nafahat/e/graphs/traffic)
[![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)](https://e-nafahat.github.io/e)

</div>

---

## 📖 **عن المشروع**
تطبيق **"نفحات إيمانية"** هو منصة تعليمية وروحية متطورة تهدف لتسهيل الوصول إلى الأذكار، الأحاديث، وأدوات العبادة اليومية. يجمع المشروع بين أصالة المحتوى الشرعي وعصرية التصميم الرقمي، مع توفير أداء فائق وسرعة استجابة بفضل تقنيات الـ PWA، ملتزماً بمنهج السلف الصالح في الطرح والتوثيق.

---

## ✨ **المميزات الرئيسية (Features)**
* 🎯 **محرك بحث ذكي:** نظام بحث متطور للوصول للأحاديث والمتون العلمية عبر ملف `Nresearch.html`.
* 👶 **ركن براعم الإيمان:** قسم مخصص للأطفال يحتوي على قصص الأنبياء، السيرة، الأناشيد، والقرآن الكريم بتصميم تفاعلي جذاب داخل مجلد `/Baraem`.
* 🖼️ **معرض التصاميم (Gallery):** مكتبة بصرية متجددة تضم بوسترات دعوية، خلفيات إيمانية، وتصاميم "نفحات" الأصلية بدقة عالية داخل ملف `leader/gallery.html`.
* 📖 **مكتبة المتون:** أرشيف شامل يضم الأربعين النووية والمنظومات العلمية بداخل مجلد `/Textbook`.
* 🎙️ **مُصَحِّحُ النَّفَحَاتِ:** نظام تسميع ذكي واختبارات إجازة تفاعلية داخل مجلد `/Tasmee`.
* ✨ **نظام SMART:** إدارة ديناميكية للمقالات والنفحات مع لوحة تحكم سرية للأدمن في `FrontSmart.html`.
* 📿 **أدوات تفاعلية:** مسبحة إلكترونية متطورة ونظام تتبع الختمات القرآنية في مجلد `/leader`.
* 📶 **دعم الـ Offline:** استمرارية العمل بدون إنترنت بفضل تقنيات الـ Service Workers (`sw.js`).
* 📱 **تجربة المستخدم:** واجهة تدعم الوضع الليلي وتثبيت التطبيق على الشاشة الرئيسية للهواتف.

---

## 📂 **هيكلية المشروع (Project Structure)**
تم تنظيم الملفات برمجياً لدعم أفضل أداء وسهولة في التطوير المستقبلي (كما هو موثق في بنية المستودع):

| المجلد/الملف | الوصف |
| :--- | :--- |
| **`leader/`** | القلب النابض: واجهات التحكم، المسبحة، محرك البحث، **والمعرض (gallery.html)**. |
| **`Baraem/`** | ركن الأطفال: (قصص الأنبياء، سيرة، أناشيد، قرآن، وعظماء الإسلام). |
| **`Tasmee/`** | منصة اختبارات الحفظ، التلميح الصوتي، وأنظمة الإجازة. |
| **`Library/`** | قسم المكتبة الرقمية العامة والكتب الخارجية. |
| **`Textbook/`** | الأذكار الصباحية والمسائية، والمتون النصية والحديثية. |
| **`Account/`** | إدارة حسابات المستخدمين وبيانات التخصيص الشخصية. |
| **`.nojekyll`** | ملف لضمان عمل ملفات الـ CSS/JS التي تبدأ بشرطة سفلية بشكل صحيح. |
| **`sw.js`** | ملف الـ Service Worker المسؤول عن خاصية العمل بدون إنترنت. |
| **`manifest.json`** | ملف التعريف الخاص بتثبيت التطبيق كـ PWA على الهواتف. |
| **`robots.txt` / `sitemap.xml`** | ملفات تحسين محركات البحث (SEO) لسهولة العثور على المشروع. |

---

## 🚀 **التقنيات المستخدمة (Tech Stack)**
* **Frontend:** HTML5, CSS3 (Flexbox & Grid), JavaScript (ES6+ Vanilla JS).
* **AI Design:** استخدام تقنية **Nano Banana 2** (Gemini 3.1 Flash Image) لتوليد التصاميم والبوسترات السينمائية.
* **Typography:** Integration with Google Fonts (Cairo & Amiri).
* **Database:** Firebase Firestore (Real-time synchronization & NoSQL structure).
* **PWA Features:** Service Workers, Manifest JSON, and Cache Storage API.
* **Deployment:** GitHub Pages & PWA Architecture.

---

## 🖼️ **جديد نَفَحَات: معرض التصاميم الرقمية**
<div align="center">
<p><b>تم إطلاق معرض "نفحات" للبصريات الإيمانية، بدقة 4K وتصاميم سينمائية مبتكرة</b></p>
<img src="https://i.postimg.cc/d3115mB8/Screenshot-20260312-214139-com-android-chrome-Same-Task-Web-Apk-Activity.jpg" alt="معرض نفحات" width="80%" style="border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);"/>
<br>
<i>تصفح، حمل، وشارك الجمال الإيماني من خلال صفحة <a href="https://e-nafahat.github.io/e/leader/gallery.html">المعرض</a>.</i>
</div>

---

## 👨‍💻 **المطور (The Developer)**
<div align="right">
تم تطوير هذا المشروع وإدارته بواسطة المطور الشغوف بخدمة المحتوى الرقمي:
<br>
<b>Mohamed El-Sayed Abbas (Mohamed Younes)</b>
</div>

---

## 📩 **تواصل معنا (Contact)**
<div align="center">

| البريد الإلكتروني | تليجرام | واتساب |
| :---: | :---: | :---: |
| [moyou1661@gmail.com](mailto:moyou1661@gmail.com) | [@ELABEDD](https://t.me/ELABEDD) | [اضغط للمراسلة](https://wa.me/5511996929988) |

</div>

---

## 🔗 **رابط المعاينة والزيارة**
<p align="center">
<b><a href="https://e-nafahat.github.io/e">زيارة موقع نَفَحَات إِيمَانِيَّة</a></b>
</p>

---
<p align="center">
<font size="2">تم التطوير بكل إخلاص لخدمة المحتوى الإسلامي الرقمي وفق منهج أهل السنة والجماعة | 2026</font>
</p>
