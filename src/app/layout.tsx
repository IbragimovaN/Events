import { TRPCProvider } from "@/server/trpc/client";
import { AuthProvider } from "@/auth/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth.config";
import "@/app/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body>
        <AuthProvider session={session}>
          <TRPCProvider>{children}</TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
