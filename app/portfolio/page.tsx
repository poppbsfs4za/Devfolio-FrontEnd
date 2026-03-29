import { SectionTitle } from '@/components/layout/section-title';
import { projects } from '@/lib/portfolio-data';

export default function PortfolioPage() {
  return (
    <section className="section-gap">
      <div className="container-page">
        <SectionTitle title="Portfolio" subtitle="Showcase selected backend and system design projects here." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="card p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
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
