/leader/main.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "", 
    authDomain: "smart-web-3f6c3.firebaseapp.com", 
    projectId: "smart-web-3f6c3", 
    storageBucket: "smart-web-3f6c3.firebasestorage.app", 
    messagingSenderId: "620446879651", 
    appId: "1:620446879651:web:0d81fb9c3124eeb0d85416" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// وظيفة تنسيق العناوين مع الحفاظ على التصنيفات
function formatTitle(title) {
    return title.replace(/\[(عقيدة|رقائق|سيرة)\]/g, '<span class="slider-category">[$1]</span>');
}

const q = query(collection(db, "articles"), orderBy("time", "desc"));
onSnapshot(q, (snapshot) => {
    const track = document.getElementById('sliderTrack');
    if (!track) return;
    let html = "";
    
    snapshot.docs.forEach(docSnap => { 
        const data = docSnap.data(); 
        const styledTitle = formatTitle(data.title);
        
        // المحافظة على منطق إرسال الطلب للموقع الرئيسي لفتح المقال
        html += `<div class="slider-item" onclick="handlePostClick('${docSnap.id}')">${styledTitle}</div>`; 
    });

    // تكرار المحتوى لضمان استمرارية الحركة (Infinite Scroll)
    track.innerHTML = html + html; 

    // تعديل المنطق البرمجي للسرعة: 
    // تم زيادة المعامل إلى 10 ثوانٍ لكل عنصر لضمان بقاء الرسالة فترة كافية للقراءة
    // مع وضع حد أدنى 30 ثانية للدورة كاملة لضمان الهدوء البصري
    const duration = Math.max(30, snapshot.size * 10); 
    track.style.animationDuration = duration + "s";
});

// وظيفة المعالجة لضمان وصول الرسالة للموقع الرئيسي (index.html)
window.handlePostClick = function(postId) {
    // 1. طلب الانتقال لصفحة المقالات في الموقع الرئيسي
    window.parent.postMessage({
        type: 'OPEN_PAGE', 
        page: 'posts'
    }, '*');

    // 2. إرسال أمر فتح المنشور المحدد مع تأخير بسيط لضمان جاهزية الإطار
    setTimeout(() => {
        window.parent.postMessage({
            type: 'OPEN_SPECIFIC_POST', 
            id: postId
        }, '*');
    }, 300);
};

// التحكم اليدوي والتلقائي في السلايدر
const toggleBtn = document.getElementById('toggleSlider');
const trackElement = document.getElementById('sliderTrack');

if (trackElement) {
    // إضافة منطق برمجي جديد: التوقف التلقائي عند مرور الماوس (Hover) لسهولة القراءة
    trackElement.addEventListener('mouseenter', () => {
        trackElement.classList.add('paused');
    });

    trackElement.addEventListener('mouseleave', () => {
        // فقط استأنف الحركة إذا لم يكن المستخدم قد ضغط على زر الإيقاف اليدوي
        if (toggleBtn && toggleBtn.innerText === "⏸") {
            trackElement.classList.remove('paused');
        }
    });
}

if (toggleBtn && trackElement) {
    toggleBtn.onclick = () => { 
        if (trackElement.classList.contains('paused')) {
            trackElement.classList.remove('paused');
            toggleBtn.innerText = "⏸"; 
        } else {
            trackElement.classList.add('paused');
            toggleBtn.innerText = "▶"; 
        }
    };
}
