'use client'
import { Create } from "@/components/Create";
import { Home2 } from "@/components/Home";
import { Loading } from "@/components/Loading";
import { Menu } from "@/components/Menu";
import { GlobalContext } from "@/context/AppContext";
import Image from "next/image";

export default function Home() {
  const { isAuthenticate } = GlobalContext()
  return (
    <main className="flex min-h-screen bg-[#448cff] bg-black/0 flex-col items-center justify-between p-1.5">
     {
      isAuthenticate ? 
      <Home2/> : <Create/>
     } 
    </main>
  );
}
