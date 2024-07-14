"use client";
import { clusterApiUrl, Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import fetch from "cross-fetch";
import { Wallet } from "@project-serum/anchor";
import bs58 from "bs58";
import { GlobalContext } from "@/context/AppContext";
// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.

export const SwapView = () => {
    const connection = new Connection(
        clusterApiUrl('devnet')
      );
      
      const { userPkey, userMnemonic } = GlobalContext();
      
      
    
    return(<div>
        hello world
    </div>)
} 