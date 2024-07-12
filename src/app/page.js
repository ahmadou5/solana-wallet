import { Home2 } from "@/components/Home";
import { Loading } from "@/components/Loading";
import { Menu } from "@/components/Menu";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#448cff] bg-black/0 flex-col items-center justify-between p-1.5">
      <Home2/>
    </main>
  );
}
