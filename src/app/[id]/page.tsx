"use client";
import { EventDetail } from "@/app/components/envents/detail";
import { trpc } from "@/server/trpc/client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Event() {
  const params = useParams();
  const eventId = Number(params.id);
  const { status } = useSession();
  const router = useRouter();
  const { data: event, isLoading } = trpc.event.findUnique.useQuery({
    id: eventId,
  });
  const utils = trpc.useUtils();
  const { data: isAuthor } = trpc.event.isAuthor.useQuery(
    { id: eventId },
    {
      enabled: status === "authenticated",
    }
  );

  const { mutate: deleteEvent } = trpc.event.delete.useMutation({
    onSuccess: async () => {
      await utils.event.findMany.invalidate();
      await utils.event.findUnique.invalidate({ id: eventId });
      router.push("/");
    },
  });

  const handleDelete = () => {
    if (confirm("Вы уверены, что хотите удалить это событие?")) {
      deleteEvent({ id: eventId });
    }
  };

  if (isLoading) return "Loading...";

  if (!event) return "No data";

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Link href={`/`} className="px-4 py-2 bg-blue-500 text-white rounded">
          На главную
        </Link>
        {isAuthor && (
          <div>
            {" "}
            <Link
              href={`/edit/${eventId}`}
              className="px-4 py-2 text-blue-900 hover:text-blue-700"
            >
              Редактировать
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-red-700 cursor-pointer hover:text-red-600"
            >
              Удалить
            </button>
          </div>
        )}
      </div>

      <EventDetail {...event} />
    </div>
  );
}
