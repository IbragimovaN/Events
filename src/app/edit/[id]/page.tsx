"use client";

import CreateAndEditEventForm from "@/app/components/envents/createAndEditEventsForm";
import { trpc } from "@/server/trpc/client";
import { CreateEventSchema } from "@/server/trpc/schema";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = Number(params.id);

  const { data: isAuthor } = trpc.event.isAuthor.useQuery({ id: eventId });
  const { data: event, refetch } = trpc.event.findUnique.useQuery({
    id: eventId,
  });
  const { mutate: updateEvent } = trpc.event.update.useMutation({
    onSuccess: async () => {
      await refetch();
      router.push(`/${eventId}`);
    },
  });

  const [defaultValues, setDefaultValues] =
    useState<Partial<z.infer<typeof CreateEventSchema>>>();

  useEffect(() => {
    if (event) {
      setDefaultValues({
        title: event.title,
        description: event.description || "",
        date: event.date,
      });
    }
  }, [event]);

  if (!isAuthor) {
    return "У вас нет прав для редактирования этого события";
  }

  if (!defaultValues) {
    return "Загрузка...";
  }

  return (
    <div className="mx-auto max-w-4xl py-8">
      <CreateAndEditEventForm
        onSubmit={(data) => updateEvent({ id: eventId, data })}
        eventValues={defaultValues}
        isEditing={true}
      />
    </div>
  );
}
