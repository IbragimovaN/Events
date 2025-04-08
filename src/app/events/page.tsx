"use client";
// <-- hooks can only be used in client components
import { trpc } from "@/server/trpc/client";
import { EventCard } from "../components/envents/events-card";
import { JoinEventButton } from "../components/join-event/join-event-button";

export default function ClientHome() {
  const { data } = trpc.event.findMany.useQuery();

  return (
    <ul>
      {data?.map((event) => (
        <li key={event.id} className="mb-6">
          <EventCard
            {...event}
            action={<JoinEventButton eventId={event.id} />}
          />
        </li>
      ))}
    </ul>
  );
}
