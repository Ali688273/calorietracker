/* CalorieYar — Complete bilingual UI (FA/EN), RTL/LTR, device auto-detection */
(function () {
  "use strict";

  const KEY = "calorie_yar_language_v2";
  const fa = {
    "کالری‌شمار هوشمند":"کالری‌یار","امروز":"امروز","خلاصه انرژی امروز":"خلاصه انرژی امروز",
    "دریافتی":"دریافتی","باقیمانده":"باقیمانده","سوخته شده":"سوخته شده",
    "مصرف آب امروز":"مصرف آب امروز","خوراکی‌ها":"خوراکی‌ها","کالری‌سوزی":"کالری‌سوزی","آمار":"آمار","تنظیمات":"تنظیمات",
    "داشبورد":"داشبورد","هفتگی":"هفتگی","ماهانه":"ماهانه","سالانه":"سالانه","نمودار تغییرات وزن":"نمودار تغییرات وزن",
    "ثبت وزن جدید":"ثبت وزن جدید","وزن امروز (کیلوگرم)":"وزن امروز (کیلوگرم)","ثبت وزن":"ثبت وزن",
    "تاریخچه وزن":"تاریخچه وزن","جنسیت":"جنسیت","مرد":"مرد","زن":"زن","سن":"سن","قد (سانتی‌متر)":"قد (سانتی‌متر)",
    "وزن (کیلوگرم)":"وزن (کیلوگرم)","سطح فعالیت":"سطح فعالیت","ذخیره تغییرات":"ذخیره تغییرات",
    "کم (نشسته)":"کم (نشسته)","متوسط (۱-۳ روز ورزش در هفته)":"متوسط (۱-۳ روز ورزش در هفته)",
    "زیاد (۳-۵ روز ورزش در هفته)":"زیاد (۳-۵ روز ورزش در هفته)","خیلی زیاد (۶-۷ روز ورزش)":"خیلی زیاد (۶-۷ روز ورزش)",
    "جستجو (مثلاً: نان، سیب، جوجه)...":"جستجو (مثلاً: نان، سیب، جوجه)...","جستجوی فعالیت یا ورزش...":"جستجوی فعالیت یا ورزش...",
    "+ افزودن خوراکی دستی (اگر در لیست نبود)":"+ افزودن خوراکی دستی (اگر در لیست نبود)",
    "+ افزودن فعالیت دستی (اگر در لیست نبود)":"+ افزودن فعالیت دستی (اگر در لیست نبود)",
    "به کالری‌شمار خوش آمدید":"به کالری‌یار خوش آمدید","شروع و محاسبه BMR":"شروع و محاسبه BMR",
    "افزودن خوراکی جدید":"افزودن خوراکی جدید","نام خوراکی":"نام خوراکی","کالری در ۱۰۰ گرم":"کالری در ۱۰۰ گرم",
    "افزودن فعالیت ورزشی جدید":"افزودن فعالیت ورزشی جدید","نام فعالیت":"نام فعالیت","کالری‌سوزی در دقیقه":"کالری‌سوزی در دقیقه",
    "انصراف":"انصراف","ثبت در امروز":"ثبت در امروز","افزودن به لیست":"افزودن به لیست","ثبت آیتم":"ثبت آیتم",
    "مقدار (گرم)":"مقدار (گرم)","تنظیمات پروفایل":"تنظیمات پروفایل","انتخاب زبان":"انتخاب زبان",
    "فارسی":"فارسی","English":"English"
  };

  const en = {
    "کالری‌شمار هوشمند":"CalorieYar","امروز":"Today","خلاصه انرژی امروز":"Today's Energy",
    "دریافتی":"Consumed","باقیمانده":"Remaining","سوخته شده":"Burned",
    "مصرف آب امروز":"Today's Water","خوراکی‌ها":"Foods","کالری‌سوزی":"Exercise","آمار":"Statistics","تنظیمات":"Settings",
    "داشبورد":"Dashboard","هفتگی":"Weekly","ماهانه":"Monthly","سالانه":"Yearly","نمودار تغییرات وزن":"Weight Progress",
    "ثبت وزن جدید":"Add Weight","وزن امروز (کیلوگرم)":"Today's weight (kg)","ثبت وزن":"Save Weight",
    "تاریخچه وزن":"Weight History","جنسیت":"Gender","مرد":"Male","زن":"Female","سن":"Age","قد (سانتی‌متر)":"Height (cm)",
    "وزن (کیلوگرم)":"Weight (kg)","سطح فعالیت":"Activity level","ذخیره تغییرات":"Save Changes",
    "کم (نشسته)":"Low (sedentary)","متوسط (۱-۳ روز ورزش در هفته)":"Moderate (1–3 days/week)",
    "زیاد (۳-۵ روز ورزش در هفته)":"High (3–5 days/week)","خیلی زیاد (۶-۷ روز ورزش)":"Very high (6–7 days/week)",
    "جستجو (مثلاً: نان، سیب، جوجه)...":"Search (e.g. bread, apple, chicken)...","جستجوی فعالیت یا ورزش...":"Search activity or exercise...",
    "+ افزودن خوراکی دستی (اگر در لیست نبود)":"+ Add custom food (if not listed)",
    "+ افزودن فعالیت دستی (اگر در لیست نبود)":"+ Add custom activity (if not listed)",
    "به کالری‌شمار خوش آمدید":"Welcome to CalorieYar","شروع و محاسبه BMR":"Start & calculate BMR",
    "افزودن خوراکی جدید":"Add food","نام خوراکی":"Food name","کالری در ۱۰۰ گرم":"Calories per 100 g",
    "افزودن فعالیت ورزشی جدید":"Add exercise","نام فعالیت":"Activity name","کالری‌سوزی در دقیقه":"Calories burned per minute",
    "انصراف":"Cancel","ثبت در امروز":"Add today","افزودن به لیست":"Add to list","ثبت آیتم":"Add item",
    "مقدار (گرم)":"Amount (g)","تنظیمات پروفایل":"Profile settings","انتخاب زبان":"Language",
    "فارسی":"Persian","English":"English"
  };

  const reverse = {};
  Object.keys(fa).forEach(k => { if (fa[k]) reverse[fa[k]] = k; });

  function getLang() {
    const saved = localStorage.getItem(KEY);
    if (saved === "fa" || saved === "en") return saved;
    return ((navigator.language || "").toLowerCase().startsWith("fa") || (navigator.language || "").toLowerCase().startsWith("ar")) ? "fa" : "en";
  }

  function translateValue(value, lang) {
    if (!value) return value;
    if (lang === "fa") {
      if (en[value]) return Object.keys(en).find(k => en[k] === value) || value;
      return value;
    }
    return en[value] || value;
  }

  function translateNode(node, lang) {
    const dict = lang === "en" ? en : fa;
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (dict[trimmed]) node.nodeValue = raw.replace(trimmed, dict[trimmed]);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    ["placeholder","title","aria-label"].forEach(a => {
      const v = node.getAttribute(a);
      if (v && dict[v]) node.setAttribute(a, dict[v]);
    });
    node.childNodes.forEach(n => translateNode(n, lang));
  }

  function apply(lang) {
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-en", lang === "en");
    document.body.classList.toggle("lang-fa", lang === "fa");
    translateNode(document.body, lang);
    const b = document.getElementById("cy-language-toggle");
    if (b) {
      b.textContent = lang === "fa" ? "EN" : "فا";
      b.title = lang === "fa" ? "Switch to English" : "تغییر به فارسی";
      b.setAttribute("aria-label", b.title);
    }
    window.cyLanguage = lang;
    try { localStorage.setItem("cy_lang", lang); } catch(e) {}
  }

  function toggle() { apply(getLang() === "fa" ? "en" : "fa"); }

  function init() {
    if (!document.getElementById("cy-language-toggle")) {
      const b = document.createElement("button");
      b.id = "cy-language-toggle";
      b.type = "button";
      b.onclick = toggle;
      b.textContent = getLang() === "fa" ? "EN" : "فا";
      const h = document.querySelector(".header");
      if (h) h.appendChild(b);
    }
    apply(getLang());
    const observer = new MutationObserver(mutations => {
      const lang = getLang();
      mutations.forEach(m => m.addedNodes.forEach(n => translateNode(n, lang)));
    });
    observer.observe(document.body, {childList:true, subtree:true});
  }

  window.CalorieYarLanguage = {get:getLang, set:apply, toggle};
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();