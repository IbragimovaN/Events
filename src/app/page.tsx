"use client";

import { trpc } from "@/server/trpc/client";
import { EventCard } from "./components/envents/events-card";
import Header from "./components/header/header";
import { EventButton } from "./components/button-join-or-leave-event/event-button";

export default function ClientHome() {
  const { data, refetch } = trpc.event.findMany.useQuery();

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
                event.isJoined ? (
                  <EventButton
                    eventId={event.id}
                    onSuccess={refetch}
                    color="bg-red-500"
                    procedure="leave"
                    text="Покинуть"
                  />
                ) : (
                  <EventButton
                    eventId={event.id}
                    onSuccess={refetch}
                    color="bg-green-400"
                    procedure="join"
                    text="Присоединиться"
                  />
                )
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}
