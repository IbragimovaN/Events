"use client";

import { trpc } from "@/server/trpc/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { status } = useSession();

  const { mutate } = trpc.event[procedure].useMutation({ onSuccess });

  const handleClick = () => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
      return;
    }
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
