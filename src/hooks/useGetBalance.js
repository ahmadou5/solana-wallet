"use client";
import { useEffect, useState } from "react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
//import { ethers,formatUnits,parseUnits, formatEther } from "ethers";
//import { Supabase } from "@/Utils/supabasedb";
import { GlobalContext } from "@/context/AppContext";
export const useGetUserBalance = () => {
  const {
    setIsSend,
    userPkey,
    ethPrice,
    ethBalance,
    setEthBalance,
    userAddress,
    providerURL,
    isTxFail,
    setIsTxFail,
    isTxSuccess,
    setIsTxSuccess,
    user,
  } = GlobalContext();
  
  
  useEffect(() => {
    
    const fetchBalance = async () => {
      const connection = await new Connection(clusterApiUrl('devnet'),'confirmed'); // Replace with desired cluster
      console.log(connection,'daganan')
      const balance1 = await connection.getBalance(new PublicKey(userAddress));
      console.log(balance1.toString(),'12346')
      setEthBalance(balance1/LAMPORTS_PER_SOL)
     
      console.log(balance1/LAMPORTS_PER_SOL,'balanaceess')
    
  };

  fetchBalance();
  
      
  }, [providerURL]);
  return ethBalance;
};


