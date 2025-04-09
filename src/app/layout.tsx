import { TRPCProvider } from "@/server/trpc/client";
import { AuthProvider } from "@/auth/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth.config";
import { HydrateClient } from "@/server/trpc/server";
import "@/app/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body className="mx-auto max-w-4xl">
        <AuthProvider session={session}>
          <TRPCProvider>
            <HydrateClient>{children}</HydrateClient>
          </TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
