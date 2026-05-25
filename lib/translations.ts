export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
    },
    home: {
      greeting: "Hi, I'm Kraiwit 👋",
      tagline:
        'Backend Developer exploring infrastructure, DevOps, and AI-assisted development.',
      description:
        'I share practical notes about backend engineering, AI tools, cloud deployment, and lessons learned from real projects.',
      personalLine:
        '💻 Hybrid work enjoyer · 🌍 Remote-friendly · 🎬 Movie lover · 🏋️ Workout sometimes · 🛌 Sometimes just doing nothing',
      whatYoullFind: "What you'll find here",
      bullets: [
        'Backend engineering with Go, PostgreSQL, and clean architecture',
        'Infrastructure, DevOps, Docker, and cloud deployment notes',
        'AI-assisted development with agents, MCP, RAG, and LLM tools',
        'Projects, experiments, and lessons learned from real work',
      ],
      viewPortfolio: 'View Portfolio',
      readBlog: 'Read Blog',
      latestPosts: 'Latest Posts',
      latestPostsSubtitle:
        'Practical notes about backend development, AI tools, cloud deployment, and lessons learned from real projects.',
      noPosts: 'No published posts found yet.',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
    portfolio: {
      title: 'Selected Work',
      subtitle:
        'A collection of backend, insurance, finance, and infrastructure projects I have worked on or built to improve my engineering skills.',
      highlights: 'Highlights',
    },
    footer: {
      copyright: '© 2026 Kraiwit Wongpipan. Built with Next.js, Go, and GCP.',
      tagline: 'Personal engineering notes for future me and anyone learning along the way.',
    },
  },
  th: {
    nav: {
      home: 'หน้าหลัก',
      about: 'เกี่ยวกับผม',
      portfolio: 'ผลงาน',
      blog: 'บทความ',
    },
    home: {
      greeting: 'สวัสดีครับ ผมชื่อ Kraiwit 👋',
      tagline:
        'Backend Developer ที่กำลังเรียนรู้เรื่อง infrastructure, DevOps และการใช้ AI ช่วยในการทำงานด้าน software development',
      description:
        'ผมใช้พื้นที่นี้แชร์โน้ตเกี่ยวกับ backend engineering, AI tools, cloud deployment และบทเรียนจากโปรเจกต์ที่ได้ลองทำจริง',
      personalLine:
        '💻 ชอบงาน Hybrid · 🌍 Remote-friendly · 🎬 ชอบดูหนัง · 🏋️ ออกกำลังกายบ้าง · 🛌 บางวันก็อยากนอนเฉย ๆ',
      whatYoullFind: 'สิ่งที่คุณจะเจอในเว็บนี้',
      bullets: [
        'โน้ตเกี่ยวกับ Backend engineering ด้วย Go, PostgreSQL และ clean architecture',
        'บันทึกการเรียนรู้เรื่อง Infrastructure, DevOps, Docker และ cloud deployment',
        'การทดลองใช้ AI-assisted development เช่น agents, MCP, RAG และ LLM tools',
        'โปรเจกต์ การทดลอง และบทเรียนจากงานจริง',
      ],
      viewPortfolio: 'ดูผลงาน',
      readBlog: 'อ่านบทความ',
      latestPosts: 'บทความล่าสุด',
      latestPostsSubtitle:
        'โน้ตสั้น ๆ เกี่ยวกับ backend development, AI tools, cloud deployment และบทเรียนจากโปรเจกต์จริง',
      noPosts: 'ยังไม่มีบทความที่เผยแพร่',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
    portfolio: {
      title: 'ผลงานที่เลือกมาเล่า',
      subtitle:
        'รวมงาน backend, insurance, finance และ infrastructure ที่ผมเคยทำหรือสร้างขึ้นเพื่อฝึกและพัฒนาทักษะด้าน software engineering',
      highlights: 'จุดเด่นของงาน',
    },
    footer: {
      copyright: '© 2026 Kraiwit Wongpipan. สร้างด้วย Next.js, Go และ GCP',
      tagline:
        'พื้นที่จดโน้ตด้าน engineering ไว้ให้ตัวเองกลับมาอ่าน และเผื่อเป็นประโยชน์กับคนที่กำลังเรียนรู้เหมือนกัน',
    },
  },
} as const;

export type Language = keyof typeof translations;
export type AppTranslations = (typeof translations)[Language];
