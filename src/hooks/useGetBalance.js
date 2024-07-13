"use client";
import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
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
    
    const getUserSolBalance = async () => {
          const connection = new Connection(providerURL)
          console.log('5555',connection)
          const balance = await connection.getBalance(userAddress)
          console.log(balance, providerURL, "1 non  blnc");
          const formattedBalance = balance / LAMPORTS_PER_SOL;
          console.log("User ETH balance:", formattedBalance);
          setTrx(true) 
          setEthBalance(formattedBalance);
          return formattedBalance;
      };
      getUserSolBalance
  
      
  }, [providerURL]);
  return trx;
};




const useSolanaBalance = () => {
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
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
        const connection = new Connection(providerURL); // Replace with desired cluster
        const balance1 = await connection.getBalance(userAddress);
        setEthBalance(balance1/LAMPORTS_PER_SOL)
        setBalance(balance1)
        console.log(balance1/LAMPORTS_PER_SOL,'balanaceess')
      
    };

    fetchBalance();
  }, [providerURL]);

  return { balance, ethBalance, error };
};

export default useSolanaBalance;
