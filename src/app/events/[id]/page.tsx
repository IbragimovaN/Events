"use client";
import { EventDetail } from "@/app/components/envents/detail";
import { trpc } from "@/server/trpc/client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function Event() {
  const params = useParams();

  const session = useSession();

  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(params.id),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (session.status === "unauthenticated") {
    return "Forbidden";
  }

  if (!data) {
    return "No data";
  }

  return <EventDetail {...data} />;
}
