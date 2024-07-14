'use client'
import { Create } from "@/components/Create";
import { Home2 } from "@/components/Home";
import { Loading } from "@/components/Loading";
import { Menu } from "@/components/Menu";
import { GlobalContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Dynamically load the Jupiter script
    const script = document.createElement('script');
    script.src = "https://terminal.jup.ag/main-v2.js";
    script.onload = () => launchJupiter(); // Initialize Jupiter after the script loads
    document.head.appendChild(script);
  }, []);

  function launchJupiter() {
    if (window.Jupiter) {
      window.Jupiter.init({ 
        displayMode: "integrated",
        integratedTargetId: "integrated-terminal",
        endpoint: "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY_HERE",
        strictTokenList: false,
        defaultExplorer: "SolanaFM",
        formProps: {
          initialAmount: "888888880000",
          initialInputMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
          initialOutputMint: "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR",
        },
      });
    } else {
      console.error("Jupiter script not loaded yet");
    }
  }
  const { isAuthenticate } = GlobalContext()
  return (
    <main className="flex min-h-screen bg-[#448cff] bg-black/0 flex-col items-center justify-between p-1.5">
      <div id="integrated-terminal"></div>
     {
      isAuthenticate ? 
      <Home2/> : <Create/>
     } 
    </main>
  );
}
