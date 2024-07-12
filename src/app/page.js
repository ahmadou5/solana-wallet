import { Loading } from "@/components/Loading";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#2c3ca1]/0 bg-black flex-col items-center justify-between p-24">
      <Loading/>
    </main>
  );
}
