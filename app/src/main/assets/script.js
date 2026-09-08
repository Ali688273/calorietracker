// ==========================================
// ۱. دیتابیس کامل و جامع خوراکی‌ها (بیش از ۱7۰ نوع خوراکی)
// ==========================================
const OFFLINE_FOODS_DB = [
    // --- نان و غلات ---
    { id: "f1", name: "نان سنگک", cal: 259, unit: "100 گرم" },
    { id: "f2", name: "نان بربری", cal: 265, unit: "100 گرم" },
    { id: "f3", name: "نان لواش", cal: 285, unit: "100 گرم" },
    { id: "f4", name: "نان تافتون", cal: 270, unit: "100 گرم" },
    { id: "f5", name: "نان تست سفید", cal: 265, unit: "100 گرم" },
    { id: "f6", name: "نان تست جو", cal: 240, unit: "100 گرم" },
    { id: "f7", name: "برنج سفید پخته (چلو)", cal: 130, unit: "100 گرم" },
    { id: "f8", name: "برنج زعفرانی / باقالی پلو", cal: 165, unit: "100 گرم" },
    { id: "f9", name: "ماکارونی پخته با سویا/گوشت", cal: 160, unit: "100 گرم" },
    { id: "f10", name: "جو پرک", cal: 389, unit: "100 گرم" },
    { id: "f11", name: "سیب‌زمینی آب‌پز", cal: 87, unit: "100 گرم" },
    { id: "f12", name: "ذرت پخته (کنسرو)", cal: 96, unit: "100 گرم" },
    { id: "f13", name: "عدس پخته", cal: 116, unit: "100 گرم" },
    { id: "f14", name: "نخود پخته", cal: 164, unit: "100 گرم" },
    { id: "f15", name: "لوبیا قرمز / چیتی پخته", cal: 127, unit: "100 گرم" },

    // --- غذاهای ایرانی و سنتی ---
    { id: "f16", name: "چلو کباب کوبیده", cal: 240, unit: "100 گرم" },
    { id: "f17", name: "جوجه کباب (سینه)", cal: 185, unit: "100 گرم" },
    { id: "f18", name: "کباب برگ", cal: 200, unit: "100 گرم" },
    { id: "f19", name: "خورشت قرمه سبزی", cal: 175, unit: "100 گرم" },
    { id: "f20", name: "خورشت قیمه", cal: 185, unit: "100 گرم" },
    { id: "f21", name: "خورشت فسنجان", cal: 260, unit: "100 گرم" },
    { id: "f22", name: "خورشت بادمجان", cal: 190, unit: "100 گرم" },
    { id: "f23", name: "خورشت کرفس", cal: 160, unit: "100 گرم" },
    { id: "f24", name: "خورشت بامیه", cal: 150, unit: "100 گرم" },
    { id: "f25", name: "زرشک پلو با مرغ", cal: 195, unit: "100 گرم" },
    { id: "f26", name: "ته‌چین مرغ", cal: 210, unit: "100 گرم" },
    { id: "f27", name: "آبگوشت / دیزی", cal: 220, unit: "100 گرم" },
    { id: "f28", name: "کوفته تبریزی", cal: 160, unit: "100 گرم" },
    { id: "f29", name: "دلمه برگ مو", cal: 145, unit: "100 گرم" },
    { id: "f30", name: "دلمه بادمجان / فلفل", cal: 150, unit: "100 گرم" },
    { id: "f31", name: "میرزا قاسمی", cal: 130, unit: "100 گرم" },
    { id: "f32", name: "کشک بادمجان", cal: 210, unit: "100 گرم" },
    { id: "f33", name: "عدسی", cal: 110, unit: "100 گرم" },
    { id: "f34", name: "خوراک لوبیا چیتی", cal: 120, unit: "100 گرم" },
    { id: "f35", name: "حلیم گندم با گوشت", cal: 180, unit: "100 گرم" },
    { id: "f36", name: "آش رشته", cal: 140, unit: "100 گرم" },
    { id: "f37", name: "آش دوغ", cal: 95, unit: "100 گرم" },
    { id: "f38", name: "آش شله قلمکار", cal: 160, unit: "100 گرم" },
    { id: "f39", name: "لوبیا پلو", cal: 180, unit: "100 گرم" },
    { id: "f40", name: "عدس پلو", cal: 175, unit: "100 گرم" },
    { id: "f41", name: "استامبولی پلو", cal: 170, unit: "100 گرم" },
    { id: "f42", name: "کوکوسبزی", cal: 190, unit: "100 گرم" },
    { id: "f43", name: "کوکو سیب‌زمینی", cal: 220, unit: "100 گرم" },
    { id: "f44", name: "کتلت گوشت", cal: 240, unit: "100 گرم" },
    { id: "f45", name: "شامی کباب", cal: 230, unit: "100 گرم" },

    // --- گوشت، مرغ، ماهی و تخم‌مرغ ---
    { id: "f46", name: "سینه مرغ آب‌پز", cal: 165, unit: "100 گرم" },
    { id: "f47", name: "ران مرغ بدون پوست", cal: 190, unit: "100 گرم" },
    { id: "f48", name: "گوشت گوساله کم‌چرب", cal: 200, unit: "100 گرم" },
    { id: "f49", name: "گوشت گوسفندی", cal: 280, unit: "100 گرم" },
    { id: "f50", name: "ماهی قزل‌آلا", cal: 145, unit: "100 گرم" },
    { id: "f51", name: "ماهی سالمون", cal: 208, unit: "100 گرم" },
    { id: "f52", name: "تن ماهی در روغن (کنسرو)", cal: 198, unit: "100 گرم" },
    { id: "f53", name: "تن ماهی در آب‌نمک", cal: 116, unit: "100 گرم" },
    { id: "f54", name: "میگو پخته", cal: 99, unit: "100 گرم" },
    { id: "f55", name: "تخم مرغ آب‌پز", cal: 155, unit: "100 گرم" },
    { id: "f56", name: "تخم مرغ نیمرو", cal: 210, unit: "100 گرم" },
    { id: "f57", name: "املت گوجه‌فرنگی", cal: 140, unit: "100 گرم" },

    // --- لبنیات ---
    { id: "f58", name: "شیر کم‌چرب", cal: 42, unit: "100 گرم" },
    { id: "f59", name: "شیر پرچرب", cal: 61, unit: "100 گرم" },
    { id: "f60", name: "ماست کم‌چرب", cal: 55, unit: "100 گرم" },
    { id: "f61", name: "ماست یونانی / چکیده", cal: 97, unit: "100 گرم" },
    { id: "f62", name: "پنیر سفید صبحانه", cal: 210, unit: "100 گرم" },
    { id: "f63", name: "پنیر لاکتیکی", cal: 180, unit: "100 گرم" },
    { id: "f64", name: "پنیر خامه ای", cal: 342, unit: "100 گرم" },
    { id: "f65", name: "پنیر پیتزا (موتزارلا)", cal: 300, unit: "100 گرم" },
    { id: "f66", name: "خامه صبحانه", cal: 340, unit: "100 گرم" },
    { id: "f67", name: "کره حیوانى", cal: 717, unit: "100 گرم" },
    { id: "f68", name: "سرشیر", cal: 380, unit: "100 گرم" },

    // --- میوه‌ها و سبزیجات ---
    { id: "f69", name: "سیب", cal: 52, unit: "100 گرم" },
    { id: "f70", name: "موز", cal: 89, unit: "100 گرم" },
    { id: "f71", name: "پرتقال", cal: 47, unit: "100 گرم" },
    { id: "f72", name: "هندوانه", cal: 30, unit: "100 گرم" },
    { id: "f73", name: "خیار", cal: 15, unit: "100 گرم" },
    { id: "f74", name: "گوجه فرنگی", cal: 18, unit: "100 گرم" },
    { id: "f75", name: "خرما", cal: 282, unit: "100 گرم" },
    { id: "f76", name: "توت فرنگی", cal: 32, unit: "100 گرم" },
    { id: "f77", name: "انگور", cal: 69, unit: "100 گرم" },
    { id: "f78", name: "گیلاس", cal: 50, unit: "100 گرم" },
    { id: "f79", name: "آلبالو", cal: 50, unit: "100 گرم" },
    { id: "f80", name: "هلو", cal: 39, unit: "100 گرم" },
    { id: "f81", name: "زردآلو", cal: 48, unit: "100 گرم" },
    { id: "f82", name: "کیوی", cal: 61, unit: "100 گرم" },
    { id: "f83", name: "انار", cal: 83, unit: "100 گرم" },
    { id: "f84", name: "انجیر تازه", cal: 74, unit: "100 گرم" },
    { id: "f85", name: "خربزه / طالبی", cal: 34, unit: "100 گرم" },
    { id: "f86", name: "گلابی", cal: 57, unit: "100 گرم" },
    { id: "f87", name: "آناناس", cal: 50, unit: "100 گرم" },
    { id: "f88", name: "نارنگی", cal: 53, unit: "100 گرم" },
    { id: "f89", name: "خرمالو", cal: 70, unit: "100 گرم" },
    { id: "f90", name: "کلم بروکلی", cal: 34, unit: "100 گرم" },
    { id: "f91", name: "کاهو", cal: 15, unit: "100 گرم" },
    { id: "f92", name: "اسفناج", cal: 23, unit: "100 گرم" },
    { id: "f93", name: "هویج", cal: 41, unit: "100 گرم" },
    { id: "f94", name: "قارچ", cal: 22, unit: "100 گرم" },
    { id: "f95", name: "فلفل دلمه‌ای", cal: 20, unit: "100 گرم" },
    { id: "f96", name: "کدو سبز", cal: 17, unit: "100 گرم" },
    { id: "f97", name: "بادمجان", cal: 25, unit: "100 گرم" },
    { id: "f98", name: "پیاز", cal: 40, unit: "100 گرم" },
    { id: "f99", name: "کرفس", cal: 16, unit: "100 گرم" },
    { id: "f100", name: "گل کلم", cal: 25, unit: "100 گرم" },
    { id: "f101", name: "سبزی خوردن", cal: 20, unit: "100 گرم" },

    // --- تنقلات، آجیل و مغزیجات ---
    { id: "f102", name: "گردو", cal: 654, unit: "100 گرم" },
    { id: "f103", name: "بادام درختی", cal: 579, unit: "100 گرم" },
    { id: "f104", name: "پسته", cal: 560, unit: "100 گرم" },
    { id: "f105", name: "بادم هندی", cal: 553, unit: "100 گرم" },
    { id: "f106", name: "فندق", cal: 628, unit: "100 گرم" },
    { id: "f107", name: "تخمه آفتابگردان با پوست", cal: 584, unit: "100 گرم" },
    { id: "f108", name: "تخمه کدو با پوست", cal: 446, unit: "100 گرم" },
    { id: "f109", name: "تخمه ژاپنی / هندوانه", cal: 560, unit: "100 گرم" },
    { id: "f110", name: "بادام زمینی", cal: 567, unit: "100 گرم" },
    { id: "f111", name: "چیپس سیب‌زمینی", cal: 536, unit: "100 گرم" },
    { id: "f112", name: "پفک نمکی", cal: 510, unit: "100 گرم" },
    { id: "f113", name: "پاپ کورن (ذرت بو داده)", cal: 387, unit: "100 گرم" },
    { id: "f114", name: "پاپ کورن کره ای", cal: 450, unit: "100 گرم" },
    { id: "f115", name: "چوب شوری", cal: 380, unit: "100 گرم" },
    { id: "f116", name: "کشمش / مویز", cal: 299, unit: "100 گرم" },
    { id: "f117", name: "برگه آلو / قیسی", cal: 240, unit: "100 گرم" },
    { id: "f118", name: "لواشک میوه‌ای", cal: 230, unit: "100 گرم" },
    { id: "f119", name: "توت خشک", cal: 320, unit: "100 گرم" },
    { id: "f120", name: "انجیر خشک", cal: 249, unit: "100 گرم" },

    // --- شیرینی‌جات، شکلات و دسر ---
    { id: "f121", name: "شکلات تلخ 70%", cal: 598, unit: "100 گرم" },
    { id: "f122", name: "شکلات شیری", cal: 535, unit: "100 گرم" },
    { id: "f123", name: "بیسکویت ساقه طلایی", cal: 440, unit: "100 گرم" },
    { id: "f124", name: "بیسکویت کرمدار", cal: 480, unit: "100 گرم" },
    { id: "f125", name: "ویفر شکلاتی", cal: 510, unit: "100 گرم" },
    { id: "f126", name: "پاستیل", cal: 343, unit: "100 گرم" },
    { id: "f127", name: "کیک یزدی", cal: 390, unit: "100 گرم" },
    { id: "f128", name: "شیرینی خامه ای", cal: 500, unit: "100 گرم" },
    { id: "f129", name: "دانمارکی / شیرینی گل محمدی", cal: 420, unit: "100 گرم" },
    { id: "f130", name: "بامیه", cal: 400, unit: "100 گرم" },
    { id: "f131", name: "زولبیا", cal: 450, unit: "100 گرم" },
    { id: "f132", name: "گز", cal: 380, unit: "100 گرم" },
    { id: "f133", name: "سوهان", cal: 550, unit: "100 گرم" },
    { id: "f134", name: "حلوا شکری", cal: 516, unit: "100 گرم" },
    { id: "f135", name: "حلوا سنتی زعفرانی", cal: 400, unit: "100 گرم" },
    { id: "f136", name: "نبات", cal: 390, unit: "100 گرم" },
    { id: "f137", name: "بستنی سنتی زعفرانی", cal: 220, unit: "100 گرم" },
    { id: "f138", name: "بستنی شکلاتی / میوه‌ای", cal: 200, unit: "100 گرم" },
    { id: "f139", name: "بستنی کیم چوبی", cal: 270, unit: "100 گرم" },
    { id: "f140", name: "ژله میوه‌ای", cal: 62, unit: "100 گرم" },
    { id: "f141", name: "عسل", cal: 304, unit: "100 گرم" },
    { id: "f142", name: "مربا (هویج / آلبالو)", cal: 280, unit: "100 گرم" },
    { id: "f143", name: "شیره انگور / خرما", cal: 300, unit: "100 گرم" },
    { id: "f144", name: "کره بادام زمینی", cal: 588, unit: "100 گرم" },
    { id: "f145", name: "ارده", cal: 595, unit: "100 گرم" },

    // --- فست فود و ساندویچ ---
    { id: "f146", name: "پیتزا مخلوط", cal: 260, unit: "100 گرم" },
    { id: "f147", name: "پیتزا پپرونی", cal: 280, unit: "100 گرم" },
    { id: "f148", name: "پیتزا مرغ و قارچ", cal: 230, unit: "100 گرم" },
    { id: "f149", name: "همبرگر ساده", cal: 250, unit: "100 گرم" },
    { id: "f150", name: "چیزبرگر", cal: 300, unit: "100 گرم" },
    { id: "f151", name: "ساندویچ بندری", cal: 240, unit: "100 گرم" },
    { id: "f152", name: "ساندویچ فلافل", cal: 230, unit: "100 گرم" },
    { id: "f153", name: "ساندویچ کلاپ مرغ", cal: 210, unit: "100 گرم" },
    { id: "f154", name: "ساندویچ ژامبون/کالباس", cal: 250, unit: "100 گرم" },
    { id: "f155", name: "ساندویچ مغز و زبان", cal: 270, unit: "100 گرم" },
    { id: "f156", name: "سیب زمینی سرخ کرده", cal: 312, unit: "100 گرم" },
    { id: "f157", name: "فیله سوخاری (اسپایسی)", cal: 290, unit: "100 گرم" },
    { id: "f158", name: "ناگت مرغ", cal: 295, unit: "100 گرم" },
    { id: "f159", name: "قارچ سوخاری", cal: 210, unit: "100 گرم" },
    { id: "f160", name: "اسنک کلاپ پنیر و کالباس", cal: 270, unit: "100 گرم" },
    { id: "f161", name: "سس مایونز", cal: 680, unit: "100 گرم" },
    { id: "f162", name: "سس کچاپ", cal: 110, unit: "100 گرم" },

    // --- نوشیدنی‌ها ---
    { id: "f163", name: "نوشابه گازدار (کولایا سفید)", cal: 42, unit: "100 گرم" },
    { id: "f164", name: "دلستر / ماءالشعیر", cal: 35, unit: "100 گرم" },
    { id: "f165", name: "آبمیوه پاکتی", cal: 50, unit: "100 گرم" },
    { id: "f166", name: "شیر شکلات", cal: 80, unit: "100 گرم" },
    { id: "f167", name: "دوغ", cal: 35, unit: "100 گرم" },
    { id: "f168", name: "قهوه ساده / اسپرسو بدون شکر", cal: 2, unit: "100 گرم" },
    { id: "f169", name: "کاپوچینو با شکر", cal: 60, unit: "100 گرم" },
    { id: "f170", name: "نسکافه فوری آماده (3 در 1)", cal: 420, unit: "100 گرم" },
    { id: "f171", name: "شربت زعفران / آبلیمو با شکر", cal: 180, unit: "100 گرم" },
    { id: "f172", name: "زیتون شور", cal: 115, unit: "100 گرم" },
    { id: "f173", name: "زیتون پرورده", cal: 280, unit: "100 گرم" }
];

// ==========================================
// ۲. دیتابیس فعالیت‌ها و ورزش‌ها
// ==========================================
const WORKOUTS_DB = [
    { id: "w1", name: "پیاده‌روی معمولی (4 کیلومتر بر ساعت)", calPerMin: 4 },
    { id: "w2", name: "پیاده‌روی سریع (6 کیلومتر بر ساعت)", calPerMin: 6 },
    { id: "w3", name: "پیاده‌روی روی تردمیل با شیب", calPerMin: 7.5 },
    { id: "w4", name: "دویدن آرام (8 کیلومتر بر ساعت)", calPerMin: 8.5 },
    { id: "w5", name: "دویدن سریع (12 کیلومتر بر ساعت)", calPerMin: 12 },
    { id: "w6", name: "طناب زدن (سرعت متوسط)", calPerMin: 10 },
    { id: "w7", name: "طناب زدن سریع", calPerMin: 13 },
    { id: "w8", name: "دوچرخه‌سواری (سرعت معمولی)", calPerMin: 7 },
    { id: "w9", name: "دوچرخه‌سواری ثابت (شدت متوسط)", calPerMin: 8 },
    { id: "w10", name: "دوچرخه‌سواری ثابت (شدت بالا/اسپینینگ)", calPerMin: 11.5 },
    { id: "w11", name: "پله‌نوردی / دستگاه استپر", calPerMin: 9 },
    { id: "w12", name: "شنا (کرال سینه)", calPerMin: 9 },
    { id: "w13", name: "شنا (قورباغه)", calPerMin: 8 },
    { id: "w14", name: "شنا (پروانه)", calPerMin: 11 },
    { id: "w15", name: "آیروبیک در آب", calPerMin: 5.5 },
    { id: "w16", name: "فوتبال (مسابقه)", calPerMin: 10 },
    { id: "w17", name: "فوتسال", calPerMin: 9 },
    { id: "w18", name: "بسکتبال", calPerMin: 8.5 },
    { id: "w19", name: "والیبال سالنی", calPerMin: 4.5 },
    { id: "w20", name: "والیبال ساحلی", calPerMin: 8 },
    { id: "w21", name: "تنس روی میز (پینگ پنگ)", calPerMin: 4 },
    { id: "w22", name: "تنیس خاکی", calPerMin: 7.5 },
    { id: "w23", name: "بدمینتون", calPerMin: 5.5 },
    { id: "w24", name: "پادلبورد / قایقرانی", calPerMin: 6 },
    { id: "w25", name: "بدنسازی با وزنه (سبک/متوسط)", calPerMin: 5 },
    { id: "w26", name: "بدنسازی سنگین (پاورلیفتینگ/پرورشی)", calPerMin: 7.5 },
    { id: "w27", name: "تمرینات وزن بدن (شنا، بارفیکس، اسکات)", calPerMin: 6.5 },
    { id: "w28", name: "کراس‌فیت (CrossFit)", calPerMin: 12 },
    { id: "w29", name: "تمرینات تاباتا / HIIT", calPerMin: 11 },
    { id: "w30", name: "تمرین با کتلبل (Kettlebell)", calPerMin: 10 },
    { id: "w31", name: "بوکس (مبارزه/کیسه زدن)", calPerMin: 10.5 },
    { id: "w32", name: "هنرهای رزمی (کاراته/تکواندو/جودو)", calPerMin: 9 },
    { id: "w33", name: "کیک بوکسینگ", calPerMin: 10 },
    { id: "w34", name: "یوگا (قدرتی/وینیاسا)", calPerMin: 4.5 },
    { id: "w35", name: "یوگا (آرامش‌بخش)", calPerMin: 2.5 },
    { id: "w36", name: "پیلاتس", calPerMin: 5 },
    { id: "w37", name: "رقص آیروبیک / زومبا", calPerMin: 7.5 },
    { id: "w38", name: "تمیز کردن خانه / جاروبرقی کشیدن", calPerMin: 3.5 },
    { id: "w39", name: "تی کشیدن / گردگیری سنگین", calPerMin: 4 },
    { id: "w40", name: "شستن ماشین با دست", calPerMin: 4.5 },
    { id: "w41", name: "باغبانی / بیل زدن", calPerMin: 5 },
    { id: "w42", name: "جابجایی اثاثیه و وسایل سنگین", calPerMin: 7.5 },
    { id: "w43", name: "بالا رفتن از پله‌ها (پیاده)", calPerMin: 8 }
];

// ==========================================
// ۳. وضعیت کاربر و ساختار داده
// ==========================================
let allFoods = [...OFFLINE_FOODS_DB];
let allWorkouts = [...WORKOUTS_DB];
let selectedItem = null;

let userData = {
    isRegistered: false,
    gender: 'male',
    age: 25,
    height: 175,
    weight: 70,
    activity: 1.2,
    bmr: 2000,
    consumed: 0,
    burned: 0,
    water: 0,
    lastDate: new Date().toLocaleDateString('fa-IR'),
    weightsHistory: []
};

// ==========================================
// ۴. مدیریت ثبت نام اولیه و محاسبه BMR
// ==========================================
function renderOnboardingModal() {
    let modal = document.getElementById("modal-onboarding");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modal-onboarding";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <h2 style="text-align: center; margin-bottom: 12px; font-size: 1.2rem;">خوش آمدید! ثبت اطلاعات اولیه</h2>
                <p style="font-size: 0.85rem; color: #94a3b8; text-align: center; margin-bottom: 20px;">جهت محاسبه کالری پایه (BMR) اطلاعات خود را وارد کنید:</p>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div>
                        <label style="font-size:0.8rem; display:block; margin-bottom:4px;">جنسیت:</label>
                        <select id="onboard-gender" style="width:100%; padding:10px; border-radius:8px;">
                            <option value="male">مرد</option>
                            <option value="female">زن</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.8rem; display:block; margin-bottom:4px;">سن (سال):</label>
                        <input type="number" id="onboard-age" value="25" style="width:100%; padding:10px; border-radius:8px;">
                    </div>
                    <div>
                        <label style="font-size:0.8rem; display:block; margin-bottom:4px;">قد (سانتی‌متر):</label>
                        <input type="number" id="onboard-height" value="175" style="width:100%; padding:10px; border-radius:8px;">
                    </div>
                    <div>
                        <label style="font-size:0.8rem; display:block; margin-bottom:4px;">وزن فعلی (کیلوگرم):</label>
                        <input type="number" id="onboard-weight" value="70" style="width:100%; padding:10px; border-radius:8px;">
                    </div>
                    <div>
                        <label style="font-size:0.8rem; display:block; margin-bottom:4px;">میزان فعالیت روزانه:</label>
                        <select id="onboard-activity" style="width:100%; padding:10px; border-radius:8px;">
                            <option value="1.2">بی‌تحرک (نشسته/بدون ورزش)</option>
                            <option value="1.375">کم (ورزش 1 الی 3 روز در هفته)</option>
                            <option value="1.55">متوسط (ورزش 3 الی 5 روز در هفته)</option>
                            <option value="1.725">زیاد (ورزش 6 الی 7 روز در هفته)</option>
                        </select>
                    </div>
                    <button onclick="saveOnboardingData()" style="width:100%; padding:12px; background:#10b981; border:none; border-radius:8px; color:#fff; font-weight:bold; margin-top:10px; cursor:pointer; font-size:1rem;">ثبت و ورود به برنامه</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    if (!userData.isRegistered) {
        modal.classList.add("active");
    } else {
        modal.classList.remove("active");
    }
}

function saveOnboardingData() {
    const gender = document.getElementById("onboard-gender").value;
    const age = parseInt(document.getElementById("onboard-age").value) || 25;
    const height = parseFloat(document.getElementById("onboard-height").value) || 175;
    const weight = parseFloat(document.getElementById("onboard-weight").value) || 70;
    const activity = parseFloat(document.getElementById("onboard-activity").value) || 1.2;

    userData.gender = gender;
    userData.age = age;
    userData.height = height;
    userData.weight = weight;
    userData.activity = activity;
    userData.isRegistered = true;

    calculateBMR();

    userData.weightsHistory = [{
        id: Date.now(),
        weight: weight,
        date: new Date().toLocaleDateString('fa-IR')
    }];

    saveUserData();

    const modal = document.getElementById("modal-onboarding");
    if (modal) modal.classList.remove("active");

    updateDashboard();
    syncSettingsInputs();
}

function calculateBMR() {
    let bmr = 0;
    if (userData.gender === 'male') {
        bmr = 88.362 + (13.397 * userData.weight) + (4.799 * userData.height) - (5.677 * userData.age);
    } else {
        bmr = 447.593 + (9.247 * userData.weight) + (3.098 * userData.height) - (4.330 * userData.age);
    }
    userData.bmr = Math.round(bmr * userData.activity);
}

// ==========================================
// ۵. مدیریت بخش تنظیمات
// ==========================================
function saveSettings() {
    const ageIn = document.getElementById('settings-age');
    const heightIn = document.getElementById('settings-height');
    const weightIn = document.getElementById('settings-weight');
    const genderIn = document.getElementById('settings-gender');
    const activityIn = document.getElementById('settings-activity');

    if (ageIn) userData.age = parseInt(ageIn.value) || userData.age;
    if (heightIn) userData.height = parseFloat(heightIn.value) || userData.height;
    if (weightIn) userData.weight = parseFloat(weightIn.value) || userData.weight;
    if (genderIn) userData.gender = genderIn.value;
    if (activityIn) userData.activity = parseFloat(activityIn.value) || userData.activity;

    calculateBMR();
    saveUserData();
    updateDashboard();
    alert("تنظیمات با موفقیت بروزرسانی شد.");
}

function syncSettingsInputs() {
    const ageIn = document.getElementById('settings-age');
    const heightIn = document.getElementById('settings-height');
    const weightIn = document.getElementById('settings-weight');
    const genderIn = document.getElementById('settings-gender');
    const activityIn = document.getElementById('settings-activity');

    if (ageIn) ageIn.value = userData.age;
    if (heightIn) heightIn.value = userData.height;
    if (weightIn) weightIn.value = userData.weight;
    if (genderIn) genderIn.value = userData.gender;
    if (activityIn) activityIn.value = userData.activity;
}

// ==========================================
// ۶. مدیریت ذخیره‌سازی و راه‌اندازی
// ==========================================
function loadUserData() {
    const saved = localStorage.getItem('fit_user_data');
    if (saved) {
        try {
            userData = { ...userData, ...JSON.parse(saved) };
        } catch (e) {
            console.error("خطا در خواندن اطلاعات", e);
        }
    }
}

function saveUserData() {
    localStorage.setItem('fit_user_data', JSON.stringify(userData));
}

function checkDailyReset() {
    const today = new Date().toLocaleDateString('fa-IR');
    if (userData.lastDate !== today) {
        userData.consumed = 0;
        userData.burned = 0;
        userData.water = 0;
        userData.lastDate = today;
        saveUserData();
    }
}

function initApp() {
    loadUserData();
    checkDailyReset();
    renderFoodList(allFoods);
    renderWorkoutList(allWorkouts);
    updateDashboard();
    syncSettingsInputs();
    renderOnboardingModal();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// ==========================================
// ۷. توابع رندر، جستجو و عملکردها
// ==========================================
function renderFoodList(list) {
    const container = document.getElementById('food-list');
    if (!container) return;
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<div style="color:#94a3b8; text-align:center; padding:20px;">هیچ غذایی یافت نشد.</div>';
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.onclick = () => openItemModal(item, 'food');
        div.innerHTML = `
            <div class="item-info">
                <div class="name">${item.name}</div>
                <div class="details">${item.unit || '100 گرم'}</div>
            </div>
            <div class="item-value">+ ${item.cal} کالری</div>
        `;
        container.appendChild(div);
    });
}

function renderWorkoutList(list) {
    const container = document.getElementById('workout-list');
    if (!container) return;
    container.innerHTML = '';

    if (list.length === 0) {
        container.innerHTML = '<div style="color:#94a3b8; text-align:center; padding:20px;">هیچ فعالیتی یافت نشد.</div>';
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.onclick = () => openItemModal(item, 'workout');
        div.innerHTML = `
            <div class="item-info">
                <div class="name">${item.name}</div>
                <div class="details">در هر دقیقه</div>
            </div>
            <div class="item-value burn">- ${item.calPerMin} کالری</div>
        `;
        container.appendChild(div);
    });
}

function searchFood(query) {
    const filtered = allFoods.filter(f => f.name.includes(query.trim()));
    renderFoodList(filtered);
}

function searchWorkout(query) {
    const filtered = allWorkouts.filter(w => w.name.includes(query.trim()));
    renderWorkoutList(filtered);
}

function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
}

function openItemModal(item, type) {
    selectedItem = { ...item, type };
    const titleEl = document.getElementById('modal-item-title');
    const labelEl = document.getElementById('modal-item-unit-label');
    const inputEl = document.getElementById('modal-item-amount');
    
    if (titleEl) titleEl.innerText = item.name;
    
    if (type === 'food') {
        if (labelEl) labelEl.innerText = "مقدار مصرفی (گرم):";
        if (inputEl) inputEl.value = 100;
    } else {
        if (labelEl) labelEl.innerText = "مدت زمان (دقیقه):";
        if (inputEl) inputEl.value = 30;
    }
    openModal('modal-item');
}

function confirmAddItem() {
    const amountInput = document.getElementById('modal-item-amount');
    const amount = parseFloat(amountInput ? amountInput.value : 0) || 0;

    if (amount <= 0 || !selectedItem) {
        closeModal('modal-item');
        return;
    }

    if (selectedItem.type === 'food') {
        const addedCal = Math.round((selectedItem.cal * amount) / 100);
        userData.consumed += addedCal;
    } else if (selectedItem.type === 'workout') {
        const burnedCal = Math.round(selectedItem.calPerMin * amount);
        userData.burned += burnedCal;
    }

    saveUserData();
    updateDashboard();
    closeModal('modal-item');
}

function updateWater(change) {
    userData.water = Math.max(0, userData.water + change);
    saveUserData();
    updateDashboard();
}

function updateDashboard() {
    const consumedEl = document.getElementById('dashboard-consumed');
    const burnedEl = document.getElementById('dashboard-burned');
    const targetEl = document.getElementById('dashboard-target');
    const waterEl = document.getElementById('dashboard-water');

    if (consumedEl) consumedEl.innerText = userData.consumed;
    if (burnedEl) burnedEl.innerText = userData.burned;
    if (targetEl) targetEl.innerText = userData.bmr;
    if (waterEl) waterEl.innerText = userData.water;
}
