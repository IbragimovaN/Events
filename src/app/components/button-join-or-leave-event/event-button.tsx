"use client";

import { trpc } from "@/server/trpc/client";

type EventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
  color: string;
  procedure: "join" | "leave";
  text: string;
};

export const EventButton = ({
  eventId,
  onSuccess,
  color,
  procedure,
  text,
}: EventButtonProps) => {
  const { mutate } = trpc.event[procedure].useMutation({ onSuccess });

  const handleClick = () => {
    mutate({ id: eventId });
  };

  return (
    <button
      className={`h-10 px-6 font-semibold rounded-md  text-white ${color}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
