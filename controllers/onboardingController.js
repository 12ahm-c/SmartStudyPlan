const { validateOnboarding } = require('../utils/validation');

const handleOnboarding = (req, res) => {
  try {
    console.log('==============================');
    console.log('📥 Received onboarding data:', req.body);
    console.log('==============================');

    const data = req.body;

    // التأكد من وجود البيانات
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'لم يتم إرسال أي بيانات'
      });
    }

    // البيانات المطلوبة في النظام الجديد
    const { activities, dailyWork, schedule, subjects } = data;

    // التحقق من وجود الحقول الأساسية
    if (!dailyWork || !schedule || !subjects) {
      return res.status(400).json({
        status: 'error',
        message: 'بعض البيانات الأساسية ناقصة (dailyWork أو schedule أو subjects)'
      });
    }

    // تشغيل التحقق حسب قواعدك (إذا كنت تستخدم validation خاص بك)
    const validation = validateOnboarding(data);
    if (!validation.valid) {
      return res.status(400).json({
        status: 'error',
        message: validation.message
      });
    }

    // إرجاع البيانات جاهزة للـ AI
    return res.status(200).json({
      status: 'success',
      message: 'تم استلام البيانات بنجاح وهي جاهزة للمعالجة',
      data
    });

  } catch (err) {
    console.error('❌ Error in handleOnboarding:', err);
    return res.status(500).json({
      status: 'error',
      message: 'حدث خطأ في السيرفر'
    });
  }
};

module.exports = { handleOnboarding };