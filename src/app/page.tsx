import { trpc } from "@/server/trpc/server";
import { ClientHome } from "./events/page.jsx";
import { HydrateClient } from "@/server/trpc/server";

export default async function Home() {
  await trpc.hello.prefetch({ text: "Server" });

  return <div>главная</div>;
}
