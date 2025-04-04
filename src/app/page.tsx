import { trpc } from "@/server/trpc/server";
import { ClientGreeting } from "./client-greeting";
import { HydrateClient } from "@/server/trpc/server";

export default async function Home() {
  await trpc.hello.prefetch({ text: "Server" });

  return (
    <HydrateClient>
      <div>root page</div>
      {/** ... */}
      <ClientGreeting />
    </HydrateClient>
  );
}
