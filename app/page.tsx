import { getPublishedPosts } from '@/lib/api';
import { HomeContent } from '@/components/home/home-content';

export default async function HomePage() {
  const posts = await getPublishedPosts().catch(() => []);

  return <HomeContent posts={posts} />;
}
