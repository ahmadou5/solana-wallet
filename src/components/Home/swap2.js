"use client";
import { clusterApiUrl, Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import fetch from "cross-fetch";
import { Wallet } from "@project-serum/anchor";
import bs58 from "bs58";
import { GlobalContext } from "@/context/AppContext";
// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
const connection = new Connection(
  "https://neat-hidden-sanctuary.solana-mainnet.discover.quiknode.pro/2af5315d336f9ae920028bbb90a73b724dc1bbed/"
);

const { userPkey, userMnemonic } = GlobalContext();
const seed = await bip39.mnemonicToSeed(userMnemonic);
//console.log(seed,'seed')
const seedBytes = seed.slice(0, 32);
const account = await Keypair.fromSeed(seedBytes);
const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(userPkey || "")));


console.log(wallet,'w')
console.log(account,'a')


export const SwapView = () => {
    const connection = new Connection(
        clusterApiUrl('devnet')
      );
      
      const { userPkey, userMnemonic } = GlobalContext();
      
      
      const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(userPkey || "")));
      
      
      console.log(wallet,'w')
      console.log(account,'a')
    return(<div>
        hello world
    </div>)
} 