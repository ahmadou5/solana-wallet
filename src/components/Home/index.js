"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHandHoldingWater } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import {
  IoArrowDown,
  IoArrowForward,
  IoArrowUp,
  IoKey,
  IoScan,
  IoSettings,
  IoAdd
} from "react-icons/io5";
import { Connection , LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Menu } from "../Menu";
import { MdSwapHoriz } from "react-icons/md";
//import { SendModal } from "../Modals/SendModal";
import { GlobalContext } from "@/context/AppContext";
//import { ReceiveModal } from "../Modals/ReceiveModal";
import { Supabase } from "@/Utils/Supabasedb";
//import { Welcome } from "../Modals/WelcomeModal";
//import { formatAddress, truncate, handleCopy } from "@/Utils/format";
//import { ethers, formatEther } from "ethers";
//import { useGetTransactions } from "@/hooks/useGetTransaction";
//import { TransactionModal } from "../Modals/TransactionCard";
//import { TokenModal } from "../Modals/Token";
//import { PhraseModal } from "../Modals/PhraseModal";
//import { PkeyModal } from "../Modals/PrivateKeyModal";
//import { ChainSelector } from "../Modals/ChainSelector";
//import { useGetUserBalance } from "@/hooks/useFetch";
//import { FaucetModal } from "../Modals/FaucetModal";
//import { TokenInfoModal } from "../Modals/TokenModal";
import { Loading } from "../Loading";
import { ChainSelector } from "../Modals/ChainSelectModal";
import useSolanaBalance, { useGetUserBalance } from "@/hooks/useGetBalance";
import { useGetUserId } from "@/hooks/useGetUserData";
export const Home2 = () => {
  const {
    user,
    setUser,
    isTokenModal,
    setIsTokenModal,
    userAddress,
    ethPrice,
    ethBalance,
    setEthBalance,
    welcome,
    isWallet,
    isTokens,
    isHistory,
    isTCard,setIsTCard,
    tokens,
    isTokenInfo,setIsTokenInfo,
    history, 
    setHistory,
    setTokens,
    providerName,
    providerImg,
    providerURL,
    providerTick,
    setIsHistory,
    setIsTokens,
    setIsWallet,
    isChainList,
    setIsChainList,
  } = GlobalContext();
 
  
  const token1 = [
    

  ]
  const { isSend, isReceive, isScan, isFaucet,setIsFaucet, setIsScan,isLoading, hDate,setHDate, isPrivate,setIsPrivate, hHash,setHHash, isPhrase,setIsPhrase, hAmount,setHAmount, hReceiver,setHReceiver,hSender,setHSender, hIsSend,setHIsSend, setIsReceive, setIsSend } =
    GlobalContext();
    
 
  const multiple = (x, y) => {
    return x * y;
  };
  
  useEffect(() => {
    const fetchBalance = async () => {
      const connection = new Connection(providerURL); // Replace with desired cluster
      console.log(connection,'daganan')
      const balance1 = await connection.getBalance('5qMocXd8GWYVqU3SJYtAsYmCJaHkniNjAfitkxqP6uez');
      console.log(balance1.toString(),'12346')
      setEthBalance(balance1/LAMPORTS_PER_SOL)
     
      console.log(balance1/LAMPORTS_PER_SOL,'balanaceess')
    
  };

  fetchBalance();
    const getUserTransaction = async () => {
      const { data, error } = await Supabase.from("SolHistory")
        .select("*")
        .eq("id", user?.initDataUnsafe?.user?.id);

      if (data) {
        console.log(data, "userData");
        setHistory(data);
      }
      if (error) {
        console.log(error);
       // alert(error);
      }
    };
    getUserTransaction();
    const getUserTokens = async() => {
      const { data, error } = await Supabase
      .from("NewTokens")
      .select("*")
      .eq("id", user?.initDataUnsafe?.user?.id);

    if (data) {
      console.log(data, "user Tokens Data");
      setTokens(data);
    }
    if (error) {
      console.log(error);
      //alert(error);
    }
    }
    getUserTokens()
   
    console.log("useTelegram");
    function initTg() {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
        setUser(tgData);
      } else {
        console.log("Telegram WebApp is undefined, retrying…");
        console.log(user);
        setTimeout(initTg, 500);
      }
    }
    initTg();
   
    
  }, []);
  
  
  return (
    <div className="w-[100%] py-2 px-1 h-auto bg-red-400/0">
      {isTokens && (
        <>
          <div className="bg-gothic-950/0 mt-1 flex bg-slate-600  mb-2 flex-col items-center justify-center w-[100%] h-auto">
            <div className="w-[40%] mt-4 ml-auto mr-auto flex items-center justify-center bg-black/25 h-9 rounded-3xl ">
              <p className="text-black text-[16px] font-bold">Settings</p>
            </div>
            <div className="w-[96%] mt-2 py-2 px-2 h-auto mb-20 rounded-md bg-black/0">
            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
              
              <div className="bg-white/0 border-b-black/5 border-t-black/5 border border-white/0 w-[99%] flex items-center justify-center rounded-sm h-[70px]">
                <div className="ml-[5px]   text-black  mr-auto px-3">
                  <p className="text-[19] font-bold mb-1.5">Show Recovery Phrases</p>
                </div>
              </div>  
              <div  className="bg-white/0 border-b-black/5 border-t-black/5 border border-white/0 w-[99%] flex items-center justify-center rounded-sm h-[70px]">
                <div className="ml-[5px]   text-black  mr-auto px-3">
                  <p className="text-[19] font-bold mb-1.5">Show Private Key</p>
                </div>
              </div>  
                
            </div>
              
            </div>
          </div>
        </>
      )}
      {isHistory && (
        <>
          <div className="bg-gothic-950/0 mt-1 flex bg-slate-600 mb-2 flex-col items-center justify-center w-[100%] h-auto">
            <div className="w-[40%] mt-4 ml-auto mr-auto flex items-center justify-center bg-black/25 h-9 rounded-3xl ">
              <p className="text-black text-[16px] font-bold">Transactions</p>
            </div>
            <div className="w-[96%] mt-2 py-2 px-2 h-auto mb-20 rounded-md bg-black/0">
            
              {history &&
                history.filter((item) => item.chain === providerName).map((item, i) => (
                  <>
                   <div className="bg-gothic-950/0 mt-4 mb-4 flex items-center justify-center w-[100%] h-auto">
                      <div onClick={() => {
                        setIsTCard(true)
                        setHSender(item.sender)
                        setHIsSend(item.isSend)
                        setHAmount(item.amount)
                        setHReceiver(item.receiver)
                        setHDate(item.created_at)
                        setHHash(item.hash)
                      }} className=" w-[100%] bg-white/60 flex items-center justify-start rounded-full h-[60px]">
                        <div className={`${item.isSend === true ? 'bg-red-600/35' : 'bg-green-500/35'} text-gothic-600/85 w-[41px] flex items-center justify-center h-10 ml-[12px] mr-[12px] rounded-full`}>
                          {item.isSend === true ? <IoArrowUp className="text-black text-xl"/> : <IoArrowDown className="text-black text-xl" />}
                        </div>
                        <div className="ml-1 mt-1 text-black/85 mr-1 px-0">
                        <p className="text-[17px] font-semibold">{`${item.isSend === true ? 'Transfer' : 'Receive'}`}</p>
                          <p className="text-sm mb-1.5">{`${item.isSend === true ? 'to' : 'from'} : ${
                            item.receiver
                          }`}</p>
                        </div>
                        <div className="bg-gothic-600/0 w-[49px] flex items-center justify-center h-12 ml-auto mr-7 rounded-full">
                          <p className={`text-md ${item.isSend === true ? 'text-red-500' : 'text-green-500'}`}>{`${item.isSend === true ? '-' : '+'}${item.amount.toString().slice(0,6)}`}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </>
      )}
      {isWallet && (
        <>
          <div className="bg-gothic-950/0 mt-1 flex  mb-2 flex-col items-center justify-center w-[100%] h-auto">
            <div className="mt-1 mb-10 w-full flex">
             <div onClick={() => setIsChainList(true)} className="bg-white/15 border border-[#448cff]/45 text-white mt-1 rounded-3xl p-1.5 flex ml-auto mr-[45px] w-[51%] h-9">
             <img src='./assets/5426.png' className="mr-1 w-6 h-6 rounded-full"/>
              <div className="mb-0.5">{providerName}</div>
              <MdKeyboardArrowDown className="text-2xl text-[#448cff]/45 ml-auto mr-1 mb-2" />
             </div>
             <div className="w-11 p-2 mr-1.5 flex items-center justify-center rounded-full bg-[#448cff]/45">
                <IoSettings className="" size={28}/>
             </div>
            </div>
            <div className="bg-s-gray-300/0 w-[90%] flex items-center justify-center rounded-3xl h-[120px]">
              <p className="text-5xl font-bold text-white/85">{`$${multiple(
               5,
                600
              )
                .toString()
                .slice(0, 6)}`}</p>
            </div>
            
          </div>
          <div className="bg-gothic-950/0 mt-3 flex items-center justify-center w-[100%] h-auto">
            <div className="bg-gothic-300/0 w-[90%] flex items-center justify-center rounded-3xl h-[100px]">
              <div
               
                className="text-xl bg-white/10  border-[#448cff]/25 flex flex-col items-center justify-center rounded-3xl h-20 w-20 ml-auto mr-auto  text-white/60"
              >
                <IoIosSend className="text-3xl font-bold text-[#448cff]/55" />
                <p className="text-sm mt-2.5 text-[#448cff]/55 font-light ">Send</p>
              </div>
              <div
               
                className="text-3xl  bg-white/10 flex flex-col items-center justify-center rounded-3xl h-20 w-20 ml-auto mr-auto  text-white/60"
              >
                <IoAdd className="text-3xl font-bold text-[#448cff]/55" />
                <p className="text-sm mt-2.5 text-[#448cff]/55 font-light ">
                  Receive
                </p>
              </div>
              <div
              
              className="text-xl  bg-white/10 flex flex-col items-center justify-center rounded-3xl h-20 w-20 ml-auto mr-auto  text-white/60">
                <MdSwapHoriz className="text-3xl text-[#448cff]/55" />
                <p className="text-sm mt-2.5 text-[#448cff]/55 font-light ">Swap</p>
              </div>
            </div>
          </div>
          {/**<div className="bg-gothic-950/0 mt-16 flex items-center justify-center w-[100%] h-auto">
            <div className="bg-gothic-300/5 w-[90%] flex items-center justify-center rounded-3xl h-[100px]">
                <div className="bg-gothic-600/85 w-9 flex items-center justify-center h-9 ml-[40px] mr-[20px] rounded-full">
                    <IoKey className="text-white/90 text-2xl" />
                </div>
                <div className="ml-[10px] mr-auto px-3">
                    <p className="text-sm">BackUp Your Seed Phrases</p>
                </div>
            </div>
    </div> **/}
          <div className="bg-gothic-950/0 mt-8 flex flex-col items-center justify-center w-[100%] h-auto">
            <div className="bg-white/10 w-[90%] mb-3 flex items-center justify-center rounded-3xl h-[70px]">
              <div className="bg-gothic-600/85 w-12 flex items-center justify-center h-12 ml-[23px] mr-[10px] rounded-full">
                <img
                  src={"./assets/5426.png"}
                  className="text-white/90 w-full h-full rounded-full text-2xl"
                />
              </div>
              <div className="ml-[5px] text-white/85 mr-auto px-3">
                <p className="text-sm font-bold mb-1">{'Solana'}</p>
                <p className="text-sm">{`${ethBalance} SOL`}</p>
              </div>
              <div className="ml-[10px]  text-white/85 mr-4 px-3">
                <p className="text-[15px] mb-1">
                 {`$${ethPrice.toString().slice(0, 4)}`}
                </p>
                <p className="text-[15px] ">
                {`$${multiple(ethPrice,5).toString().slice(0,4)}`}
                </p>
              </div>
            </div>
            {
              token1 && token1.map((token,i) => (
                <>
                <div className="bg-white/10 w-[90%] mb-3 flex items-center justify-center rounded-3xl h-[70px]">
              <div className="bg-gothic-600/85 w-12 flex items-center justify-center h-12 ml-[23px] mr-[10px] rounded-full">
                <img
                  src={"./assets/5426.png"}
                  className="text-white/90 w-full h-full rounded-full text-2xl"
                />
              </div>
              <div className="ml-[5px] text-white/85 mr-auto px-3">
                <p className="text-sm font-bold mb-1">{'Solana'}</p>
                <p className="text-sm">{`${ethPrice} SOL`}</p>
              </div>
              <div className="ml-[10px]  text-white/85 mr-4 px-3">
                <p className="text-[15px] mb-1">
                 {`$${ethBalance.toString().slice(0, 4)}`}
                </p>
                <p className="text-[15px] ">
                {`$${ethBalance.toString().slice(0, 4)}`}
                </p>
              </div>
            </div>
                </>
              ))
            }
          <div 
                
                className={`w-[205px] ${tokens?.length > 0 ? 'mt-[30px]' : 'mt-[80px]'}   ${tokens?.length > 0 ? 'mb-[100px]' : 'mb-[30px]'}   ml-auto mr-auto py-1 mb-5 px-3 flex  items-center justify-center bg-black/80 rounded-full h-11`}
              >
                <p className="text-white font-light text-[14px] ml-auto mr-auto ">
                  Add Custom token
                </p>
              </div>
          </div>
          
        </>
      )}
      <div className="mt-auto mb-auto">
        <Menu />
      </div>
      {isChainList && <ChainSelector/>} 
      

      {/**
       * 
       * 
      
      {isTokenInfo && <TokenInfoModal/>}
      {isFaucet && <FaucetModal/>}
      {isChainList && <ChainSelector/>}
      {isPrivate && <PkeyModal />}
      {isPhrase && <PhraseModal />}
      {isTokenModal && <TokenModal />}
      {isTCard && <TransactionModal />}
      {isSend && <SendModal />}
      {welcome && <Welcome />}
      {isReceive && <ReceiveModal />}

       */}
    </div>
  );
};
