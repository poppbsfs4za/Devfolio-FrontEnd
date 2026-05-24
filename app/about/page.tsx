import Image from 'next/image';
import {
  SiGo, SiTypescript, SiJavascript, SiPython,
  SiPostgresql, SiMysql, SiMongodb, SiRedis,
  SiDocker, SiGithubactions, SiGooglecloud,
  SiNginx, SiNextdotjs, SiReact, SiVuedotjs,
  SiElasticsearch, SiCloudflare,
} from 'react-icons/si';

const techStack = [
  { icon: SiGo,             name: 'Go',             color: '#00ADD8' },
  { icon: SiTypescript,     name: 'TypeScript',      color: '#3178C6' },
  { icon: SiJavascript,     name: 'JavaScript',      color: '#F7DF1E' },
  { icon: SiPython,         name: 'Python',          color: '#3776AB' },
  { icon: SiPostgresql,     name: 'PostgreSQL',      color: '#4169E1' },
  { icon: SiMysql,          name: 'MySQL',           color: '#4479A1' },
  { icon: SiMongodb,        name: 'MongoDB',         color: '#47A248' },
  { icon: SiRedis,          name: 'Redis',           color: '#FF4438' },
  { icon: SiDocker,         name: 'Docker',          color: '#2496ED' },
  { icon: SiGithubactions,  name: 'CI/CD',           color: '#2088FF' },
  { icon: SiGooglecloud,    name: 'GCP',             color: '#4285F4' },
  { icon: SiNginx,          name: 'Nginx',           color: '#009639' },
  { icon: SiNextdotjs,      name: 'Next.js',         color: '#000000' },
  { icon: SiReact,          name: 'React',           color: '#61DAFB' },
  { icon: SiVuedotjs,       name: 'Vue.js',          color: '#4FC08D' },
  { icon: SiElasticsearch,  name: 'Elasticsearch',   color: '#005571' },
  { icon: SiCloudflare,     name: 'Cloudflare',      color: '#F38020' },
];

const experiences = [
  {
    role: 'Software Engineer (Golang)',
    company: 'Horixon T8',
    sub: 'Subsidiary of Dhipaya Insurance & Beryl 8',
    period: 'Jul 2025 – Present',
    bullets: [
      'Built production microservices for an enterprise insurance management platform covering full lifecycle from quotation to policy issuance.',
      'Go microservices with Echo, GORM, PostgreSQL, Redis — Clean Architecture & DDD principles.',
      'Insurance premium calculation: coverage terms, surcharges, discounts, risk-based pricing.',
      'Decimal-based financial computation, input validation, and data integrity checks.',
      'JWT / Keycloak authentication and authorization; Swagger / OpenAPI documentation.',
      'Production issue investigation covering quotation logic, API behavior, and data consistency.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'x10 it resource',
    sub: 'Bangkok',
    period: 'Nov 2022 – Jun 2025',
    bullets: [
      'Developed backend APIs and business logic for banking and enterprise systems using a JavaScript-based low-code platform (Zoral).',
      'Designed database schemas and optimised SQL queries for PostgreSQL and MySQL.',
      'Built a real-time order processing system using Golang, Redis, WebSocket, and PostgreSQL.',
      'Generated structured business and financial reports using JasperReports.',
      'Monitored logs and investigated production issues via Elasticsearch.',
    ],
  },
  {
    role: 'Junior Software Engineer Intern',
    company: 'INET',
    sub: 'Bangkok',
    period: 'Jun 2022 – Oct 2022',
    bullets: [
      'Built web pages from Figma designs using Vue.js, React.js, and JavaScript.',
      'Integrated frontend features with backend APIs including form actions, validation, and error handling.',
      'Assisted in building and updating CRUD APIs with Node.js and Golang.',
      'Worked with JWT-based authentication and fixed defects during testing.',
    ],
  },
];

const certs = [
  'Google Cloud Fundamentals: Big Data and Machine Learning',
  'Google Cloud Fundamentals: Core Infrastructure',
  'Cybersecurity for Vendor',
  'Practical Database Design for Big Data',
];

export default function AboutPage() {
  return (
    <div className="space-y-20 py-16">

      {/* ── Hero ── */}
      <section className="container-page">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
          <div className="shrink-0">
            <div className="relative h-40 w-40 overflow-hidden rounded-full ring-4 ring-slate-200 dark:ring-slate-700 shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Kraiwit Wongpipan"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
                Kraiwit Wongpipan
              </h1>
              <p className="mt-1 text-lg font-medium text-blue-600 dark:text-blue-400">
                Software Engineer · Backend Focus
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Bangkok, Thailand &nbsp;·&nbsp; kraiwit.w2542@gmail.com
              </p>
            </div>
            <p className="max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
              Backend engineer with hands-on experience in financial and insurance domains.
              I build reliable, maintainable services with Golang and PostgreSQL, following
              Clean Architecture and SOLID principles. I also care about DevOps — from
              CI/CD pipelines to cloud deployments on GCP.
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {['Clean Architecture', 'Microservices', 'TDD', 'SOLID', 'Domain Modeling'].map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="border-y border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="container-page space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Tech Stack</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Tools and technologies I work with</p>
          </div>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-9">
            {techStack.map(({ icon: Icon, name, color }) => (
              <div key={name} className="group flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition group-hover:shadow-md dark:bg-slate-800 dark:ring-slate-700">
                  <Icon size={28} style={{ color }} />
                </div>
                <span className="text-center text-[11px] font-medium text-slate-500 dark:text-slate-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="container-page space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Work Experience</h2>
        <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
          {experiences.map((exp) => (
            <div key={exp.company} className="relative pl-8">
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-950" />
              <div className="card p-6 space-y-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{exp.role}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{exp.company} <span className="text-slate-400">· {exp.sub}</span></p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education + Certs ── */}
      <section className="container-page grid gap-8 md:grid-cols-2">
        {/* Education */}
        <div className="card p-6 space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Education</h2>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">King Mongkut's University of Technology North Bangkok</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Bachelor of Computer Science (Bilingual Program)</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Jan 2018 – Jul 2022</p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Languages</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">Thai — Native &nbsp;·&nbsp; English — TOEIC 650 (2023)</p>
          </div>
        </div>

        {/* Certifications */}
        <div className="card p-6 space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Certifications</h2>
          <ul className="space-y-2">
            {certs.map((cert) => (
              <li key={cert} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-400" />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}
