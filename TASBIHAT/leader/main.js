import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "AIzaSyCLiOPn_j8XsO2zdpg3IxYPtXdw5S7h0pc", 
    authDomain: "smart-web-3f6c3.firebaseapp.com", 
    projectId: "smart-web-3f6c3", 
    storageBucket: "smart-web-3f6c3.firebasestorage.app", 
    messagingSenderId: "620446879651", 
    appId: "1:620446879651:web:0d81fb9c3124eeb0d85416" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function formatTitle(title) {
    // تَنْسِيقُ التَّصْنِيفَاتِ الدِّينِيَّةِ (عَقِيدَة، رَقَائِق، سِيرَة) لِتَظْهَرَ بِشَكْلٍ مُمَيَّزٍ
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
        // إِرْسَالُ رِسَالَةٍ إِلَى المَلَفِّ الأَبِ (FrontSmart.html) لِفَتْحِ المَقَالِ المُحَدَّدِ
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
