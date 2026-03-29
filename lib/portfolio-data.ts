import { ProjectItem } from '@/lib/types';

export const projects: ProjectItem[] = [
  {
    title: 'Devfolio API Platform',
    description: 'Personal portfolio backend platform with blog management, deployed on GCP VM with Docker, Nginx, and CI/CD via GitHub Actions.',
    tech: ['Golang', 'PostgreSQL', 'Docker', 'Nginx', 'GCP', 'GitHub Actions']
  },
  {
    title: 'FastQuote Insurance Quotation System',
    description: 'Backend microservices for insurance premium calculation workflows with strong focus on correctness and financial rules.',
    tech: ['Golang', 'PostgreSQL', 'Redis', 'Clean Architecture']
  },
  {
    title: 'Real-time Order Processing System',
    description: 'Real-time backend service using Go, Redis, WebSocket, and PostgreSQL for event-driven order workflows.',
    tech: ['Golang', 'Redis', 'WebSocket', 'PostgreSQL']
  }
];
