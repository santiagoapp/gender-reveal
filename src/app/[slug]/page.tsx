import { notFound } from "next/navigation";
import Invitation from "@/components/Invitation";
import CoverGate from "@/components/CoverGate";
import { getGroup, getGroups } from "@/lib/groups";

// Static export: enumerate every group slug at build time. Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getGroups().map((g) => ({ slug: g.slug }));
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = getGroup(slug);
  if (!group) notFound();
  return (
    <CoverGate>
      <Invitation group={group} />
    </CoverGate>
  );
}
