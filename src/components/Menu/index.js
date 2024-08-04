"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoFlash, IoHome, IoSettings, IoWallet } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import { MdSwapHoriz } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { GlobalContext } from "@/context/AppContext";
import { HistorySvg } from "./History";




export const Menu = () => {
   
   const {
    isWallet,
    isSwap,setIsSwap,
    isTokens,
    isHistory,
    setIsHistory,
    setIsTokens,
    setIsWallet,
   } = GlobalContext()
    const router = useRouter()
    const handleCopy = (value) => {
      navigator.clipboard.writeText(value).then(
        () => {
          // Successfully copied to clipboard
          setCopy(true);
          setTimeout(  () => 
            setCopy(false),
            1000)
          alert('address copied to clip Board')
        },
        (err) => {
          // Failed to copy to clipboard
          console.error('Could not copy address: ', err);
        }
      );
    }
    const handleCopy2 = (value) => {
      navigator.clipboard.writeText(value).then(
        () => {
          // Successfully copied to clipboard
          console.log('Address copied to clipboard');
          alert('address copied to clip Board')
          
        },
        (err) => {
          // Failed to copy to clipboard
          console.error('Could not copy address: ', err);
        }
      );
    }
    return (
      <>
        {/**for mobile view **/}
        
        {/**for desktop view **/}
        <div
          style={{ "backdrop-filter": "blur(12px)" }}
          className=" w-[93%] ml-auto mr-auto rounded-full py-1 px-1.5 z-100 bg-white/5 mb-4  fixed inset-x-0 bottom-1 flex justify-center items-center"
        >
          <div className="lg:py-2.5 py-1.5 lg:px-2.5 px-1.5  mt-auto mb-auto ml-auto mr-auto w-[98%] flex flex-row  h-[90%]">
            <div onClick={() => {
              setIsHistory(false)
              setIsSwap(false)
              setIsTokens(false)
              setIsWallet(true)
            }} className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
                <IoWallet size={28} className={`${ isWallet ? 'text-[#448cff]' : 'text-gothic-600/85'}`} />
                {isWallet && <p className={`font-light ${isWallet ? 'text-[#448cff]' : 'text-gothic-200'} ${isWallet && 'mt-1'} text-[12px]`}>Wallet</p>}
            </div>
            
            <div onClick={() => {
              setIsHistory(false)
              setIsSwap(true)
              setIsWallet(false)
              setIsTokens(false)
            }} className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
                <IoFlash size={28} className={`${ isSwap ? 'text-[#448cff]' : 'text-gothic-600/85'}`} />
                {isSwap && <p className={`font-light ${isSwap ? 'text-[#448cff]' : 'text-gothic-200'} ${isSwap && 'mt-1'} text-[12px]`}>Activity</p>}
            </div>
            <div onClick={() => {
              setIsHistory(true)
              setIsSwap(false)
              setIsWallet(false)
              setIsTokens(false)
            }}
             className={`h-12 ml-auto mr-auto w-[30%] bg-white/0 flex flex-col items-center justify-center`}>
                <HistorySvg isColor={isHistory}/>
                {isHistory && <p className={`font-light ${isHistory ? 'text-[#448cff]' : 'text-gothic-200'} ${isHistory && 'mt-1'} text-[12px]`}>History</p>}
            </div>
          </div>          
        </div>
      </>
    );
  };