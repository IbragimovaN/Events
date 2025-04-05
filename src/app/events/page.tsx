"use client";
// <-- hooks can only be used in client components
import { trpc } from "@/server/trpc/client";
import { EventCard } from "../components/envents/events-card";

export default function ClientHome() {
  const { data } = trpc.event.findMany.useQuery();
  console.log(data);

  return (
    <ul>
      {data?.map((event) => (
        <li key={event.id} className="mb-6">
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
}
