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
    
    const getUserSolBalance = async () => {
          const connection = new Connection(clusterApiUrl('mainnet-beta'),'confirmed')
          console.log('5555',connection)
          const balance = await connection.getBalance(new PublicKey(userAddress))
          console.log(balance, providerURL, "1 non  blnc");
          const formattedBalance = balance / LAMPORTS_PER_SOL;
          console.log("User ETH balance:", formattedBalance);
          setTrx(true) 
          setEthBalance(formattedBalance);
          return formattedBalance;
      };
      getUserSolBalance
  
      
  }, [providerURL]);
  return true;
};


