import { SectionTitle } from '@/components/layout/section-title';
import { BlogFilter } from '@/components/blog/blog-filter';
import { getPublishedPosts } from '@/lib/api';

export default async function BlogPage() {
  const posts = await getPublishedPosts().catch(() => []);

  return (
    <section className="section-gap">
      <div className="container-page">
        <SectionTitle title="Blog" subtitle="Browse posts, search by keyword, and filter by tags." />
        <BlogFilter posts={posts} />
      </div>
    </section>
  );
}
