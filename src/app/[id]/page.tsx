"use client";
import { EventDetail } from "@/app/components/envents/detail";
import { trpc } from "@/server/trpc/client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Event() {
  const params = useParams();
  const session = useSession();

  const eventId = Number(params.id);
  const { data: event, isLoading } = trpc.event.findUnique.useQuery({
    id: eventId,
  });
  const { data: isAuthor } = trpc.event.isAuthor.useQuery({ id: eventId });

  if (isLoading) return "Loading...";
  if (session.status === "unauthenticated") return "Forbidden";
  if (!event) return "No data";

  return (
    <div>
      {isAuthor && (
        <div className="flex justify-between mb-4">
          <Link href={`/`} className="px-4 py-2 bg-blue-500 text-white rounded">
            На главную
          </Link>
          <Link
            href={`/edit/${eventId}`}
            className="px-4 py-2 bg-red-300 text-white rounded"
          >
            Редактировать
          </Link>
        </div>
      )}
      <EventDetail {...event} />
    </div>
  );
}
