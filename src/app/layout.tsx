import { TRPCProvider } from "@/server/trpc/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
