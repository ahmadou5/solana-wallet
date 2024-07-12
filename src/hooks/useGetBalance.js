"use client";
import { useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";
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
  
  const [trx, setTrx] = useState(true);
  const id = user?.initDataUnsafe?.user?.id
  useEffect(() => {
    const connection = new Connection('https://api.mainnet-beta.solana.com')
    console.log('5555',connection)
    const getUserEthBalance = async () => {
        try {
          const balance = await Provider.getBalance(userAddress);
          console.log(balance, providerURL, "1 non  blnc");
          const formattedBalance = formatEther(balance);
          console.log("User ETH balance:", formattedBalance);
          setTrx(true) 
          setEthBalance(formattedBalance);
          return formattedBalance;
        } catch (error) {
          console.error("Error fetching ETH balance:", error);
          return null; // Handle errors gracefully
        }
      };
  
      
  }, [providerURL]);
  return trx;
};
