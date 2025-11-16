const { validateOnboarding } = require('../utils/validation');

const handleOnboarding = (req, res) => {
  try {
    console.log('==============================');
    console.log('📥 Received onboarding data:', req.body);
    console.log('==============================');

    // دعم كل من req.body.data أو req.body مباشرة
    const data = req.body.data ?? req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'لم يتم إرسال أي بيانات'
      });
    }

    const { activities, dailyWork, schedule, subjects } = data;

    if (!dailyWork || !schedule || !subjects) {
      return res.status(400).json({
        status: 'error',
        message: 'بعض البيانات الأساسية ناقصة (dailyWork أو schedule أو subjects)'
      });
    }

    const validation = validateOnboarding(data);
    if (!validation.valid) {
      return res.status(400).json({
        status: 'error',
        message: validation.message
      });
    }

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
