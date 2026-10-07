import EditBlogClient from "./EditBlogClient";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [{ id: '1' }];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: PageProps) {
  return <EditBlogClient params={params} />;
}
