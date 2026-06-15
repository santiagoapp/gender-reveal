import { notFound } from "next/navigation";
import Invitation from "@/components/Invitation";
import CoverGate from "@/components/CoverGate";
import { getGroups } from "@/lib/sheet";

// Static export: enumerate every group slug at build time. Unknown slugs 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const groups = await getGroups();
  return groups.map((g) => ({ slug: g.slug }));
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const groups = await getGroups();
  const group = groups.find((g) => g.slug === slug);
  if (!group) notFound();
  return (
    <CoverGate>
      <Invitation group={group} />
    </CoverGate>
  );
}
