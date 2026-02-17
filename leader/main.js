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

// --- منطق التحديث التلقائي الصامت (حل مشكلة حذف التطبيق) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // تسجيل الـ Service Worker من المجلد المتفق عليه في الذاكرة
        navigator.serviceWorker.register('/e/sw.js').then(reg => {
            // التحقق من وجود تحديثات في الخلفية
            reg.onupdatefound = () => {
                const installingWorker = reg.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // تم العثور على نسخة جديدة (v5 مثلاً)، نقوم بالتحديث فوراً
                            console.log('تحديث جديد متاح.. يتم التثبيت تلقائياً');
                            window.location.reload();
                        }
                    }
                };
            };
        }).catch(err => console.error('فشل تسجيل الـ SW:', err));
    });
}
// -------------------------------------------------------

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
        html += `<div class="slider-item" onclick="window.parent.postMessage({type: 'OPEN_SPECIFIC_POST', id: '${docSnap.id}'}, '*')">${styledTitle}</div>`; 
    });
    track.innerHTML = html + html; 
    const duration = Math.max(15, snapshot.size * 5); 
    track.style.animationDuration = duration + "s";
});

const toggleBtn = document.getElementById('toggleSlider');
const trackElement = document.getElementById('sliderTrack');
if (toggleBtn && trackElement) {
    toggleBtn.onclick = () => { 
        trackElement.classList.toggle('paused'); 
        toggleBtn.innerText = trackElement.classList.contains('paused') ? "▶" : "⏸"; 
    };
}
