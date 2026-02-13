const fetch = require('node-fetch');

exports.handler = async (event) => {
  // السماح بالطلبات فقط من نوع POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { query } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;

    // التعليمات النظامية لضبط سلوك الباحث المعرفي
    const systemInstruction = `
      أنت مساعد بحث معرفي لموقع "نفحات إيمانية". 
      قواعدك الصارمة:
      1. الإجابة تكون فقط من الكتب الإسلامية المكتوبة والأصيلة (منهج أهل السنة والجماعة).
      2. لا تستخدم الخيال أو المصادر الحديثة غير الموثقة.
      3. إذا كان السؤال عن "فتوى" (مثلاً: ما حكم كذا، هل يجوز كذا)، يجب أن تبدأ إجابتك بـ: "عذراً، أنا باحث معرفي ولست جهة إفتاء. للإجابة على هذا السؤال الشرعي، يرجى التوجه للمواقع الرسمية المتخصصة مثل (دار الإفتاء) أو (اللجنة الدائمة للبحوث العلمية والإفتاء)".
      4. عند ذكر حديث، اكتبه كاملاً بسنده ومتنه ولا تجتزئه.
      5. لا تلخص النصوص العلمية، اعرضها كاملة كما وردت.
      6. التزم باللغة العربية الفصحى بدون تشكيل (حسب طلب الإدارة).
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: systemInstruction + "\n\nسؤال المستخدم: " + query }] }
        ]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "فشل الاتصال بالخادم" })
    };
  }
};
