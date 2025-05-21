import "../../src/app/globals.css";
import { BottomNav } from "./components/BottomNav";

export const metadata = {
  title: "MotoScan Web",
  description: "Gerencie o status das motos com agilidade",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1 p-4 pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
