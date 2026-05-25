import { ProjectItem } from '@/lib/types';

export const projects: ProjectItem[] = [
  {
    title: 'Enterprise Insurance Management Platform',
    description:
      'Backend services for insurance workflows, covering quotation, premium calculation, policy-related processes, and data consistency.\n\nMy role involved implementing backend APIs, business rules, financial calculation logic, SQL optimization, and production issue investigation.',
    highlights: [
      'Premium calculation and insurance business rules',
      'Data validation and financial correctness',
      'SQL optimization for insurance workflows',
    ],
    tech: ['Go', 'Echo', 'PostgreSQL', 'Redis', 'Clean Architecture', 'JWT', 'Insurance Domain'],
  },
  {
    title: 'Banking Lending Workflow Platform',
    description:
      'Backend and workflow development for a banking lending platform, focused on improving business workflows, data handling, and enterprise process automation.\n\nWorked with Zoral, a JavaScript-based workflow engine, to implement APIs, business logic, and structured workflow processes.',
    highlights: [
      'Lending workflow improvement',
      'Business logic implementation',
      'Enterprise workflow automation',
    ],
    tech: ['Zoral', 'JavaScript', 'Workflow Engine', 'Banking', 'Enterprise System'],
  },
  {
    title: 'Online Insurance Platform',
    description:
      'An online insurance platform with customer-facing insurance services, including digital insurance workflows, OCR-assisted data input, and claim tracking features.\n\nI contributed to backend development, database design, document generation, SQL optimization, and system reliability improvements.',
    highlights: [
      'Online insurance workflows',
      'OCR-assisted data input',
      'Claim tracking related features',
    ],
    tech: ['Go', 'Node.js', 'PostgreSQL', 'MySQL', 'Redis', 'OCR', 'Insurance Platform'],
  },
  {
    title: 'Real-time Order Processing System',
    description:
      'A backend service for real-time order workflows using Go, Redis, WebSocket, and PostgreSQL.\n\nThe system focused on event-driven communication, fast state updates, and reliable order processing.',
    highlights: [
      'Real-time order updates via WebSocket',
      'Redis-backed fast state handling',
      'PostgreSQL data persistence',
    ],
    tech: ['Go', 'Redis', 'WebSocket', 'PostgreSQL', 'Real-time System'],
  },
  {
    title: 'Devfolio Platform',
    description:
      'A full-stack portfolio and blog platform built to practice real-world backend, frontend, cloud deployment, and CI/CD workflows.\n\nThe system includes a Go backend API, PostgreSQL database, admin CMS, Markdown blog, image upload handling, GitHub Actions, Docker deployment, Google Cloud Storage, and Cloudflare DNS.',
    highlights: [
      'Go backend API with Clean Architecture',
      'Blog CMS and Markdown rendering',
      'Docker-based deployment with GitHub Actions CI/CD',
    ],
    tech: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL', 'Docker', 'GCP', 'CI/CD'],
  },
];
