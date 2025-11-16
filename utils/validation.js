// utils/validation.js

const validateOnboarding = (data) => {

  // ==============================
  // 1) التحقق من وجود البيانات الرئيسية
  // ==============================
  const { activities, dailyWork, schedule, subjects } = data;

  if (!activities || !Array.isArray(activities)) {
    return { valid: false, message: "حقل activities يجب أن يكون مصفوفة" };
  }

  if (!dailyWork || typeof dailyWork !== "object") {
    return { valid: false, message: "حقل dailyWork مطلوب" };
  }

  if (!schedule || typeof schedule !== "object") {
    return { valid: false, message: "حقل schedule مطلوب" };
  }

  if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return { valid: false, message: "حقل subjects يجب أن يكون مصفوفة غير فارغة" };
  }

  // ==============================
  // 2) التحقق من activities
  // ==============================
  for (const act of activities) {
    if (!act.name || typeof act.name !== "string") {
      return { valid: false, message: "كل نشاط يجب أن يحتوي على name (نص)" };
    }
    if (typeof act.priority !== "number") {
      return { valid: false, message: "كل نشاط يجب أن يحتوي على priority (رقم)" };
    }
    if (!act.startTime || !act.endTime) {
      return { valid: false, message: "كل نشاط يجب أن يحتوي على startTime و endTime" };
    }
  }

  // ==============================
  // 3) التحقق من dailyWork
  // ==============================
  if (!dailyWork.start || !dailyWork.end) {
    return { valid: false, message: "dailyWork يجب أن يحتوي على start و end" };
  }

  // ==============================
  // 4) التحقق من schedule
  // ==============================
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (const day of DAYS) {
    if (!schedule[day] || typeof schedule[day].status !== "string") {
      return { 
        valid: false, 
        message: `اليوم ${day} يجب أن يحتوي على status (free/partial/full)` 
      };
    }
  }

  // ==============================
  // 5) التحقق من subjects
  // ==============================
  for (const subj of subjects) {
    if (!subj.name || typeof subj.name !== "string") {
      return { valid: false, message: "كل مادة يجب أن تحتوي على name (نص)" };
    }
    if (typeof subj.coefficient !== "number") {
      return { valid: false, message: "كل مادة يجب أن تحتوي على coefficient (رقم)" };
    }
  }

  // ==============================
  // 6) إذا جميع البيانات صحيحة
  // ==============================
  return { valid: true };
};

module.exports = { validateOnboarding };