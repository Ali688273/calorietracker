// ==========================================
// ۱. دیتابیس کامل خوراکی‌ها (۱۷۳ آیتم)
// ==========================================
const OFFLINE_FOODS_DB = [
    // نان و غلات
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

    // غذاهای ایرانی و سنتی
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

    // گوشت، مرغ، ماهی و تخم‌مرغ
    { id: "f46", name: "سینه مرغ آب‌پز", cal: 165, unit: "100 گرم" },
    { id: "f47", name: "ران مرغ بدون پوست", cal: 190, unit: "100 گرم" },
    { id: "f48", name: "گوشت گوساله کم‌چرب", cal: 200, unit: "100 گرم" },
    { id: "f49", name: "گوشت گوسفندی", cal: 280, unit: "100 گرم" },
    { id: "f50", name: "ماهی قزل‌آلا", cal: 145, unit: "100 گرم" },
    { id: "f51", name: "ماهی سالمون", cal: 208, unit: "100 گرم" },
    { id: "f52", name: "تن ماهی در روغن", cal: 198, unit: "100 گرم" },
    { id: "f53", name: "تن ماهی در آب‌نمک", cal: 116, unit: "100 گرم" },
    { id: "f54", name: "میگو پخته", cal: 99, unit: "100 گرم" },
    { id: "f55", name: "تخم مرغ آب‌پز", cal: 155, unit: "100 گرم" },
    { id: "f56", name: "تخم مرغ نیمرو", cal: 210, unit: "100 گرم" },
    { id: "f57", name: "املت گوجه‌فرنگی", cal: 140, unit: "100 گرم" },

    // لبنیات
    { id: "f58", name: "شیر کم‌چرب", cal: 42, unit: "100 گرم" },
    { id: "f59", name: "شیر پرچرب", cal: 61, unit: "100 گرم" },
    { id: "f60", name: "ماست کم‌چرب", cal: 55, unit: "100 گرم" },
    { id: "f61", name: "ماست یونانی / چکیده", cal: 97, unit: "100 گرم" },
    { id: "f62", name: "پنیر سفید صبحانه", cal: 210, unit: "100 گرم" },
    { id: "f63", name: "پنیر لاکتیکی", cal: 180, unit: "100 گرم" },
    { id: "f64", name: "پنیر خامه ای", cal: 342, unit: "100 گرم" },
    { id: "f65", name: "پنیر پیتزا", cal: 300, unit: "100 گرم" },
    { id: "f66", name: "خامه صبحانه", cal: 340, unit: "100 گرم" },
    { id: "f67", name: "کره حیوانى", cal: 717, unit: "100 گرم" },
    { id: "f68", name: "سرشیر", cal: 380, unit: "100 گرم" },

    // میوه‌ها و سبزیجات
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

    // تنقلات و آجیل
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

    // شیرینی‌جات و دسر
    { id: "f121", name: "شکلات تلخ 70%", cal: 598, unit: "100 گرم" },
    { id: "f122", name: "شکلات شیری", cal: 535, unit: "100 گرم" },
    { id: "f123", name: "بیسکویت ساقه طلایی", cal: 440, unit: "100 گرم" },
    { id: "f124", name: "بیسکویت کرمدار", cal: 480, unit: "100 گرم" },
    { id: "f125", name: "ویفر شکلاتی", cal: 510, unit: "100 گرم" },
    { id: "f126", name: "پاستیل", cal: 343, unit: "100 گرم" },
    { id: "f127", name: "کیک یزدی", cal: 390, unit: "100 گرم" },
    { id: "f128", name: "شیرینی خامه ای", cal: 500, unit: "100 گرم" },
    { id: "f129", name: "دانمارکی", cal: 420, unit: "100 گرم" },
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

    // فست فود
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

    // نوشیدنی‌ها
    { id: "f163", name: "نوشابه گازدار", cal: 42, unit: "100 گرم" },
    { id: "f164", name: "دلستر / ماءالشعیر", cal: 35, unit: "100 گرم" },
    { id: "f165", name: "آبمیوه پاکتی", cal: 50, unit: "100 گرم" },
    { id: "f166", name: "شیر شکلات", cal: 80, unit: "100 گرم" },
    { id: "f167", name: "دوغ", cal: 35, unit: "100 گرم" },
    { id: "f168", name: "قهوه ساده / اسپرسو", cal: 2, unit: "100 گرم" },
    { id: "f169", name: "کاپوچینو با شکر", cal: 60, unit: "100 گرم" },
    { id: "f170", name: "نسکافه فوری آماده (3 در 1)", cal: 420, unit: "100 گرم" },
    { id: "f171", name: "شربت زعفران / آبلیمو", cal: 180, unit: "100 گرم" },
    { id: "f172", name: "زیتون شور", cal: 115, unit: "100 گرم" },
    { id: "f173", name: "زیتون پرورده", cal: 280, unit: "100 گرم" }
];

// ==========================================
// ۲. دیتابیس فعالیت‌ها و ورزش‌ها (۴۳ آیتم)
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
    { id: "w10", name: "دوچرخه‌سواری ثابت (اسپینینگ)", calPerMin: 11.5 },
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
    { id: "w26", name: "بدنسازی سنگین (پاورلیفتینگ)", calPerMin: 7.5 },
    { id: "w27", name: "تمرینات وزن بدن (شنا، بارفیکس، اسکات)", calPerMin: 6.5 },
    { id: "w28", name: "کراس‌فیت (CrossFit)", calPerMin: 12 },
    { id: "w29", name: "تمرینات تاباتا / HIIT", calPerMin: 11 },
    { id: "w30", name: "تمرین با کتلبل (Kettlebell)", calPerMin: 10 },
    { id: "w31", name: "بوکس (مبارزه/کیسه زدن)", calPerMin: 10.5 },
    { id: "w32", name: "هنرهای رزمی (کاراته/تکواندو)", calPerMin: 9 },
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
// ۳. وضعیت و متغیرهای اصلی
// ==========================================
let customFoods = [];
let customWorkouts = [];
let selectedItem = null;
let weightChartInstance = null;

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
    weightHistory: [] // { date: '1402/01/01', weight: 70 }
};

// ==========================================
// ۴. سوئیچ بین تب‌ها (مدیریت کامل)
// ==========================================
function switchTab(tabId, el) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const target = document.getElementById(`tab-${tabId}`);
    if (target) {
        target.classList.add('active');
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    if (el) {
        el.classList.add('active');
    } else {
        const defaultNav = document.querySelector(`.nav-item[onclick*="${tabId}"]`);
        if (defaultNav) defaultNav.classList.add('active');
    }

    if (tabId === 'stats') {
        renderStatsTab();
    }
}

// ==========================================
// ۵. ثبت نام اولیه و محاسبه BMR
// ==========================================
function submitOnboarding() {
    const gender = document.getElementById('init-gender').value;
    const age = parseInt(document.getElementById('init-age').value) || 25;
    const height = parseFloat(document.getElementById('init-height').value) || 175;
    const weight = parseFloat(document.getElementById('init-weight').value) || 70;
    const activity = parseFloat(document.getElementById('init-activity').value) || 1.2;

    userData.gender = gender;
    userData.age = age;
    userData.height = height;
    userData.weight = weight;
    userData.activity = activity;
    userData.isRegistered = true;

    // ثبت وزن اولیه در تاریخچه
    const today = new Date().toLocaleDateString('fa-IR');
    userData.weightHistory = [{ date: today, weight: weight }];

    calculateBMR();
    saveUserData();

    closeModal('modal-onboarding');
    updateDashboard();
    syncSettingsInputs();
}

function checkOnboarding() {
    if (!userData.isRegistered) {
        openModal('modal-onboarding');
    } else {
        closeModal('modal-onboarding');
    }
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
// ۶. مدیریت ذخیره‌سازی
// ==========================================
function loadUserData() {
    const saved = localStorage.getItem('fit_user_data_v2');
    if (saved) {
        try {
            userData = { ...userData, ...JSON.parse(saved) };
        } catch (e) {
            console.error(e);
        }
    }

    const savedCustomFoods = localStorage.getItem('fit_custom_foods');
    if (savedCustomFoods) {
        try { customFoods = JSON.parse(savedCustomFoods); } catch (e) {}
    }

    const savedCustomWorkouts = localStorage.getItem('fit_custom_workouts');
    if (savedCustomWorkouts) {
        try { customWorkouts = JSON.parse(savedCustomWorkouts); } catch (e) {}
    }
}

function saveUserData() {
    localStorage.setItem('fit_user_data_v2', JSON.stringify(userData));
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

// ==========================================
// ۷. نمایش لیست خوراکی‌ها و ورزش‌ها
// ==========================================
function getAllFoods() {
    return [...customFoods, ...OFFLINE_FOODS_DB];
}

function getAllWorkouts() {
    return [...customWorkouts, ...WORKOUTS_DB];
}

function renderFoodList(list) {
    const container = document.getElementById('food-list');
    if (!container) return;
    container.innerHTML = '';

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.onclick = () => openItemModal(item, 'food');
        div.innerHTML = `
            <div class="item-info">
                <div class="name">${item.name}</div>
                <div class="details">${item.unit}</div>
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

function handleFoodSearch() {
    const q = document.getElementById('food-search').value.toLowerCase().trim();
    const filtered = getAllFoods().filter(f => f.name.toLowerCase().includes(q));
    renderFoodList(filtered);
}

function handleWorkoutSearch() {
    const q = document.getElementById('workout-search').value.toLowerCase().trim();
    const filtered = getAllWorkouts().filter(w => w.name.toLowerCase().includes(q));
    renderWorkoutList(filtered);
}

// ==========================================
// ۸. مدیریت مودال‌ها و ثبت آیتم
// ==========================================
function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'flex';
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.style.display = 'none';
}

function openItemModal(item, type) {
    selectedItem = { ...item, type };
    document.getElementById('modal-item-title').innerText = item.name;
    const label = document.getElementById('modal-item-unit-label');
    const input = document.getElementById('modal-item-amount');

    if (type === 'food') {
        label.innerText = 'مقدار مصرفی (گرم)';
        input.value = 100;
    } else {
        label.innerText = 'مدت زمان (دقیقه)';
        input.value = 30;
    }
    openModal('modal-item');
}

function confirmAddItem() {
    const amount = parseFloat(document.getElementById('modal-item-amount').value) || 0;
    if (amount <= 0 || !selectedItem) {
        closeModal('modal-item');
        return;
    }

    if (selectedItem.type === 'food') {
        const addedCal = Math.round((selectedItem.cal * amount) / 100);
        userData.consumed += addedCal;
    } else {
        const burnedCal = Math.round(selectedItem.calPerMin * amount);
        userData.burned += burnedCal;
    }

    saveUserData();
    updateDashboard();
    closeModal('modal-item');
}

// ==========================================
// ۹. افزودن خوراکی و ورزش دستی
// ==========================================
function openCustomFoodModal() {
    openModal('modal-custom-food');
}

function saveCustomFood() {
    const name = document.getElementById('custom-food-name').value.trim();
    const cal = parseFloat(document.getElementById('custom-food-cal').value) || 0;

    if (!name || cal <= 0) {
        alert("لطفاً نام و میزان کالری را به درستی وارد کنید.");
        return;
    }

    const newItem = { id: "c_f_" + Date.now(), name: name, cal: cal, unit: "100 گرم" };
    customFoods.unshift(newItem);
    localStorage.setItem('fit_custom_foods', JSON.stringify(customFoods));

    renderFoodList(getAllFoods());
    closeModal('modal-custom-food');
    document.getElementById('custom-food-name').value = '';
    document.getElementById('custom-food-cal').value = '';
}

function openCustomWorkoutModal() {
    openModal('modal-custom-workout');
}

function saveCustomWorkout() {
    const name = document.getElementById('custom-workout-name').value.trim();
    const cal = parseFloat(document.getElementById('custom-workout-cal').value) || 0;

    if (!name || cal <= 0) {
        alert("لطفاً نام و میزان کالری‌سوزی را وارد کنید.");
        return;
    }

    const newItem = { id: "c_w_" + Date.now(), name: name, calPerMin: cal };
    customWorkouts.unshift(newItem);
    localStorage.setItem('fit_custom_workouts', JSON.stringify(customWorkouts));

    renderWorkoutList(getAllWorkouts());
    closeModal('modal-custom-workout');
    document.getElementById('custom-workout-name').value = '';
    document.getElementById('custom-workout-cal').value = '';
}

// ==========================================
// ۱۰. کنترل آب و به‌روزرسانی داشبورد
// ==========================================
function addWater(change) {
    userData.water = Math.max(0, userData.water + change);
    saveUserData();
    updateDashboard();
}

function updateDashboard() {
    const consumedEl = document.getElementById('consumed-cal');
    const burnedEl = document.getElementById('burned-cal');
    const remainingEl = document.getElementById('remaining-cal');
    const waterEl = document.getElementById('water-count');

    if (consumedEl) consumedEl.innerText = userData.consumed;
    if (burnedEl) burnedEl.innerText = userData.burned;

    const netCalories = userData.consumed - userData.burned;
    const remaining = userData.bmr - netCalories;

    if (remainingEl) remainingEl.innerText = remaining;
    if (waterEl) waterEl.innerText = `${userData.water} از 8 لیوان 💧`;
}

// ==========================================
// ۱۱. بخش آمار، BMI و Chart.js
// ==========================================
function renderStatsTab() {
    renderBMI();
    renderWeightHistoryList();
    initOrUpdateChart();
}

function renderBMI() {
    const container = document.getElementById('bmi-container');
    if (!container) return;

    const hMeter = userData.height / 100;
    const bmi = (userData.weight / (hMeter * hMeter)).toFixed(1);

    let status = "";
    let color = "#10b981";

    if (bmi < 18.5) {
        status = "کمبود وزن";
        color = "#3b82f6";
    } else if (bmi < 25) {
        status = "وزن ایده‌آل";
        color = "#10b981";
    } else if (bmi < 30) {
        status = "اضافه وزن";
        color = "#f59e0b";
    } else {
        status = "چاقی";
        color = "#ef4444";
    }

    container.innerHTML = `
        <div class="card" style="border-right: 4px solid ${color};">
            <div class="card-title">شاخص توده بدنی (BMI)</div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                <span style="font-size:1.5rem; font-weight:bold; color:${color};">${bmi}</span>
                <span style="background:rgba(255,255,255,0.1); padding:4px 12px; border-radius:20px; font-size:0.85rem; color:${color}; font-weight:bold;">${status}</span>
            </div>
        </div>
    `;
}

function submitNewWeight() {
    const input = document.getElementById('new-weight-input');
    const newWeight = parseFloat(input.value) || 0;

    if (newWeight <= 0) return;

    userData.weight = newWeight;
    const today = new Date().toLocaleDateString('fa-IR');

    // افزودن یا به‌روزرسانی تاریخچه
    const existingIndex = userData.weightHistory.findIndex(h => h.date === today);
    if (existingIndex > -1) {
        userData.weightHistory[existingIndex].weight = newWeight;
    } else {
        userData.weightHistory.push({ date: today, weight: newWeight });
    }

    calculateBMR();
    saveUserData();
    updateDashboard();
    renderStatsTab();
    syncSettingsInputs();

    input.value = '';
}

function renderWeightHistoryList() {
    const listEl = document.getElementById('weight-history-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    const reversedHistory = [...userData.weightHistory].reverse();

    reversedHistory.forEach(item => {
        const div = document.createElement('div');
        div.style.cssText = "display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border); font-size:0.85rem;";
        div.innerHTML = `
            <span style="color:var(--text-sub);">${item.date}</span>
            <span style="font-weight:bold; color:var(--accent);">${item.weight} کیلوگرم</span>
        `;
        listEl.appendChild(div);
    });
}

function setChartFilter(filterType) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-filter-${filterType}`);
    if (activeBtn) activeBtn.classList.add('active');

    initOrUpdateChart(filterType);
}

function initOrUpdateChart(filter = 'weekly') {
    const canvas = document.getElementById('weightChart');
    if (!canvas) return;

    let dataPoints = [...userData.weightHistory];
    if (filter === 'weekly') {
        dataPoints = dataPoints.slice(-7);
    } else if (filter === 'monthly') {
        dataPoints = dataPoints.slice(-30);
    } else {
        dataPoints = dataPoints.slice(-365);
    }

    const labels = dataPoints.map(d => d.date);
    const data = dataPoints.map(d => d.weight);

    if (weightChartInstance) {
        weightChartInstance.destroy();
    }

    weightChartInstance = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'وزن (کیلوگرم)',
                data: data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { display: false } },
                y: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: '#334155' } }
            }
        }
    });
}

// ==========================================
// ۱۲. بخش تنظیمات
// ==========================================
function saveProfileFromSettings() {
    userData.gender = document.getElementById('user-gender').value;
    userData.age = parseInt(document.getElementById('user-age').value) || userData.age;
    userData.height = parseFloat(document.getElementById('user-height').value) || userData.height;
    userData.weight = parseFloat(document.getElementById('user-weight').value) || userData.weight;
    userData.activity = parseFloat(document.getElementById('user-activity').value) || userData.activity;

    calculateBMR();
    saveUserData();
    updateDashboard();
    alert("تنظیمات با موفقیت ذخیره شد.");
}

function syncSettingsInputs() {
    const g = document.getElementById('user-gender');
    const a = document.getElementById('user-age');
    const h = document.getElementById('user-height');
    const w = document.getElementById('user-weight');
    const act = document.getElementById('user-activity');

    if (g) g.value = userData.gender;
    if (a) a.value = userData.age;
    if (h) h.value = userData.height;
    if (w) w.value = userData.weight;
    if (act) act.value = userData.activity;
}

// ==========================================
// ۱۳. راه اندازی برنامه
// ==========================================
function initApp() {
    loadUserData();
    checkDailyReset();
    renderFoodList(getAllFoods());
    renderWorkoutList(getAllWorkouts());
    updateDashboard();
    syncSettingsInputs();
    checkOnboarding();
}

window.addEventListener('DOMContentLoaded', initApp);


// CALORIE YAR V2 UPGRADE
let generatedFoodsDB = [];
let dailyLog = [];
function loadExtraLocalData(){try{dailyLog=JSON.parse(localStorage.getItem('calorie_daily_log_v1')||'[]');if(!Array.isArray(dailyLog))dailyLog=[];}catch(e){dailyLog=[];}}
function saveDailyLog(){localStorage.setItem('calorie_daily_log_v1',JSON.stringify(dailyLog));}
function addLogEntry(type,item,amount,calories){const today=new Date().toLocaleDateString('fa-IR');dailyLog.unshift({id:Date.now(),date:today,type,name:item.name,amount,calories:Math.round(calories)});dailyLog=dailyLog.filter(x=>x.date===today).slice(0,50);saveDailyLog();renderDailyLog();}
function renderDailyLog(){let card=document.getElementById('daily-log-card');const dashboard=document.getElementById('tab-dashboard');if(!dashboard)return;if(!card){card=document.createElement('div');card.id='daily-log-card';card.className='card daily-log-card';dashboard.appendChild(card);}const today=new Date().toLocaleDateString('fa-IR');const items=dailyLog.filter(x=>x.date===today).slice(0,12);card.innerHTML='<div class="card-title">گزارش امروز</div>'+(items.length?items.map(x=>'<div class="log-row"><div><b>'+x.name+'</b><small>'+(x.type==='food'?'🍽️ '+x.amount+' گرم':'🔥 '+x.amount+' دقیقه')+'</small></div><strong class="'+(x.type==='food'?'log-in':'log-out')+'">'+(x.type==='food'?'+':'-')+x.calories+'</strong></div>').join(''):'<div class="empty-log">هنوز چیزی برای امروز ثبت نشده است.</div>');}
function applyTheme(){const light=localStorage.getItem('calorie_theme')==='light';document.body.classList.toggle('light-mode',light);let btn=document.getElementById('theme-toggle');if(!btn){const header=document.querySelector('.header');if(!header)return;btn=document.createElement('button');btn.id='theme-toggle';btn.className='theme-toggle';btn.onclick=()=>{const next=document.body.classList.toggle('light-mode');localStorage.setItem('calorie_theme',next?'light':'dark');btn.textContent=next?'🌙':'☀️';};header.appendChild(btn);}btn.textContent=light?'🌙':'☀️';}
async function loadGeneratedFoods(){try{const response=await fetch('foods.json',{cache:'no-store'});if(!response.ok)throw new Error('foods.json unavailable');const data=await response.json();if(Array.isArray(data)){generatedFoodsDB=data.map(item=>({id:'g_'+item.id,name:item.name,cal:Number(item.calories)||0,unit:item.unit||'100 گرم',protein:Number(item.protein)||0,carbs:Number(item.carbs)||0,fat:Number(item.fat)||0,category:item.category||'سایر'})).filter(x=>x.cal>0);renderFoodList(getAllFoods());}}catch(e){console.warn('بانک بزرگ غذا بارگذاری نشد؛ بانک پایه فعال است.',e);}}
function getAllFoods(){return [...customFoods,...OFFLINE_FOODS_DB,...generatedFoodsDB];}
function renderFoodList(list){const container=document.getElementById('food-list');if(!container)return;const q=(document.getElementById('food-search')?.value||'').trim().toLowerCase();const visible=(q?list.filter(f=>f.name.toLowerCase().includes(q)):list).slice(0,150);container.innerHTML='';if(!visible.length){container.innerHTML='<div class="empty-log">خوراکی پیدا نشد.</div>';return;}visible.forEach(item=>{const div=document.createElement('div');div.className='item-card';div.onclick=()=>openItemModal(item,'food');div.innerHTML='<div class="item-info"><div class="name">'+item.name+'</div><div class="details">'+item.unit+'</div></div><div class="item-value">+ '+item.cal+' کالری</div>';container.appendChild(div);});}
function handleFoodSearch(){const q=document.getElementById('food-search').value.toLowerCase().trim();renderFoodList(q?getAllFoods().filter(f=>f.name.toLowerCase().includes(q)):getAllFoods());}
function confirmAddItem(){const amount=parseFloat(document.getElementById('modal-item-amount').value)||0;if(amount<=0||!selectedItem){closeModal('modal-item');return;}if(selectedItem.type==='food'){const addedCal=Math.round(selectedItem.cal*amount/100);userData.consumed+=addedCal;addLogEntry('food',selectedItem,amount,addedCal);}else{const burnedCal=Math.round(selectedItem.calPerMin*amount);userData.burned+=burnedCal;addLogEntry('workout',selectedItem,amount,burnedCal);}saveUserData();updateDashboard();closeModal('modal-item');}
function initOrUpdateChart(filter='weekly'){const canvas=document.getElementById('weightChart');if(!canvas)return;if(typeof Chart==='undefined'){canvas.parentElement.innerHTML='<div class="empty-log" style="padding:55px 10px">نمودار آنلاین در دسترس نیست؛ اطلاعات وزن ذخیره می‌شود.</div>';return;}let dataPoints=[...userData.weightHistory];if(filter==='weekly')dataPoints=dataPoints.slice(-7);else if(filter==='monthly')dataPoints=dataPoints.slice(-30);else dataPoints=dataPoints.slice(-365);if(weightChartInstance)weightChartInstance.destroy();weightChartInstance=new Chart(canvas,{type:'line',data:{labels:dataPoints.map(d=>d.date),datasets:[{label:'وزن (کیلوگرم)',data:dataPoints.map(d=>d.weight),borderColor:'#10b981',backgroundColor:'rgba(16,185,129,.10)',borderWidth:2,fill:true,tension:.3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#94a3b8',font:{size:10}},grid:{display:false}},y:{ticks:{color:'#94a3b8',font:{size:10}},grid:{color:'#334155'}}}}});}
const originalInitApp=initApp;async function upgradedInitApp(){loadExtraLocalData();originalInitApp();applyTheme();renderDailyLog();await loadGeneratedFoods();updateDashboard();}window.removeEventListener('DOMContentLoaded',initApp);window.addEventListener('DOMContentLoaded',upgradedInitApp);


// CALORIE YAR V3 - goals, water, favorites and daily summary
const CALORIE_V3_KEY='calorie_yar_v3';
function getV3(){try{return JSON.parse(localStorage.getItem(CALORIE_V3_KEY)||'{"water":0,"goal":2000,"favorites":[]}')}catch(e){return {water:0,goal:2000,favorites:[]}}}
function saveV3(v){localStorage.setItem(CALORIE_V3_KEY,JSON.stringify(v));}
function addWater(amount=250){const v=getV3();v.water=Math.min(10000,(v.water||0)+amount);saveV3(v);renderHealthWidgets();}
function resetWater(){const v=getV3();v.water=0;saveV3(v);renderHealthWidgets();}
function toggleFavoriteFood(item){const v=getV3();const id=String(item.id);const i=v.favorites.indexOf(id);if(i>=0)v.favorites.splice(i,1);else v.favorites.push(id);saveV3(v);renderFoodList(getAllFoods());}
function isFavoriteFood(item){return getV3().favorites.includes(String(item.id));}
function renderHealthWidgets(){const d=document.getElementById('tab-dashboard');if(!d)return;let box=document.getElementById('health-widgets');if(!box){box=document.createElement('div');box.id='health-widgets';box.className='card';d.insertBefore(box,d.firstChild);}const v=getV3();const goal=Math.max(1,Number(v.goal)||2000);const consumed=Math.max(0,Number(userData.consumed)||0);const burned=Math.max(0,Number(userData.burned)||0);const water=Math.max(0,Number(v.water)||0);const waterPct=Math.min(100,Math.round(water/2000*100));const remaining=Math.max(0,goal-consumed);box.innerHTML='<div class="card-title">هدف امروز</div><div class="health-grid"><div><small>کالری هدف</small><b>'+goal+'</b></div><div><small>مصرف شده</small><b>'+consumed+'</b></div><div><small>باقی‌مانده</small><b>'+remaining+'</b></div><div><small>سوزانده شده</small><b>'+burned+'</b></div></div><div class="water-title">💧 آب امروز: '+water+' میلی‌لیتر</div><div class="water-bar"><span style="width:'+waterPct+'%"></span></div><div class="water-actions"><button onclick="addWater(250)">+۲۵۰ ml</button><button onclick="addWater(500)">+۵۰۰ ml</button><button onclick="resetWater()">پاک کردن</button></div>'}
function showFavoritesOnly(){const fav=getV3().favorites;renderFoodList(getAllFoods().filter(x=>fav.includes(String(x.id))));}
function setCalorieGoal(){const current=getV3();const raw=prompt('هدف کالری روزانه را وارد کنید:',current.goal);const n=parseInt(raw,10);if(Number.isFinite(n)&&n>=800&&n<=10000){current.goal=n;saveV3(current);renderHealthWidgets();}}
const v3OldRenderFoodList=renderFoodList;renderFoodList=function(list){const container=document.getElementById('food-list');if(!container)return;const q=(document.getElementById('food-search')?.value||'').trim().toLowerCase();const visible=(q?list.filter(f=>f.name.toLowerCase().includes(q)):list).slice(0,150);container.innerHTML='';if(!visible.length){container.innerHTML='<div class="empty-log">خوراکی پیدا نشد.</div>';return;}visible.forEach(item=>{const div=document.createElement('div');div.className='item-card';div.innerHTML='<div class="item-info"><div class="name">'+item.name+(isFavoriteFood(item)?' ⭐':'')+'</div><div class="details">'+item.unit+'</div></div><div class="item-value">'+item.cal+' کالری</div>';div.onclick=()=>openItemModal(item,'food');div.oncontextmenu=e=>{e.preventDefault();toggleFavoriteFood(item);};container.appendChild(div);});};
const v3OldUpdateDashboard=updateDashboard;updateDashboard=function(){v3OldUpdateDashboard();renderHealthWidgets();};

// ======================================================
// CALORIE YAR V4 - PACKAGE 3: ONBOARDING + PROFILE
// ======================================================
const PROFILE_V4_DEFAULTS = {name:'',targetWeight:65,goalType:'lose',dailyCalorieGoal:null,macroGoals:{protein:0,carbs:0,fat:0},coins:0,coinTransactions:[],missionProgress:{},premium:false,language:'fa',profileCompleted:false};
function normalizeProfileV4(){
    userData={...PROFILE_V4_DEFAULTS,...userData};
    if(!userData.macroGoals||typeof userData.macroGoals!=='object') userData.macroGoals={protein:0,carbs:0,fat:0};
    if(!Array.isArray(userData.coinTransactions)) userData.coinTransactions=[];
    if(!userData.missionProgress||typeof userData.missionProgress!=='object') userData.missionProgress={};
    userData.name=String(userData.name||'');
    userData.targetWeight=Number(userData.targetWeight)||Number(userData.weight)||70;
    userData.goalType=['lose','maintain','gain'].includes(userData.goalType)?userData.goalType:'lose';
    userData.coins=Math.max(0,Number(userData.coins)||0);
    userData.premium=Boolean(userData.premium);
}
function saveProfileV4(){normalizeProfileV4();saveUserData();}
function ensureProfileV4Styles(){
 if(document.getElementById('profile-v4-styles'))return;
 const s=document.createElement('style');s.id='profile-v4-styles';
 s.textContent='.profile-v4-overlay{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(2,6,23,.86);backdrop-filter:blur(8px);overflow-y:auto}.profile-v4-card{width:min(100%,520px);max-height:94vh;overflow-y:auto;background:var(--bg-card,#1e293b);color:var(--text-main,#f8fafc);border:1px solid var(--border,#334155);border-radius:22px;padding:22px;box-shadow:0 22px 70px rgba(0,0,0,.35)}.profile-v4-brand{text-align:center;margin-bottom:18px}.profile-v4-logo{font-size:3rem}.profile-v4-brand h2{margin:0 0 5px;font-size:1.45rem}.profile-v4-brand p{margin:0;color:var(--text-sub,#94a3b8);font-size:.82rem;line-height:1.7}.profile-v4-section{margin-top:16px;padding:14px;border:1px solid var(--border,#334155);border-radius:16px}.profile-v4-section-title{font-weight:800;margin-bottom:12px;font-size:.95rem}.profile-v4-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.profile-v4-field{display:flex;flex-direction:column;gap:6px}.profile-v4-field.full{grid-column:1/-1}.profile-v4-field label{color:var(--text-sub,#94a3b8);font-size:.76rem}.profile-v4-field input,.profile-v4-field select{width:100%;min-height:44px;border:1px solid var(--border,#334155);border-radius:11px;padding:9px 11px;background:var(--bg-main,#0f172a);color:var(--text-main,#f8fafc);outline:none;font-size:.9rem}.profile-v4-field input:focus,.profile-v4-field select:focus{border-color:var(--accent,#10b981)}.profile-v4-goals{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.profile-v4-goal{border:1px solid var(--border,#334155);border-radius:12px;padding:11px 6px;background:transparent;color:var(--text-main,#f8fafc);cursor:pointer;font-size:.8rem}.profile-v4-goal.active{border-color:var(--accent,#10b981);background:rgba(16,185,129,.14);color:var(--accent,#10b981);font-weight:800}.profile-v4-actions{display:flex;gap:9px;margin-top:18px}.profile-v4-actions button{flex:1;min-height:46px;border:0;border-radius:13px;font-weight:800;cursor:pointer}.profile-v4-save{background:var(--accent,#10b981);color:white}.profile-v4-cancel{background:var(--border,#334155);color:var(--text-main,#f8fafc)}.profile-v4-note{margin-top:10px;color:var(--text-sub,#94a3b8);font-size:.72rem;line-height:1.7;text-align:center}.profile-v4-error{display:none;margin-top:10px;color:#fca5a5;background:rgba(239,68,68,.1);border-radius:10px;padding:9px;font-size:.78rem}.profile-v4-header-button{margin-inline-start:auto;border:1px solid var(--border,#334155);background:transparent;color:var(--text-main,#f8fafc);border-radius:10px;padding:7px 10px;font-size:.78rem;cursor:pointer}@media(max-width:380px){.profile-v4-grid{grid-template-columns:1fr}.profile-v4-field.full{grid-column:auto}.profile-v4-goals{grid-template-columns:1fr}.profile-v4-card{padding:16px}}';
 document.head.appendChild(s);
}
function ensureProfileV4Overlay(){
 ensureProfileV4Styles();let o=document.getElementById('profile-v4-overlay');if(o)return o;
 o=document.createElement('div');o.id='profile-v4-overlay';o.className='profile-v4-overlay';
 o.innerHTML='<div class="profile-v4-card" role="dialog" aria-modal="true"><div class="profile-v4-brand"><div class="profile-v4-logo">🥗</div><h2 id="profile-v4-title">پروفایل کالری‌یار</h2><p id="profile-v4-subtitle">اطلاعاتت را وارد کن تا کالری‌یار برنامه مناسب‌تری برایت بسازد.</p></div><div class="profile-v4-section"><div class="profile-v4-section-title">👤 اطلاعات شخصی</div><div class="profile-v4-grid"><div class="profile-v4-field full"><label>نام</label><input id="profile-v4-name" type="text" maxlength="40" autocomplete="name" placeholder="مثلاً علی"></div><div class="profile-v4-field"><label>جنسیت</label><select id="profile-v4-gender"><option value="male">مرد</option><option value="female">زن</option></select></div><div class="profile-v4-field"><label>سن</label><input id="profile-v4-age" type="number" min="13" max="120" inputmode="numeric"></div><div class="profile-v4-field"><label>قد (سانتی‌متر)</label><input id="profile-v4-height" type="number" min="100" max="250" inputmode="decimal"></div><div class="profile-v4-field"><label>وزن فعلی (کیلوگرم)</label><input id="profile-v4-weight" type="number" min="25" max="350" step="0.1" inputmode="decimal"></div><div class="profile-v4-field"><label>وزن هدف (کیلوگرم)</label><input id="profile-v4-target-weight" type="number" min="25" max="350" step="0.1" inputmode="decimal"></div></div></div><div class="profile-v4-section"><div class="profile-v4-section-title">🎯 هدف تو چیست؟</div><div class="profile-v4-goals"><button type="button" class="profile-v4-goal" data-goal="lose">کاهش وزن</button><button type="button" class="profile-v4-goal" data-goal="maintain">حفظ وزن</button><button type="button" class="profile-v4-goal" data-goal="gain">افزایش وزن</button></div></div><div class="profile-v4-section"><div class="profile-v4-section-title">🏃 سطح فعالیت روزانه</div><div class="profile-v4-field"><label>میزان فعالیت</label><select id="profile-v4-activity"><option value="1.2">کم‌تحرک — بیشتر نشستن</option><option value="1.375">فعالیت سبک — ۱ تا ۳ روز در هفته</option><option value="1.55">فعالیت متوسط — ۳ تا ۵ روز در هفته</option><option value="1.725">فعالیت زیاد — ۶ تا ۷ روز در هفته</option><option value="1.9">فعالیت بسیار زیاد — تمرین سنگین</option></select></div></div><div id="profile-v4-error" class="profile-v4-error"></div><div class="profile-v4-actions"><button type="button" id="profile-v4-cancel" class="profile-v4-cancel" onclick="closeProfileV4()">انصراف</button><button type="button" id="profile-v4-save" class="profile-v4-save" onclick="saveProfileV4Form()">ادامه</button></div><div class="profile-v4-note">اطلاعات اصلی روی همین دستگاه ذخیره می‌شود. محاسبه دقیق کالری و Macro در بسته بعدی تکمیل می‌شود.</div></div>';
 document.body.appendChild(o);
 o.querySelectorAll('.profile-v4-goal').forEach(b=>b.addEventListener('click',()=>{o.querySelectorAll('.profile-v4-goal').forEach(x=>x.classList.remove('active'));b.classList.add('active');}));
 return o;
}
function fillProfileV4Form(){ensureProfileV4Overlay();normalizeProfileV4();document.getElementById('profile-v4-name').value=userData.name||'';document.getElementById('profile-v4-gender').value=userData.gender||'male';document.getElementById('profile-v4-age').value=userData.age||25;document.getElementById('profile-v4-height').value=userData.height||175;document.getElementById('profile-v4-weight').value=userData.weight||70;document.getElementById('profile-v4-target-weight').value=userData.targetWeight||userData.weight||70;document.getElementById('profile-v4-activity').value=String(userData.activity||1.2);document.querySelectorAll('.profile-v4-goal').forEach(b=>b.classList.toggle('active',b.dataset.goal===userData.goalType));document.getElementById('profile-v4-error').style.display='none';}
function openProfileV4(isOnboarding){const o=ensureProfileV4Overlay();fillProfileV4Form();document.getElementById('profile-v4-title').textContent=isOnboarding?'به کالری‌یار خوش آمدی 🌱':'پروفایل من';document.getElementById('profile-v4-subtitle').textContent=isOnboarding?'چند اطلاعات کوتاه وارد کن تا برنامه از همان ابتدا شخصی‌سازی شود.':'اطلاعاتت را ویرایش کن تا در محاسبات بعدی استفاده شود.';document.getElementById('profile-v4-save').textContent=isOnboarding?'شروع کالری‌یار':'ذخیره تغییرات';document.getElementById('profile-v4-cancel').style.display=isOnboarding?'none':'';o.style.display='flex';}
function closeProfileV4(){const o=document.getElementById('profile-v4-overlay');if(o)o.style.display='none';}
function showProfileV4Error(m){const e=document.getElementById('profile-v4-error');if(e){e.textContent=m;e.style.display='block';}}
function saveProfileV4Form(){
 const name=document.getElementById('profile-v4-name').value.trim(),gender=document.getElementById('profile-v4-gender').value,age=Number(document.getElementById('profile-v4-age').value),height=Number(document.getElementById('profile-v4-height').value),weight=Number(document.getElementById('profile-v4-weight').value),targetWeight=Number(document.getElementById('profile-v4-target-weight').value),activity=Number(document.getElementById('profile-v4-activity').value),goal=document.querySelector('.profile-v4-goal.active');
 if(!name)return showProfileV4Error('لطفاً نامت را وارد کن.');
 if(!Number.isFinite(age)||age<13||age>120)return showProfileV4Error('سن باید بین ۱۳ تا ۱۲۰ سال باشد.');
 if(!Number.isFinite(height)||height<100||height>250)return showProfileV4Error('قد واردشده معتبر نیست.');
 if(!Number.isFinite(weight)||weight<25||weight>350)return showProfileV4Error('وزن فعلی واردشده معتبر نیست.');
 if(!Number.isFinite(targetWeight)||targetWeight<25||targetWeight>350)return showProfileV4Error('وزن هدف واردشده معتبر نیست.');
 userData.name=name;userData.gender=gender;userData.age=age;userData.height=height;userData.weight=weight;userData.targetWeight=targetWeight;userData.activity=activity;userData.goalType=goal?goal.dataset.goal:'lose';userData.isRegistered=true;userData.profileCompleted=true;
 if(!Array.isArray(userData.weightHistory)||!userData.weightHistory.length)userData.weightHistory=[{date:new Date().toLocaleDateString('fa-IR'),weight:weight}];
 calculateBMR();saveProfileV4();closeProfileV4();const legacy=document.getElementById('modal-onboarding');if(legacy)legacy.style.display='none';updateDashboard();syncSettingsInputs();renderProfileV4Button();
}
function renderProfileV4Button(){const h=document.querySelector('.header');if(!h||document.getElementById('profile-v4-header-button'))return;const b=document.createElement('button');b.id='profile-v4-header-button';b.className='profile-v4-header-button';b.type='button';b.textContent='👤 پروفایل';b.onclick=()=>openProfileV4(false);h.appendChild(b);}
const profileV4OriginalInit=upgradedInitApp;
upgradedInitApp=async function(){await profileV4OriginalInit();normalizeProfileV4();saveUserData();renderProfileV4Button();checkOnboarding();};
checkOnboarding=function(){normalizeProfileV4();const legacy=document.getElementById('modal-onboarding');if(legacy)legacy.style.display='none';renderProfileV4Button();if(!userData.profileCompleted&&!userData.isRegistered)openProfileV4(true);};
submitOnboarding=function(){saveProfileV4Form();};
window.removeEventListener('DOMContentLoaded',profileV4OriginalInit);window.removeEventListener('DOMContentLoaded',upgradedInitApp);window.addEventListener('DOMContentLoaded',upgradedInitApp);
