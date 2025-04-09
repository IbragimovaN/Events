"use client";
import { useRouter } from "next/navigation";

export default function CreateEventButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/create");
  };
  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-emerald-900 text-white"
      onClick={handleClick}
    >
      Создать событие
    </button>
  );
}
