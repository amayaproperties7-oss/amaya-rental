import PropertyClient from "./PropertyClient";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const propertyIds = [
    "rental-vsp-1",
    "rental-vsp-2",
    "rental-vsp-3",
    "rental-1",
    "rental-2",
    "rental-3",
    "rental-4",
    "rental-5",
    "rental-6",
    "rental-7",
    "rental-8",
    "rental-9",
    "rental-10",
    "1",
    "2",
    "3",
    "4"
  ];
  return propertyIds.map(id => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: PageProps) {
  return <PropertyClient params={params} />;
}
