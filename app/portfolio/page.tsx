'use client';

import { SectionTitle } from '@/components/layout/section-title';
import { projects } from '@/lib/portfolio-data';
import { useLanguage } from '@/lib/language';

export default function PortfolioPage() {
  const { t } = useLanguage();
  const p = t.portfolio;

  return (
    <section className="section-gap">
      <div className="container-page">
        <SectionTitle title={p.title} subtitle={p.subtitle} />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="card p-6">
              <div className="space-y-4">
                {/* Title — kept in English per spec */}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {project.title}
                </h3>

                {/* Description — split on double-newline so paragraphs render correctly */}
                <div className="space-y-2">
                  {project.description.split('\n\n').map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-6 text-slate-600 dark:text-slate-400"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Highlights — capped at 3 to keep cards compact */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      {p.highlights}
                    </p>
                    <ul className="space-y-1">
                      {project.highlights.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
