"use client";
// <-- hooks can only be used in client components
import { trpc } from "@/server/trpc/client";
import { EventCard } from "./components/envents/events-card";
import { JoinEventButton } from "./components/join-event/join-event-button";
import Header from "./components/header/header";

export default function ClientHome() {
  const { data, refetch } = trpc.event.findMany.useQuery();
  console.log(data);

  return (
    <>
      {" "}
      <Header />
      <ul>
        {data?.map((event) => (
          <li key={event.id} className="mb-6">
            <EventCard
              {...event}
              action={
                !event.isJoined && (
                  <JoinEventButton eventId={event.id} onSuccess={refetch} />
                )
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}
