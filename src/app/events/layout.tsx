import { HydrateClient } from "@/server/trpc/server";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HydrateClient>{children}</HydrateClient>;
}
