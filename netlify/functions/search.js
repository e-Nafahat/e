const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const { query } = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY; // استدعاء المفتاح من الخزنة سرياً

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنت باحث شرعي متخصص على منهج أهل السنة والجماعة. أجب عن السؤال التالي بدقة مستنداً إلى الكتب المعتمدة مع ذكر اسم الكتاب والكاتب، ويجب أن يكون النص باللغة العربية مع التشكيل الكامل. السؤال هو: ${query}`
                    }]
                }]
            })
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "عذراً، حدث خطأ في الاتصال بالخادم" })
        };
    }
};
