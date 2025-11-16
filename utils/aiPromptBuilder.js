exports.buildPrompt = ({ activities, dailyWork, schedule, subjects }) => {
  // تحويل المواد إلى نص
  const subjectsList = subjects.map(s => `- ${s.name} (معامل: ${s.coefficient})`).join("\n");

  // تحويل أوقات الأنشطة إلى نص
  const activitiesList = activities && activities.length > 0
    ? activities.map(a => `* ${a.name} من ${a.startTime} إلى ${a.endTime}`).join("\n")
    : "لا توجد أنشطة إضافية";

  // تحويل حالة الأيام إلى نص
  const scheduleList = Object.entries(schedule)
    .map(([day, info]) => `* ${day}: ${info.status}`)
    .join("\n");

  return `
أنت مساعد ذكي لصناعة جدول مراجعة أسبوعي للطلاب.

# بيانات الطالب:
- أوقات العمل اليومية: من ${dailyWork.start} إلى ${dailyWork.end}

# حالة الأيام:
${scheduleList}

# المواد:
${subjectsList}

# الأنشطة الإضافية:
${activitiesList}

# المطلوب:
قم بإنشاء جدول مراجعة أسبوعي كامل:
- موزع حسب الأيام من الإثنين إلى الأحد
- يأخذ بعين الاعتبار أوقات العمل اليومية والأيام المحجوزة
- يستغل ساعات الفراغ فقط
- يعطي وقتًا كافيًا للمواد الأساسية (المعامل الأكبر)
- يخصص وقتًا أقل للمواد الأقل أهمية
- اجعل الجدول منطقيًا من حيث توقيت بداية وانتهاء الدروس
- لا تتجاوز الدروس أوقات العمل أو الأنشطة

أعطني النتيجة فقط بصيغة JSON نظيف كالتالي، بدون أي شرح آخر:

{
  "Mon": { "start-end": "subject", ... },
  "Tue": { ... },
  "Wed": { ... },
  "Thu": { ... },
  "Fri": { ... },
  "Sat": { ... },
  "Sun": { ... }
}

ابدأ الآن.
`;
};