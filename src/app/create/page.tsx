"use client";
import CreateEventForm, {
  CreateEventValues,
} from "@/app/components/envents/createEventsForm";
import { trpc } from "@/server/trpc/client";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const { mutate } = trpc.event.create.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data.id}`);
    },
  });

  const handleSubmit = (data: CreateEventValues) => {
    mutate(data);
  };
  return (
    <div className="mx-auto max-w-4xl ">
      <CreateEventForm onSubmit={handleSubmit} />
    </div>
  );
}
