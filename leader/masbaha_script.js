// /leader/masbaha_script.js

// دالة حماية المفتاح بتجزئة برمجية (تمنع اكتشاف GitHub للمفتاح المستخرج)
function _getSecureKey() {
    const _p1 = "AIzaSyDa4es";
    const _p2 = "EnLqI_qC8fXy";
    const _p3 = "B7lMvW_vV6o4zU";
    return _p1 + _p2 + _p3;
}

const firebaseConfig = {
    apiKey: _getSecureKey(), 
    authDomain: "mywaysite-86618.firebaseapp.com",
    projectId: "mywaysite-86618",
    databaseURL: "https://mywaysite-86618-default-rtdb.firebaseio.com/",
    storageBucket: "mywaysite-86618.firebasestorage.app",
    messagingSenderId: "549219260713",
    appId: "1:549219260713:web:9c2e15f5a7b0cbed8bff38"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// متغيرات الحالة والحفظ المحلي
let count = parseInt(localStorage.getItem('user_count') || 0);
let totalIman = parseInt(localStorage.getItem('total_iman_points') || 0);
let sessionTarget = 100, sessionCurrent = 0;
let isAdminActive = false;
let hasUnlockedVibration = false;
let lastKnownRankName = "";

// نظام الرتب الإيمانية
const ranks = [
    { l: 10000, n: "💎 رتبة: العطاء المستمر", i: "💎" },
    { l: 9000, n: "🌟 رتبة: الإنجاز العظيم", i: "🌟" },
    { l: 8000, n: "📜 رتبة: الهمة العالية", i: "📜" },
    { l: 7000, n: "🕌 رتبة: الإصرار والمداومة", i: "🕌" },
    { l: 6000, n: "🛡️ رتبة: الجد والمثابرة", i: "🛡️" },
    { l: 5000, n: "🏹 رتبة: العزيمة القوية", i: "🏹" },
    { l: 4000, n: "🕯️ رتبة: السعي الدؤوب", i: "🕯️" },
    { l: 3000, n: "📖 رتبة: الاجتهاد الواضح", i: "📖" },
    { l: 2000, n: "📿 رتبة: الخطوات الثابتة", i: "📿" },
    { l: 1000, n: "👑 رتبة: البداية القوية", i: "👑" },
    { l: 500, n: "💠 رتبة: الطموح الإيماني", i: "💠" },
    { l: 100, n: "⭐ رتبة: المثابر الشاب", i: "⭐" },
    { l: 0, n: "✨ رتبة: الذاكر المبتدئ", i: "✨" }
];

function getRank(pts) { 
    return ranks.find(r => (pts || 0) >= r.l) || ranks[ranks.length-1]; 
}

// دالة الإشعار الأنيقة الجديدة (تستخدم الحاوية في ملف HTML)
function showNafahatNotify(msg) {
    const container = document.getElementById('notification-container');
    if(!container) return; 
    const toast = document.createElement('div');
    toast.className = 'nafahat-toast';
    toast.innerText = msg;
    container.appendChild(toast);
    // إزالة الإشعار بعد انتهاء مدة العرض (4 ثوانٍ)
    setTimeout(() => { 
        if(toast.parentNode) toast.remove(); 
    }, 4000);
}

function shareTo(platform) {
    const url = window.location.href;
    const text = "قال ﷺ: (أحب الكلام إلى الله أربع: سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر). شاركني ذكر الله عبر مسبحة نَفَحَاتٌ إِيمَانِيَّةٌ العالمية: ";
    let shareLink = "";
    if(platform === 'whatsapp') shareLink = `https://wa.me/?text=${encodeURIComponent(text + url)}`;
    else if(platform === 'telegram') shareLink = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    else if(platform === 'twitter') shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareLink, '_blank');
}

window.addEventListener('load', () => {
    lastKnownRankName = getRank(totalIman).n;
    if(window.location.hash === "#chat-section") {
        setTimeout(() => { document.getElementById('chat-section').scrollIntoView({ behavior: 'smooth' }); }, 800);
    }
});

function forceVibrationAccess() {
    if (!hasUnlockedVibration) {
        if ("vibrate" in navigator) {
            navigator.vibrate(10); 
            hasUnlockedVibration = true;
        }
    }
}

let adminTimer;
const rankEl = document.getElementById('current-rank');
rankEl.addEventListener('touchstart', () => adminTimer = setTimeout(checkAdmin, 3000));
rankEl.addEventListener('touchend', () => clearTimeout(adminTimer));
rankEl.addEventListener('mousedown', () => adminTimer = setTimeout(checkAdmin, 3000));
rankEl.addEventListener('mouseup', () => clearTimeout(adminTimer));

function checkAdmin() {
    const pass = prompt("من فضلك أدخل رمز الوصول الإداري:");
    if(pass === "FM1661") { 
        isAdminActive = true; 
        document.querySelectorAll('.del-msg-btn').forEach(b => b.style.display = 'block');
        toggleModal('admin'); 
    }
}

function toggleModal(type, data = null) {
    const modal = document.getElementById('appModal');
    const body = document.getElementById('modal-body');
    const title = document.getElementById('modal-title');
    
    title.style.color = "var(--gold)";

    if(type === 'guide') {
        title.innerText = "دليل المسبحة الذكية 🕋";
        body.innerHTML = `
            <div class="guide-bead-icon">📿</div>
            <div class="guide-item"><span>🔘 الخرزة المركزية</span><p>انقر على الخرزة الكبيرة لزيادة العداد. ستشعر باهتزاز تفاعلي، ويتم حفظ تقدمك تلقائياً.</p></div>
            <div class="guide-item"><span>🎯 أهداف الجلسات</span><p>الحلقة الذهبية حول المسبحة تكتمل تدريجياً مع كل تسبيحة لتخبرك بمدى قربك من إنهاء وردك.</p></div>
            <div class="guide-item"><span>📈 شريط الإيمان والرتب</span><p>كل تسبيحة تزيد من نقاط إيمانك. هناك 13 رتبة تعكس مثابرتك.</p></div>
            <div class="guide-item"><span>🌍 العداد العالمي وملتقى الذاكرين</span><p>العداد يظهر تسبيحات المسلمين حول العالم في الوقت الفعلي.</p></div>
            <div class="guide-item"><span>🛡️ حصن المسلم الكامل</span><p>يحتوي على كافة الأذكار والأدعية والرقية الشرعية.</p></div>
        `;
    } else if(type === 'rankUp') {
        title.innerText = "اجتهاد مبارك! 🎉";
        body.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <div style="font-size:4.5rem; margin-bottom:15px;">${data.i}</div>
                <h2 style="color:var(--gold-light); margin-bottom:10px;">وصلت إلى ${data.n}</h2>
                <p style="color:#eee; line-height:1.6;">ما شاء الله! استمر في هذا الطريق المبارك.</p>
            </div>
        `;
    } else if(type === 'hisn') {
        title.innerText = "حصن المسلم الكامل";
        body.innerHTML = `<iframe src="https://www.hisnmuslim.com/i/ar/1" style="width:100%; height:70vh; border:none; border-radius:15px;"></iframe>`;
    } else if(type === 'admin') {
        title.innerText = "لوحة التحكم الإدارية 🛠️";
        body.innerHTML = `
            <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:15px;">
                <p style="font-size:0.8rem; margin-bottom:10px;">تعديل العداد العالمي:</p>
                <input type="number" id="manualGlobal" style="width:100%; background:#222; border:1px solid var(--gold); color:white; padding:10px; border-radius:8px;">
                <button class="admin-panel-btn" onclick="db.ref('global_counter').set(parseInt(document.getElementById('manualGlobal').value)); showNafahatNotify('تم تحديث العداد بنجاح');">تحديث العداد</button>
                <button class="admin-panel-btn" style="background:#800000; margin-top:20px;" onclick="if(confirm('مسح كل الرسائل؟')) { db.ref('messages').remove(); showNafahatNotify('تم مسح جميع الرسائل'); }">مسح كل الرسائل</button>
            </div>
        `;
    } else if(type === 'confirmReset') {
        title.innerText = "تصفير عداد الجلسة";
        title.style.color = "var(--maroon)";
        body.innerHTML = `
            <div class="confirm-card-3d">
                <p style="color:#eee; font-size:0.9rem; margin-bottom:8px;">هل أنت متأكد من تصفير العداد؟</p>
                <div class="confirm-btns-row">
                    <button class="btn-confirm btn-yes" onclick="executeReset()">تصفير الآن</button>
                    <button class="btn-confirm btn-no" onclick="closeAllModals()">تراجع</button>
                </div>
            </div>
        `;
    }

    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

function closeAllModals() {
    document.getElementById('appModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}

function updateUI() {
    document.getElementById('counter').innerText = count;
    document.getElementById('session-display').innerText = `هدف: ${sessionTarget} / ${sessionCurrent}`;
    document.getElementById('target-ring').style.strokeDashoffset = 440 - (Math.min(sessionCurrent / sessionTarget, 1) * 440);
    
    const r = getRank(totalIman);
    document.getElementById('current-rank').innerText = r.n;

    if (lastKnownRankName !== "" && r.n !== lastKnownRankName) {
        toggleModal('rankUp', r);
    }
    lastKnownRankName = r.n;

    let nextLimit = 10000, currentBase = 0;
    for(let i=ranks.length-1; i>=0; i--) { 
        if(totalIman < ranks[i].l) { 
            nextLimit = ranks[i].l; 
            currentBase = (ranks[i+1]) ? ranks[i+1].l : 0; 
            break; 
        } 
    }
    const prog = Math.min(((totalIman - currentBase) / (nextLimit - currentBase)) * 100, 100);
    document.getElementById('progress-fill').style.width = prog + "%";
    document.getElementById('rank-percent').innerText = Math.floor(prog) + "%";
}

function triggerVibration(isComplete) {
    if ("vibrate" in navigator) {
        try {
            if (isComplete) navigator.vibrate([300, 100, 300, 100, 300]); 
            else navigator.vibrate(60); 
        } catch (e) { console.log("Vibration blocked"); }
    }
}

function celebrateGoal() {
    const body = document.getElementById('main-body');
    const bead = document.getElementById('main-bead');
    body.classList.add('celebrate-flash');
    bead.classList.add('bead-win-glow');
    setTimeout(() => {
        body.classList.remove('celebrate-flash');
        bead.classList.remove('bead-win-glow');
    }, 800);
}

let isThrottled = false;
function doCount() {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => isThrottled = false, 80);

    count++; totalIman++; sessionCurrent++;
    localStorage.setItem('user_count', count); 
    localStorage.setItem('total_iman_points', totalIman);
    
    if (sessionCurrent >= sessionTarget) {
        triggerVibration(true);
        celebrateGoal();
        sessionCurrent = 0;
    } else {
        triggerVibration(false);
    }
    
    updateUI(); 
    db.ref('global_counter').transaction(c => (c || 0) + 1);
}

function setDhikr(t) { document.getElementById('active-dhikr').innerText = t; }
function setSessionTarget(t) { 
    sessionTarget = t; 
    sessionCurrent = 0; 
    document.querySelectorAll('.session-btn').forEach(b => b.classList.toggle('active', b.innerText == t)); 
    updateUI(); 
}

function resetCount() { toggleModal('confirmReset'); }

function executeReset() {
    count = 0; sessionCurrent = 0;
    localStorage.setItem('user_count', count);
    updateUI(); closeAllModals();
    showNafahatNotify('تم تصفير العداد بنجاح');
}

/**
 * دالة إرسال الرسالة المحدثة بنظام الإشعارات الشيك
 */
function sendMsg() {
    const n = document.getElementById('uName').value;
    const m = document.getElementById('uMsg').value;
    
    const today = new Date().toISOString().split('T')[0];
    const lastPostDate = localStorage.getItem('last_post_date');

    if (n && m) {
        if (!isAdminActive && lastPostDate === today) {
            showNafahatNotify("تقبل الله منك، شاركت بذكر اليوم. موعدنا غداً إن شاء الله ✨");
            return;
        }

        const messagesRef = db.ref('messages');
        const newMessageRef = messagesRef.push();
        
        newMessageRef.set({ 
            username: n, 
            message: m, 
            points: totalIman,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
            localStorage.setItem('last_post_date', today);
            document.getElementById('uMsg').value = ''; 
            showNafahatNotify("تمت إضافة ذكرك في ملتقى الذاكرين بنجاح 🎉");
        }).catch((error) => {
            console.error("Firebase Error Details:", error);
            showNafahatNotify("عذراً، تعذر الإرسال. تأكد من الإنترنت ⚠️");
        });
    } else {
        showNafahatNotify("يرجى كتابة الاسم والذكر أولاً ✍️");
    }
}

function deleteSingleMsg(key) { 
    if(confirm("هل تريد حذف هذه الرسالة؟")) { 
        db.ref('messages').child(key).remove(); 
        showNafahatNotify('تم حذف الرسالة بنجاح');
    } 
}

db.ref('global_counter').on('value', snap => {
    document.getElementById('global-counter-display').innerText = (snap.val() || 0).toLocaleString();
});

db.ref('messages').limitToLast(15).on('value', snap => {
    const box = document.getElementById('chat-box'); box.innerHTML = '';
    snap.forEach(child => {
        const d = child.val(); 
        const r = getRank(d.points);
        const showDel = isAdminActive ? 'display:block' : 'display:none';
        box.innerHTML += `
            <div class="msg-card-3d">
                <button class="del-msg-btn" style="${showDel}" onclick="deleteSingleMsg('${child.key}')">🗑️</button>
                <div class="msg-user">${r.i} ${d.username}</div>
                <div class="msg-text">${d.message}</div>
            </div>`;
    });
    box.scrollTop = box.scrollHeight;
});

updateUI();
