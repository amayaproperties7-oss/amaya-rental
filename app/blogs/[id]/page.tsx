import BlogDetailClient from "./BlogDetailClient";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [
    { id: 'mock-1' },
    { id: 'mock-2' },
    { id: 'mock-3' },
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  return <BlogDetailClient params={params} />;
}
