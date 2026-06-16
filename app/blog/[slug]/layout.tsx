import { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/data';

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: 'Prop Journals | Canadian Prop Money',
    };
  }
  return {
    title: `${post.title} | Canadian Prop Money Blog`,
    description: post.summary.substring(0, 160) || post.disclaimer.substring(0, 160),
    alternates: {
      canonical: `https://canadianpropmoney.org/blog/${slug}`,
    },
  };
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
