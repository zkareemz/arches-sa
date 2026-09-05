export type Locale = "ar" | "en";

export interface NavItem {
  label: string;
  href: string;
}

export interface Point {
  title: string;
  desc?: string;
}

export interface ServiceSubItem {
  title: string;
  desc: string;
}

export interface Service {
  slug: string;
  heading: string;
  pageTitle: string;
  description: string;
  details: Point[];
  galleryCategory?: string;
  index: string;
  label: string;
  title: string;
  subtitle: string;
  p: string;
  items: ServiceSubItem[];
  image: string;
}

export interface Project {
  name: string;
  type: string;
  image: string;
}

export interface Award {
  year: string;
  awardName: string;
  organization: string;
  desc: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface SiteContent {
  seo: { title: string; description: string; imageAlt: string };
  ui: {
    home: string;
    breadcrumb: string;
    menu: string;
    navigation: string;
    serviceDetails: string;
    serviceScope: string;
    relatedServices: string;
    projectExamples: string;
    whatsappCta: string;
    whatsappMessage: string;
    formWhatsapp: string;
    formWhatsappNote: string;
    gallery: {
      residential: string;
      interior: string;
      commercial: string;
      image: string;
      open: string;
      close: string;
      previous: string;
      next: string;
      fullscreen: string;
      exitFullscreen: string;
    };
  };
  dir: "rtl" | "ltr";
  langName: string;
  altLocale: { label: string; href: string };
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    p: string;
    cta: string;
    scroll: string;
    image: string;
  };
  who: {
    eyebrow: string;
    title: string;
    intro: string;
    points: Point[];
    image: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: Service[];
  };
  why: {
    eyebrow: string;
    title: string;
    items: Point[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Project[];
  };
  award: {
    eyebrow: string;
    title: string;
    intro: string;
    year: string;
    awardName: string;
    organization: string;
    desc: string;
    image: string;
  };
  team: {
    eyebrow: string;
    title: string;
    intro: string;
    members: TeamMember[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    officeLabel: string;
    office: string;
    website: string;
    websiteUrl: string;
    contactLabel: string;
    email: string;
    phone: string;
    whatsappLabel: string;
    mapLabel: string;
    /** Office location pin — replace with the exact office coordinates. */
    mapLat: number;
    mapLng: number;
    mapZoom?: number;
    directionsLabel: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      subject: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
  };
}

/** Curated placeholder imagery — swap these URLs for real project photos later. */
const IMG = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  who: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
  service1:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  service2:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
  service3:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  project1:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=80",
  project2:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1100&q=80",
  project3:
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1100&q=80",
  project4:
    "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1100&q=80",
  project5:
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1100&q=80",
  project6:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=80",
  award: "/award.png",
  team1: "/team-1.jpeg",
  team2: "/team-2.jpeg",
} as const;

const ar: SiteContent = {
  seo: {
    title: "أقواس | مكتب هندسي في الرياض لتصميم الفلل والإشراف",
    description:
      "أقواس مكتب هندسي في الرياض يقدم تصميم الفلل والمخططات التنفيذية ورخص البناء، وإدارة المشاريع والإشراف الهندسي، والتصميم الداخلي والتأثيث. تواصل معنا لمناقشة مشروعك.",
    imageAlt: "أقواس — تصميم معماري وإشراف هندسي وتصميم داخلي في الرياض",
  },
  ui: {
    home: "الرئيسية",
    breadcrumb: "مسار الصفحة",
    menu: "القائمة",
    navigation: "التنقل الرئيسي",
    serviceDetails: "تعرّف على الخدمة",
    serviceScope: "ماذا تشمل الخدمة؟",
    relatedServices: "خدمات متكاملة لمشروعك",
    projectExamples: "من تصاميم أقواس",
    whatsappCta: "تواصل معنا",
    whatsappMessage: "مرحباً أقواس، أرغب في مناقشة تصميم فيلتي في الرياض.",
    formWhatsapp: "متابعة عبر واتساب",
    formWhatsappNote:
      "اكتب تفاصيل مشروعك، ثم تابع إلى واتساب لمراجعة الرسالة وإرسالها إلى فريقنا.",
    gallery: {
      residential: "مشاريع سكنية",
      interior: "تصميم داخلي",
      commercial: "مشاريع تجارية",
      image: "صورة",
      open: "عرض معرض",
      close: "إغلاق المعرض",
      previous: "الصورة السابقة",
      next: "الصورة التالية",
      fullscreen: "ملء الشاشة",
      exitFullscreen: "الخروج من ملء الشاشة",
    },
  },
  dir: "rtl",
  langName: "العربية",
  altLocale: { label: "EN", href: "/en" },
  nav: [
    { label: "من نحن", href: "#about" },
    { label: "خدماتنا", href: "#services" },
    { label: "أعمالنا", href: "#projects" },
    { label: "تواصل", href: "#contact" },
  ],
  hero: {
    eyebrow: "المملكة العربية السعودية — الرياض",
    title: "أقواس مبنيّ لرؤيتك",
    p: "شركة هندسية متعددة التخصصات، نقدّم خدمات متكاملة في التصميم المعماري وإدارة الإنشاء والتصميم الداخلي — تحت سقفٍ واحد",
    cta: "لنتحدث",
    scroll: "اكتشف المزيد",
    image: IMG.hero,
  },
  who: {
    eyebrow: "نبذة عنا",
    title: "من نحن",
    intro:
      "نؤمن أن العمارة الجيدة تبدأ من فهمٍ عميق لاحتياجاتك، وتنتهي بفراغاتٍ تُغني حياتك اليومية",
    points: [
      {
        title: "شركة هندسية متعددة التخصصات في الرياض",
        desc: "نقدّم خدمات متكاملة في التصميم والإنشاء تحت سقفٍ واحد منذ عام 2015",
      },
      {
        title: "تصاميم متفردة ومخصصة لاحتياجاتك",
        desc: "نرافق مشروعك عبر جميع مراحله — من الفكرة إلى التسليم",
      },
      {
        title: "التزامٌ بالتميّز",
        desc: "تميّزٌ في التصميم، والامتثال التنظيمي، وخدمةٌ تتمحور حول العميل",
      },
    ],
    image: IMG.who,
  },
  services: {
    eyebrow: "ما نقدّمه",
    title: "خدماتنا",
    items: [
      {
        slug: "architectural-design",
        heading: "تصميم فلل في الرياض",
        pageTitle: "تصميم فلل في الرياض — التصميم المعماري من أقواس",
        description:
          "تصميم فلل في الرياض من أقواس: تصميم معماري مخصص لاحتياجاتك، من الأفكار الأولية وتطوير التصميم إلى المخططات التنفيذية والتنسيق الهندسي ورخص البناء.",
        galleryCategory: "residential",
        details: [
          {
            title: "تصميم فيلا يبدأ من احتياجاتك",
            desc: "نبدأ بفهم رؤيتك واحتياجاتك للفراغات المعيشية، ونحوّلها إلى تصاميم أولية مخصصة لمشروعك السكني. ثم نطوّر الفكرة والتفاصيل للوصول إلى تصميم قابل للتنفيذ.",
          },
          {
            title: "من التصميم إلى المخططات التنفيذية",
            desc: "نعدّ المخططات التنفيذية لكافة التخصصات الهندسية، مع التنسيق بتقنية نمذجة معلومات البناء (BIM). يجمع العمل بين التصميم المعماري والمعرفة باشتراطات البناء لإعداد مشروع واضح التفاصيل.",
          },
          {
            title: "التراخيص واستكمال رحلة المشروع",
            desc: "تشمل خدماتنا إصدار رخص البناء وفق الاشتراطات التنظيمية. ويمكن استكمال رحلة مشروعك مع أقواس بخدمات إدارة المشروع والإشراف على التنفيذ والتصميم الداخلي والتأثيث.",
          },
        ],
        index: "01",
        label: "خدمة / 01",
        title: "التصميم المعماري",
        subtitle: "تصميم فراغاتٍ تُغني جودة الحياة",
        p: "نقدّم خدمات التصميم المعماري الكاملة للمشاريع السكنية — من الأفكار الأولية إلى المخططات التنفيذية. تجمع منهجيتنا بين التسليم الرقمي بتقنية BIM والخبرة بقوانين البناء، لضمان تصاميم مميزة وقابلة للتنفيذ",
        items: [
          {
            title: "التصاميم الأولية",
            desc: "ترجمة رؤيتك إلى فراغات معيشية وحيّزاتٍ رائعة",
          },
          {
            title: "تطوير التصميم",
            desc: "تحويل الأفكار والتفاصيل إلى تصميم قابل للتنفيذ",
          },
          {
            title: "المخططات التنفيذية",
            desc: "مخططات تنفيذية كاملة لكافة التخصصات الهندسية",
          },
          {
            title: "التراخيص الحكومية",
            desc: "إصدار رخص البناء وفقاً للاشتراطات التنظيمية",
          },
        ],
        image: IMG.service1,
      },
      {
        slug: "construction-supervision",
        heading: "إشراف هندسي وإدارة مشاريع البناء بالرياض",
        pageTitle: "إشراف هندسي وإدارة مشاريع البناء بالرياض — أقواس",
        description:
          "إدارة مشاريع البناء والإشراف الهندسي بالرياض من أقواس: متابعة المقاولين والجودة والجدول الزمني، وضبط التكاليف من مرحلة ما قبل الإنشاء حتى التسليم.",
        details: [
          {
            title: "إدارة مشروعك من ما قبل الإنشاء",
            desc: "ندير مشروع البناء من مرحلة ما قبل الإنشاء حتى التسليم النهائي، مع تنسيق أعمال المقاولين ومتابعة مراحل العمل. تجمع الخدمة بين إدارة المشروع والإشراف على التنفيذ ضمن رؤية متكاملة.",
          },
          {
            title: "وضوح في الميزانية والجدول الزمني",
            desc: "نراجع جداول الكميات وندير التعديلات ونعدّ تقارير التكلفة. ونتابع البرنامج الزمني والتقدم في الأعمال لمعالجة التأخيرات ومساعدة المالك على متابعة سير مشروعه.",
          },
          {
            title: "متابعة الجودة على أرض الواقع",
            desc: "يشمل الإشراف متابعة التنفيذ واختيار المواد والفحوصات والتقارير الدورية. ترتبط هذه الأعمال بمتابعة المقاولين وتطبيق معايير الجودة خلال مراحل المشروع حتى التسليم.",
          },
        ],
        index: "02",
        label: "خدمة / 02",
        title: "إدارة المشروع والإشراف على التنفيذ",
        subtitle: "مشروعك. في الوقت المحدد. ضمن الميزانية. بلا تنازلات",
        p: "وفقا لمعايير إدارة المشاريع (PMC)، نتولى المسؤولية الكاملة عن مشروعك من مرحلة ما قبل الإنشاء حتى التسليم النهائي. يدير فريقنا المقاولين ويتحكم في التكاليف ويراقب الجداول الزمنية ويطبّق معايير الجودة",
        items: [
          {
            title: "ضبط التكاليف وإدارة الميزانية",
            desc: "مراجعة جداول الكميات، وإدارة التعديلات، وتقارير التكلفة",
          },
          {
            title: "متابعة الجدول الزمني والتقدّم",
            desc: "إدارة البرنامج الزمني، وتتبّع المعالم، ومعالجة التأخيرات",
          },
          {
            title: "ضمان الجودة والفحوصات",
            desc: "الإشراف على التنفيذ، اختيار المواد، التقارير الدورية",
          },
          {
            title: "إدارة المشروع",
            desc: "إدارة متكاملة من ما قبل الإنشاء حتى التسليم",
          },
        ],
        image: IMG.service2,
      },
      {
        slug: "interior-design",
        heading: "تصميم داخلي للفلل بالرياض والتأثيث",
        pageTitle: "تصميم داخلي للفلل بالرياض والتأثيث — أقواس",
        description:
          "تصميم داخلي للفلل بالرياض مع أقواس: تخطيط الفراغات، والتصور ثلاثي الأبعاد، واختيار الأثاث والتجهيزات، وإدارة التوريد والتركيب بما يناسب أسلوب حياتك.",
        galleryCategory: "interior",
        details: [
          {
            title: "فراغات داخلية تناسب أسلوب حياتك",
            desc: "نطوّر المفهوم الداخلي وتخطيط الفراغات بما يناسب احتياجاتك وهويتك. تشمل هذه المرحلة دراسات المخططات ولوحات المزاج واستراتيجيات تقسيم الفراغات، لتجتمع الوظيفة والطابع الذي تريده لبيتك.",
          },
          {
            title: "رؤية التصميم قبل تنفيذه",
            desc: "نقدّم التصوّر ثلاثي الأبعاد بمشاهد فوتوواقعية وجولات افتراضية لاعتماد التصميم. ونختار مواصفات الأثاث والتركيبات والمعدات بعناية لتنسجم تفاصيل التأثيث مع التصميم الداخلي.",
          },
          {
            title: "من اختيار التجهيزات إلى التركيب",
            desc: "تمتد الخدمة إلى التوريد والتركيب وإدارة المورّدين والمقاولين ضمن حلول التجهيز التام. نتابع التفاصيل من لوحة المزاج الأولى إلى اللمسة الأخيرة، مع إمكانية تكامل العمل مع التصميم المعماري وإدارة المشروع.",
          },
        ],
        index: "03",
        label: "خدمة / 03",
        title: "التصميم الداخلي والتأثيث",
        subtitle: "تصاميم داخلية ملهِمة. فراغات تؤدي وظيفتها",
        p: "من أول لوحة مزاجية إلى اللمسة الأخيرة، نقدّم حلول تصميم داخلي وتجهيز كاملة مصمّمة خصيصاً لأسلوب حياتك وهويتك. بقدراتنا على التسليم التام، ندير كل مورّدٍ ومقاولٍ وتفصيلة",
        items: [
          {
            title: "المفهوم وتخطيط الفراغات",
            desc: "دراسات المخططات، ولوحات المزاج، واستراتيجيات التقسيم",
          },
          {
            title: "اختيار الأثاث والتجهيزات (FF&E)",
            desc: "مواصفات مختارة بعناية للأثاث والتركيبات والمعدات",
          },
          {
            title: "التصوّر ثلاثي الأبعاد",
            desc: "مشاهد فوتوواقعية وجولات افتراضية لاعتماد العميل",
          },
          {
            title: "تنفيذ التجهيز التام (Turnkey)",
            desc: "توريد وتركيب وإدارة مقاولين من الألف إلى الياء",
          },
        ],
        image: IMG.service3,
      },
    ],
  },
  why: {
    eyebrow: "لماذا تختارنا",
    title: "ما يميّزنا",
    items: [
      {
        title: "خبرة متكاملة",
        desc: "العمارة والإنشاء والتصميم الداخلي تحت سقفٍ واحد",
      },
      {
        title: "تسليم متكامل",
        desc: "من أول رسمة حتى التسليم النهائي، نتولى كل شيء",
      },
      {
        title: "سير عمل رقمي بتقنية BIM",
        desc: "دقة وتنسيق وشفافية في كل مرحلة",
      },
      {
        title: "جذور محلية، أداء احترافي",
        desc: "تطوير مستمر، ترابط مع هويتنا وجذورنا",
      },
    ],
  },
  projects: {
    eyebrow: "مختارات من أعمالنا",
    title: "أعمالنا",
    intro:
      "نماذج من مشاريع أقواس السكنية والتجارية والتصميم الداخلي — تصاميم تعبّر عن تنوّع احتياجات عملائنا",
    items: [
      { name: "فيلا الياسمين", type: "سكني — الرياض", image: IMG.project1 },
      { name: "إقامة الفناء", type: "تصميم داخلي", image: IMG.project2 },
      { name: "بيت النجد", type: "سكني — الرياض", image: IMG.project3 },
      { name: "منتجع الصحراء", type: "عمارة", image: IMG.project4 },
      { name: "شقق العليا", type: "سكني", image: IMG.project5 },
      { name: "ملاذ الواحة", type: "تصميم داخلي", image: IMG.project6 },
    ],
  },
  award: {
    eyebrow: "تقدير وتميّز",
    title: "جوائزنا",
    intro: "تتويجٌ لالتزامنا بالتميّز في التصميم والتنفيذ",
    year: "2017",
    awardName: "جائزة أكثر تصميم معماري مبيعاً",
    organization: "منصة سكني",
    desc: "حصلت شركة أقواس على هذه الجائزة تقديراً لحصول تصميمها على اكثر تصميم مبيعاً على المنصة",
    image: IMG.award,
  },
  team: {
    eyebrow: "فريقنا",
    title: "تعرّف على الفريق",
    intro: "خبراتٌ متنوّعة تجتمع لترجمة رؤيتك إلى واقع",
    members: [
      {
        name: "م. ابراهيم القصير",
        role: "الشريك المؤسس — مهندس معماري",
        image: IMG.team1,
      },
      {
        name: "م. تركي الحصيني",
        role: "الشريك المؤسس — مهندس معماري",
        image: IMG.team2,
      },
    ],
  },
  contact: {
    eyebrow: "تواصل معنا",
    title: "لنبنِ معاً شيئاً استثنائياً",
    intro: "أخبرنا عن مشروعك، وسنعاود التواصل معك خلال يومي عمل",
    officeLabel: "المكتب",
    office:
      "شارع الأمير سلمان بن محمد بن سعود، حي الصحافة، الرياض 13315، المملكة العربية السعودية",
    website: "arches.sa",
    websiteUrl: "https://arches.sa",
    contactLabel: "تواصل",
    email: "info@arches.sa",
    phone: "+966559995768",
    whatsappLabel: "WhatsApp",
    mapLabel: "الموقع",
    // Arches Engineering Consultancy office, Riyadh.
    mapLat: 24.7975681,
    mapLng: 46.6451025,
    mapZoom: 15,
    directionsLabel: "الاتجاهات على الخريطة",
    form: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      submit: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      success: "تم استلام رسالتك. سنعاود التواصل قريباً",
      error: "تعذّر الإرسال. حاول مرة أخرى أو راسلنا مباشرةً",
      subject: "استفسار جديد من موقع أقواس",
    },
  },
  footer: {
    tagline: "شركة أقواس للاستشارات الهندسية",
    rights: "جميع الحقوق محفوظة",
  },
};

const en: SiteContent = {
  seo: {
    title: "Arches | Engineering Office & Villa Design in Riyadh",
    description:
      "Arches provides villa design, construction drawings, permitting, project management, site supervision and interior design in Riyadh. Discuss your project with our team.",
    imageAlt:
      "Arches — architectural design, site supervision and interior design in Riyadh",
  },
  ui: {
    home: "Home",
    breadcrumb: "Breadcrumb",
    menu: "Menu",
    navigation: "Main navigation",
    serviceDetails: "Explore this service",
    serviceScope: "What does the service include?",
    relatedServices: "Integrated services for your project",
    projectExamples: "Designs by Arches",
    whatsappCta: "Contact us",
    whatsappMessage:
      "Hello Arches, I would like to discuss my villa design in Riyadh.",
    formWhatsapp: "Continue to WhatsApp",
    formWhatsappNote:
      "Tell us about your project, then continue to WhatsApp to review and send your message to our team.",
    gallery: {
      residential: "Residential projects",
      interior: "Interior design",
      commercial: "Commercial projects",
      image: "Photo",
      open: "Open gallery",
      close: "Close gallery",
      previous: "Previous photo",
      next: "Next photo",
      fullscreen: "Full screen",
      exitFullscreen: "Exit full screen",
    },
  },
  dir: "ltr",
  langName: "English",
  altLocale: { label: "ع", href: "/" },
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Riyadh, Saudi Arabia",
    title: "Arches — built for your vision",
    p: "A multidisciplinary engineering office in Riyadh, delivering integrated architectural design, construction management, and interior design — all under one roof",
    cta: "Let's talk",
    scroll: "Discover more",
    image: IMG.hero,
  },
  who: {
    eyebrow: "About us",
    title: "Who we are",
    intro:
      "We believe good architecture begins with a deep understanding of your needs and ends with spaces that elevate everyday life",
    points: [
      {
        title: "A multidisciplinary engineering office",
        desc: "Integrated design and construction services under one roof since 2015",
      },
      {
        title: "Distinctive designs tailored to your needs",
        desc: "Alongside you at every stage — from concept to handover",
      },
      {
        title: "Committed to excellence",
        desc: "Design excellence, regulatory compliance, and client-centred service",
      },
    ],
    image: IMG.who,
  },
  services: {
    eyebrow: "What we do",
    title: "Our services",
    items: [
      {
        slug: "architectural-design",
        heading: "Villa Design in Riyadh",
        pageTitle: "Villa Design in Riyadh — Architectural Design by Arches",
        description:
          "Villa design in Riyadh, from concepts and design development to coordinated construction drawings and building permits. Plan your home with Arches.",
        details: [
          {
            title: "Villa design starts with your needs",
            desc: "We begin by understanding your vision and the living spaces you need, translating them into initial designs tailored to your residential project. We then develop the concept and details into a buildable design.",
          },
          {
            title: "From design to construction drawings",
            desc: "We prepare construction drawings across engineering disciplines, coordinated using Building Information Modelling (BIM). Architectural design and knowledge of building requirements come together to make project details clear.",
          },
          {
            title: "Permits and the next stages",
            desc: "Our services include obtaining building permits in line with regulatory requirements. You can continue your project with Arches through project management, site supervision, interior design and furnishing.",
          },
        ],
        galleryCategory: "residential",
        index: "01",
        label: "SERVICE / 01",
        title: "Architectural Design",
        subtitle: "Designing spaces that elevate quality of life",
        p: "We provide complete architectural design services for residential projects, from initial concepts to construction drawings. Our approach combines BIM digital delivery with knowledge of building requirements to create distinctive, buildable designs",
        items: [
          {
            title: "Concept & Schematic Design",
            desc: "Translating your vision into remarkable living spaces",
          },
          {
            title: "Design Development",
            desc: "Turning ideas and details into a buildable design",
          },
          {
            title: "Construction Documents",
            desc: "Complete construction drawings across engineering disciplines",
          },
          {
            title: "Permitting",
            desc: "Managing municipal approvals and regulatory requirements",
          },
        ],
        image: IMG.service1,
      },
      {
        slug: "construction-supervision",
        heading: "Construction Supervision & Project Management in Riyadh",
        pageTitle:
          "Construction Supervision & Project Management in Riyadh — Arches",
        description:
          "Construction supervision and project management in Riyadh: contractor coordination, quality checks, cost control and schedule monitoring through handover.",
        details: [
          {
            title: "Management from pre-construction",
            desc: "We manage building projects from pre-construction through final handover, coordinating contractors and monitoring each stage. The service brings project management and site supervision together.",
          },
          {
            title: "Visibility into budgets and schedules",
            desc: "We review bills of quantities, manage changes and prepare cost reports. We track the programme and progress to address delays and help owners understand how their project is progressing.",
          },
          {
            title: "Quality checks on site",
            desc: "Supervision includes monitoring construction, selecting materials, inspections and periodic reports. These activities connect contractor oversight with quality standards throughout the project until handover.",
          },
        ],
        index: "02",
        label: "SERVICE / 02",
        title: "Construction Management & Supervision",
        subtitle: "Your project. On time. On budget. No compromises",
        p: "As your dedicated project management consultant (PMC), we take full responsibility for your project from pre-construction to final handover. Our team manages contractors, controls costs, monitors schedules, and enforces quality standards",
        items: [
          {
            title: "Cost Control & Budget Management",
            desc: "BOQ review, variation management, and cost reporting",
          },
          {
            title: "Schedule & Progress Tracking",
            desc: "Programme management, milestone tracking, and delay mitigation",
          },
          {
            title: "Quality Assurance & Inspections",
            desc: "Construction supervision, material selection and periodic reports",
          },
          {
            title: "Full PMC Role",
            desc: "Integrated management from pre-construction to handover",
          },
        ],
        image: IMG.service2,
      },
      {
        slug: "interior-design",
        heading: "Villa Interior Design & Furnishing in Riyadh",
        pageTitle: "Villa Interior Design & Furnishing in Riyadh — Arches",
        description:
          "Villa interior design in Riyadh: space planning, 3D visualisation, furniture selection, supply and installation management tailored to your lifestyle.",
        details: [
          {
            title: "Interiors suited to your lifestyle",
            desc: "We develop the interior concept and space plan around your needs and identity. Layout studies, mood boards and zoning strategies bring together everyday function and the character you want for your home.",
          },
          {
            title: "See the design before implementation",
            desc: "We provide photorealistic 3D visualisations and virtual walkthroughs for design approval. Furniture, fixtures and equipment specifications are selected to make the furnishing details work with the interior design.",
          },
          {
            title: "From selecting fittings to installation",
            desc: "The service extends to supply, installation, and supplier and contractor management through turnkey fit-out solutions. We follow the details from the first mood board to the final touch, with architectural design and project management available alongside.",
          },
        ],
        galleryCategory: "interior",
        index: "03",
        label: "SERVICE / 03",
        title: "Interior Design & Furnishing",
        subtitle: "Inspiring interiors. Spaces that perform",
        p: "From the first mood board to the final touch, we deliver complete interior design and fit-out solutions tailored to your lifestyle and identity. With turnkey delivery, we manage every supplier, contractor, and detail",
        items: [
          {
            title: "Concept & Space Planning",
            desc: "Layout studies, mood boards, and zoning strategies",
          },
          {
            title: "FF&E Selection",
            desc: "Carefully curated furniture, fixtures, and equipment specs",
          },
          {
            title: "3D Visualisation",
            desc: "Photorealistic scenes and virtual walkthroughs for approval",
          },
          {
            title: "Turnkey Fit-out",
            desc: "Supply, installation, and contractor management end to end",
          },
        ],
        image: IMG.service3,
      },
    ],
  },
  why: {
    eyebrow: "Why choose us",
    title: "What sets us apart",
    items: [
      {
        title: "Integrated expertise",
        desc: "Architecture, construction, and interior design under one roof",
      },
      {
        title: "End-to-end delivery",
        desc: "From the first sketch to final handover, we handle everything",
      },
      {
        title: "BIM digital workflow",
        desc: "Precision, coordination, and transparency at every stage",
      },
      {
        title: "Local roots, professional performance",
        desc: "Continual development, connected to our identity and local roots",
      },
    ],
  },
  projects: {
    eyebrow: "Selected works",
    title: "Projects",
    intro:
      "A selection of Arches residential, commercial and interior design projects — designs reflecting our clients' varied needs",
    items: [
      {
        name: "Yasmin Villa",
        type: "Residential — Riyadh",
        image: IMG.project1,
      },
      {
        name: "Courtyard Residence",
        type: "Interior Design",
        image: IMG.project2,
      },
      { name: "Najd House", type: "Residential — Riyadh", image: IMG.project3 },
      { name: "Desert Retreat", type: "Architecture", image: IMG.project4 },
      { name: "Olaya Apartments", type: "Residential", image: IMG.project5 },
      { name: "Oasis Hideaway", type: "Interior Design", image: IMG.project6 },
    ],
  },
  award: {
    eyebrow: "Recognition",
    title: "Our awards",
    intro: "A mark of our commitment to design and delivery excellence",
    year: "2017",
    awardName: "Best-selling Architectural Design Award",
    organization: "Sakani platform",
    desc: "Arches received this award in recognition of its design being the best-selling architectural design on the platform",
    image: IMG.award,
  },
  team: {
    eyebrow: "Our team",
    title: "Meet the team",
    intro:
      "A diverse range of expertise brought together to bring your vision to life",
    members: [
      {
        name: "Ibrahim Alqusair",
        role: "Founding Partner — Architect",
        image: IMG.team1,
      },
      {
        name: "Turki Alhussaini",
        role: "Founding Partner — Architect",
        image: IMG.team2,
      },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let's build something exceptional",
    intro:
      "Tell us about your project and we'll get back to you within two business days",
    officeLabel: "Office",
    office:
      "Prince Salman bin Mohammed bin Saud Street, Al Sahafa, Riyadh 13315, Saudi Arabia",
    website: "arches.sa",
    websiteUrl: "https://arches.sa",
    contactLabel: "Contact",
    email: "info@arches.sa",
    phone: "+966559995768",
    whatsappLabel: "WhatsApp",
    mapLabel: "Location",
    // Arches Engineering Consultancy office, Riyadh.
    mapLat: 24.7975681,
    mapLng: 46.6451025,
    mapZoom: 15,
    directionsLabel: "Get directions",
    form: {
      name: "Name",
      email: "Email",
      message: "About your project",
      submit: "Send message",
      sending: "Sending…",
      success: "Your message has been received. We'll be in touch shortly",
      error: "Something went wrong. Please try again or email us directly",
      subject: "New enquiry from the Arches website",
    },
  },
  footer: {
    tagline: "Arches Engineering Consultancy",
    rights: "All rights reserved",
  },
};

const CONTENT: Record<Locale, SiteContent> = { ar, en };

export function getContent(locale: string | undefined): SiteContent {
  return locale === "en" ? CONTENT.en : CONTENT.ar;
}

export const SITE_URL = "https://arches.sa";

export function servicePath(slug: string, locale: string = "ar"): string {
  return `${locale === "en" ? "/en" : ""}/services/${slug}/`;
}

export function whatsappUrl(content: SiteContent): string {
  return `https://wa.me/${content.contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(content.ui.whatsappMessage)}`;
}
