import { ProtectedRoute } from '@/components/admin/protected-route';
import { PostForm } from '@/components/admin/post-form';
import { SectionTitle } from '@/components/layout/section-title';

export default function NewPostPage() {
  return (
    <ProtectedRoute>
      <section className="section-gap">
        <div className="container-page max-w-4xl">
          <SectionTitle
            title="Create Post"
            subtitle="Create a new blog post from the admin panel."
          />
          <PostForm mode="create" />
        </div>
      </section>
    </ProtectedRoute>
  );
}