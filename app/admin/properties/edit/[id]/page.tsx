import EditPropertyClient from "./EditPropertyClient";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [{ id: '1' }];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPropertyPage({ params }: PageProps) {
  return <EditPropertyClient params={params} />;
}
