"use client";
import CreateAndEditEventForm, {
  CreateEventValues,
} from "@/app/components/envents/createAndEditEventsForm";
import { trpc } from "@/server/trpc/client";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { mutate } = trpc.event.create.useMutation({
    onSuccess: async (data) => {
      await utils.event.findMany.invalidate();
      router.push(`/${data.id}`);
    },
  });

  const handleSubmit = (data: CreateEventValues) => {
    mutate(data);
  };
  return (
    <div className="mx-auto max-w-4xl ">
      <CreateAndEditEventForm onSubmit={handleSubmit} />
    </div>
  );
}
