"use client";
import CreateEventForm, {
  CreateEventValues,
} from "@/app/components/envents/createEventsForm";
import { trpc } from "@/server/trpc/client";

export default function CreateEventPage() {
  const { mutate } = trpc.event.create.useMutation();

  const handleSubmit = (data: CreateEventValues) => {
    mutate(data);
  };
  return (
    <div className="mx-auto max-w-4xl ">
      <CreateEventForm onSubmit={handleSubmit} />
    </div>
  );
}
