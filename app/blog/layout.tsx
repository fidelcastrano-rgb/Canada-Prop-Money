import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movie Cash Sourcing & Film Design Blog | Prop Journals',
  description: 'Get the latest guides and tutorials on movie prop cash creation, polymer replication materials, filming compliance regulations, and Hollywood North set designs.',
  alternates: {
    canonical: 'https://canadianpropmoney.org/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
