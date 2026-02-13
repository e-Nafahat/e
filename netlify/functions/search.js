const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { query } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY; // سيقوم Netlify بجلب المفتاح آلياً من الإعدادات التي قمت بها

    const systemInstruction = `
      أنت مساعد بحث معرفي لموقع "نفحات إيمانية". 
      قواعدك الصارمة:
      1. الإجابة تكون فقط من الكتب الإسلامية المكتوبة والأصيلة (منهج أهل السنة والجماعة).
      2. إذا سأل المستخدم عن "فتوى" (مثلاً: ما حكم كذا، هل يجوز كذا)، يجب أن تعتذر وتوجهه للمواقع الرسمية (مثل دار الإفتاء) لأنك باحث نصوص ولست مفتياً.
      3. التزم باللغة العربية الفصحى بدون تشكيل.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: systemInstruction + "\n\nسؤال المستخدم: " + query }] }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "فشل الاتصال" }) };
  }
};
