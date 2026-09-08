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
