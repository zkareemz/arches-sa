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
  bio: string;
}

export interface SiteContent {
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
  award: "/award.webp",
  team1: "/team-1.png",
  team2: "/team-2.png",
} as const;

const ar: SiteContent = {
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
    p: "مكتب هندسي متعدد التخصصات في الرياض، نقدّم خدمات متكاملة في التصميم المعماري وإدارة الإنشاء والتصميم الداخلي — تحت سقفٍ واحد",
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
        title: "مكتب هندسي متعدد التخصصات",
        desc: "نقدّم خدمات متكاملة في التصميم والإنشاء تحت سقفٍ واحد",
      },
      {
        title: "متخصصون في المشاريع السكنية",
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
        index: "01",
        label: "خدمة / 01",
        title: "التصميم المعماري",
        subtitle: "تصميم فراغاتٍ تُغني جودة الحياة",
        p: "نقدّم خدمات التصميم المعماري الكاملة للمشاريع السكنية — من أولى رسومات المفهوم إلى وثائق البناء المعتمدة من الجهات المختصة. تجمع منهجيتنا بين التسليم الرقمي بتقنية BIM والخبرة العميقة باللوائح المحلية، لضمان تصاميم طموحة وقابلة للتنفيذ",
        items: [
          {
            title: "التصميم المفاهيمي والتخطيطي",
            desc: "ترجمة رؤيتك إلى فراغات معيشية وحيّزاتٍ رائعة",
          },
          {
            title: "تطوير التصميم",
            desc: "تحويل الأفكار والتفاصيل إلى تصميم قابل للتنفيذ",
          },
          {
            title: "المخططات التنفيذية",
            desc: "رسومات تنفيذية كاملة ومواصفات ومجموعات تنسيق",
          },
          {
            title: "إصدار الرخصة",
            desc: "إدارة موافقات البلدية والاشتراطات التنظيمية",
          },
        ],
        image: IMG.service1,
      },
      {
        index: "02",
        label: "خدمة / 02",
        title: "إدارة الإنشاء والإشراف",
        subtitle: "مشروعك. في الوقت المحدد. ضمن الميزانية. بلا تنازلات",
        p: "بوصفنا مستشارك المتخصص في إدارة المشاريع (PMC)، نتولى المسؤولية الكاملة عن مشروعك من مرحلة ما قبل الإنشاء حتى التسليم النهائي. يدير فريقنا المقاولين ويتحكم في التكاليف ويراقب الجداول الزمنية ويطبّق معايير الجودة",
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
            desc: "زيارات الموقع، وموافقات المواد، وإدارة الملاحظات",
          },
          {
            title: "دور PMC الكامل",
            desc: "إدارة متكاملة من ما قبل الإنشاء حتى التسليم",
          },
        ],
        image: IMG.service2,
      },
      {
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
        desc: "معرفة عميقة بالأنظمة وعلاقات موثوقة",
      },
    ],
  },
  projects: {
    eyebrow: "مختارات من أعمالنا",
    title: "أعمالنا",
    intro: "نماذج من مشاريعنا السكنية — قريباً مجموعة كاملة من أعمالنا المنجزة",
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
    year: "2025",
    awardName: "جائزة أفضل تصميم معماري سكني",
    organization: "الهيئة السعودية للمهندسين",
    desc: "حصل مكتب أقواس على هذه الجائزة تقديراً لتميّزه في التصميم المعماري السكني، حيث أشادت لجنة التحكيم بالدمج الراقي بين الهوية المحلية والمعاصرة، وكفاءة الفراغات وجودة الإضاءة الطبيعية. تعكس هذه الجائزة التزامنا بتسليم مشاريع سكنية تتجاوز توقعات عملائنا",
    image: IMG.award,
  },
  team: {
    eyebrow: "فريقنا",
    title: "تعرّف على الفريق",
    intro: "خبراتٌ متنوّعة تجتمع لترجمة رؤيتك إلى واقع",
    members: [
      {
        name: "م. خالد العتيبي",
        role: "الشريك المؤسس — مهندس معماري",
        image: IMG.team1,
        bio: "خبرة تتجاوز خمسة عشر عاماً في التصميم المعماري السكني، يقود خالد رؤية المكتب ويُشرف على تطوّر كل مشروعٍ من الفكرة حتى التسليم",
      },
      {
        name: "م. نورة القحطاني",
        role: "مديرة التصميم الداخلي",
        image: IMG.team2,
        bio: "تجمع الحسّ الفني بالدقة التقنية لابتكار فراغاتٍ داخلية تعكس هوية العملاء وأسلوب حياتهم، من أول لوحة مزاجٍ حتى اللمسة الأخيرة",
      },
    ],
  },
  contact: {
    eyebrow: "تواصل معنا",
    title: "لنبنِ معاً شيئاً استثنائياً",
    intro: "أخبرنا عن مشروعك، وسنعاود التواصل معك خلال يومي عمل",
    officeLabel: "المكتب",
    office: "الرياض، المملكة العربية السعودية",
    website: "archesriyadh.com",
    websiteUrl: "https://archesriyadh.com",
    contactLabel: "تواصل",
    email: "contact@archesriyadh.com",
    phone: "+966 54 66 54 333",
    whatsappLabel: "WhatsApp",
    mapLabel: "الموقع",
    // Placeholder: Riyadh city center — replace with the exact office coordinates.
    mapLat: 24.7136,
    mapLng: 46.6753,
    mapZoom: 15,
    directionsLabel: "الاتجاهات على الخريطة",
    form: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "نبذة عن مشروعك",
      submit: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      success: "تم استلام رسالتك. سنعاود التواصل قريباً",
      error: "تعذّر الإرسال. حاول مرة أخرى أو راسلنا مباشرةً",
      subject: "استفسار جديد من موقع أقواس",
    },
  },
  footer: {
    tagline: "مكتب هندسي متعدد التخصصات — الرياض",
    rights: "جميع الحقوق محفوظة",
  },
};

const en: SiteContent = {
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
        desc: "Integrated design and construction services under one roof",
      },
      {
        title: "Specialised in residential projects",
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
        index: "01",
        label: "SERVICE / 01",
        title: "Architectural Design",
        subtitle: "Designing spaces that elevate quality of life",
        p: "We provide complete architectural design services for residential projects — from the first concept sketches to building documents approved by the relevant authorities. Our approach pairs BIM digital delivery with deep knowledge of local regulations, ensuring designs that are ambitious yet buildable",
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
            desc: "Complete working drawings, specifications, and coordination sets",
          },
          {
            title: "Permitting",
            desc: "Managing municipal approvals and regulatory requirements",
          },
        ],
        image: IMG.service1,
      },
      {
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
            desc: "Site visits, material approvals, NCR and snag management",
          },
          {
            title: "Full PMC Role",
            desc: "Integrated management from pre-construction to handover",
          },
        ],
        image: IMG.service2,
      },
      {
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
        desc: "Deep regulatory knowledge and trusted relationships",
      },
    ],
  },
  projects: {
    eyebrow: "Selected works",
    title: "Projects",
    intro:
      "A glimpse of our residential work — a full portfolio of completed projects is coming soon",
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
    year: "2025",
    awardName: "Best Residential Architecture Award",
    organization: "Saudi Council of Engineers",
    desc: "Arches received this award in recognition of excellence in residential architectural design, where the jury commended the refined balance of local identity and contemporary form, the efficiency of the spaces, and the quality of natural light. It reflects our commitment to delivering residential projects that exceed our clients' expectations",
    image: IMG.award,
  },
  team: {
    eyebrow: "Our team",
    title: "Meet the team",
    intro:
      "A diverse range of expertise brought together to bring your vision to life",
    members: [
      {
        name: "Khalid Al-Otaibi",
        role: "Founding Partner — Architect",
        image: IMG.team1,
        bio: "With over fifteen years of experience in residential architectural design, Khalid leads the firm's vision and oversees every project from concept to handover",
      },
      {
        name: "Noura Al-Qahtani",
        role: "Interior Design Director",
        image: IMG.team2,
        bio: "Blending artistic sensibility with technical precision, Noura crafts interiors that reflect each client's identity and lifestyle — from the first mood board to the final touch",
      },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let's build something exceptional",
    intro:
      "Tell us about your project and we'll get back to you within two business days",
    officeLabel: "Office",
    office: "Riyadh, Saudi Arabia",
    website: "archesriyadh.com",
    websiteUrl: "https://archesriyadh.com",
    contactLabel: "Contact",
    email: "contact@archesriyadh.com",
    phone: "+966 54 66 54 333",
    whatsappLabel: "WhatsApp",
    mapLabel: "Location",
    // Placeholder: Riyadh city center — replace with the exact office coordinates.
    mapLat: 24.7136,
    mapLng: 46.6753,
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
    tagline: "A multidisciplinary engineering office — Riyadh",
    rights: "All rights reserved",
  },
};

const CONTENT: Record<Locale, SiteContent> = { ar, en };

export function getContent(locale: string | undefined): SiteContent {
  return locale === "en" ? CONTENT.en : CONTENT.ar;
}
