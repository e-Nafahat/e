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
        
        // تعديل المنطق البرمجي: إرسال الطلب لفتح صفحة المقالات أولاً ثم تحديد المنشور
        html += `<div class="slider-item" onclick="handlePostClick('${docSnap.id}')">${styledTitle}</div>`; 
    });
    track.innerHTML = html + html; 
    const duration = Math.max(15, snapshot.size * 5); 
    track.style.animationDuration = duration + "s";
});

// وظيفة المعالجة لضمان وصول الرسالة للموقع الرئيسي (index.html)
window.handlePostClick = function(postId) {
    // 1. طلب الانتقال لصفحة المقالات في الموقع الرئيسي
    window.parent.postMessage({
        type: 'OPEN_PAGE', 
        page: 'posts'
    }, '*');

    // 2. إرسال أمر فتح المنشور المحدد
    // نستخدم تأخير بسيط لضمان تحميل إطار المقالات أولاً
    setTimeout(() => {
        window.parent.postMessage({
            type: 'OPEN_SPECIFIC_POST', 
            id: postId
        }, '*');
    }, 300);
};

const toggleBtn = document.getElementById('toggleSlider');
const trackElement = document.getElementById('sliderTrack');
if (toggleBtn && trackElement) {
    toggleBtn.onclick = () => { 
        trackElement.classList.toggle('paused'); 
        toggleBtn.innerText = trackElement.classList.contains('paused') ? "▶" : "⏸"; 
    };
}
