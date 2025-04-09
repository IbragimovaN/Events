"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CreateEventButton from "../envents/create-event-button";

export default function Header() {
  const session = useSession();
  const router = useRouter();
  const { status, data } = session;

  const handleClickSignOut = () => {
    router.push("/api/auth/signout");
  };
  const handleClickSignIn = () => {
    router.push("/api/auth/signin");
  };
  return (
    <div className="max-w-4xl h-15 bg-gray-100 mb-3 flex items-center justify-between px-4 py-3">
      {status === "authenticated" ? (
        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-medium">{data.user.name}</div>
          <div>
            {" "}
            <CreateEventButton />{" "}
            <button
              className="h-10 px-6 font-semibold rounded-md bg-gray-300 text-black hover:bg-gray-400 transition-colors"
              onClick={handleClickSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end w-full">
          <button
            onClick={handleClickSignIn}
            className="h-10 px-6 font-semibold rounded-md bg-gray-300 text-black hover:bg-gray-400 transition-colors"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
