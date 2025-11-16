const { buildPrompt } = require('../utils/aiPromptBuilder');
const axios = require('axios');

exports.generateStudyPlan = async (req, res) => {
  try {
    console.log("===== AI Request Body =====");
    console.log(req.body);

    // استقبال البيانات سواء كانت مغلفة بـ data أو مباشرة
    const data = req.body.data ?? req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "لم يتم إرسال أي بيانات"
      });
    }

    console.log("📥 Received data:", data);

    // بناء الـ prompt للـ AI باستخدام كل البيانات
    const prompt = buildPrompt(data);

    // إرسال البيانات للـ AI
    const apiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    let aiResult = apiResponse.data.choices[0].message.content;

    // تحويل رد AI إلى JSON
    let studyplan = null;
    const jsonMatch = aiResult.match(/```json([\s\S]*?)```/);

    if (jsonMatch) {
      studyplan = JSON.parse(jsonMatch[1].trim());
    } else {
      studyplan = JSON.parse(aiResult);
    }

    console.log("📤 Sending studyplan:", studyplan);

    // إرسال البيانات للـ frontend
    res.json({
      status: "success",
      message: "تم إنشاء جدول المراجعة بنجاح",
      studyplan
    });

  } catch (error) {
    console.error("Error generating study plan:", error);
    res.status(500).json({
      status: "error",
      message: "حدث خلل في توليد جدول الدراسة",
      error: error.message
    });
  }
};
