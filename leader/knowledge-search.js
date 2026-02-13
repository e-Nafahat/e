async function executeKSearch() {
    const query = document.getElementById('kInput').value;
    if(!query || query.length < 2) return;

    const modal = document.getElementById('kModal');
    const loader = document.getElementById('kLoader');
    const answerArea = document.getElementById('kAnswer');

    modal.style.display = 'block';
    answerArea.innerHTML = '';
    loader.style.display = 'block';

    try {
        // الاتصال بملف السيرفر الذي وضعناه في netlify/functions
        const response = await fetch('/.netlify/functions/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        });

        const data = await response.json();
        loader.style.display = 'none';
        
        if(data.candidates && data.candidates[0].content.parts[0].text) {
            let result = data.candidates[0].content.parts[0].text;
            answerArea.innerHTML = result.replace(/\n/g, '<br>');
        } else {
            answerArea.innerHTML = "لم تظهر نتائج، حاول صياغة السؤال بشكل اوضح.";
        }
    } catch (error) {
        loader.style.display = 'none';
        answerArea.innerHTML = "نعتذر، حدث خطأ في الاتصال بالباحث المعرفي. تأكد من استقرار الخادم.";
    }
}

function closeKModal() {
    document.getElementById('kModal').style.display = 'none';
}

// جعل الوظائف متاحة للزر في صفحة HTML
window.executeKSearch = executeKSearch;
window.closeKModal = closeKModal;
