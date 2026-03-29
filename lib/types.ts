export type Tag = {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  cover_image_url?: string;
  status: 'draft' | 'published' | 'archived' | string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  updated_by?: number;
  tags?: Tag[];
};

export type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};