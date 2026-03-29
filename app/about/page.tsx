import { SectionTitle } from '@/components/layout/section-title';

export default function AboutPage() {
  return (
    <section className="section-gap">
      <div className="container-page">
        <SectionTitle title="About Me" subtitle="Use this page to present your background, strengths, and engineering mindset." />
        <div className="card prose-content max-w-3xl p-8">
          <p>
            I’m a backend software engineer with experience building systems in insurance, finance, and enterprise domains.
            My main focus is writing maintainable backend services using Golang, PostgreSQL, and clean architecture.
          </p>
          <p>
            Recently, I built and deployed this full backend platform on GCP VM with Docker, Nginx, PostgreSQL, and CI/CD using GitHub Actions.
          </p>
          <p>
            You can replace this text with your personal story, strengths, technical focus, and career goals.
          </p>
        </div>
      </div>
    </section>
  );
}
