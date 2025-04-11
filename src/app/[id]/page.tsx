"use client";
import { EventDetail } from "@/app/components/envents/detail";
import { trpc } from "@/server/trpc/client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Event() {
  const params = useParams();
  const eventId = Number(params.id);
  const { status } = useSession();
  const { data: event, isLoading } = trpc.event.findUnique.useQuery({
    id: eventId,
  });
  const { data: isAuthor } = trpc.event.isAuthor.useQuery(
    { id: eventId },
    {
      enabled: status === "authenticated",
    }
  );

  if (isLoading) return "Loading...";

  if (!event) return "No data";

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Link href={`/`} className="px-4 py-2 bg-blue-500 text-white rounded">
          На главную
        </Link>
        {isAuthor && (
          <Link
            href={`/edit/${eventId}`}
            className="px-4 py-2 bg-red-300 text-white rounded"
          >
            Редактировать
          </Link>
        )}
      </div>

      <EventDetail {...event} />
    </div>
  );
}
