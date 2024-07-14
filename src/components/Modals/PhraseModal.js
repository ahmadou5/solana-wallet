"use client";
import { GlobalContext } from "@/context/AppContext";
import Link from "next/link";
import { useQRCode } from "next-qrcode";
import { formatAddress, handleCopy } from "@/Utils/format";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PhraseModal = () => {
  const {
    user,
    setIsReceive,
    tokenAddress,
    tokenName,
    tokenTicker,
    tokenDecimals,
    userMnemonic,
    setUserMnemonic,
    setTokenDecimals,
    isPhrase,
    setIsPhrase,
    setTokenTicker,
    setTokenName,
    isTokenModal,
    setIsTokenModal,
    userAddress,
    setTokenAddress,
    setHIsSend,
  } = GlobalContext();
  const id = user?.initDataUnsafe?.user?.id;
  const toastify = () => toast('🦄 Seed Phrase Copied!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
  const uploadTokenData = async () => {
    const { data, error } = await Supabase.from("Tokens")
      .insert([
        {
          id: id,
          userAddress: userAddress,
          tokenAddress: tokenAddress,
          tokenName: tokenName,
          ticker: tokenTicker,
        },
      ])
      .select();
    if (data) {
      console.log(data, "data");
    }
    if (error) {
      console.log(error, "uploading tokens");
    }

  };
  
  const getMnemonicPhrase = (text) => {
    const mnemonic = text
    if (!mnemonic) {
      throw new Error('Missing MNEMONIC_PHRASE environment variable');
    }
    return mnemonic.split(' ');
  };
  const MnemonicList = () => {
    const words = getMnemonicPhrase(userMnemonic);
    const renderWords = () => {
        const firstHalf = words.slice(0, 6);
        const secondHalf = words.slice(6);
    
        return (
          <>
          <div className=" flex items-center justify-center text-[18px] font-light ">
            <ul className="ml-5 mr-auto">
              {firstHalf.map((word, index) => (
                <li key={index}>
                  {index + 1}. {word}
                </li>
              ))}
            </ul>
            <ul className="ml-auto mr-5">
              {secondHalf.map((word, index) => (
                <li key={index}>
                  {index + 7}. {word}
                </li>
              ))}
            </ul>
          </div>
          </>
        );
      };
    return <ul>{renderWords()}</ul>;
  };
  
  return (
    <div className="inset-0 fixed bg-black bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
      <div className="w-[100%] py-4 px-4 bg-white/15 rounded-t-3xl h-auto mt-[70px]">
        <div>
          <div
            onClick={() => setIsPhrase(false)}
            className="w-20 rounded-xl text-xl text-black font-light flex items-center justify-center h-9 bg-white/85"
          >
            <p>esc</p>
          </div>
        </div>
        <div className="mt-1 px-2 py-3 mb-10 bg-red-600/0 h-[85%] flex flex-col rounded-xl w-[99%] ml-auto mr-auto">
          <div className="flex items-center justify-center mt-2">
            <p className="text-white/85 font-extrabold text-xl">Secret Recovery Phrase</p>
          </div>
          <div className="w-[100%] mt-5 text-center bg-black/0 rounded-xl h-20">
            <p className="text-white/75">
               This is the only way you will be able to Recover Your account, Please ensure you save it some where safe!
            </p>
          </div>
          <div className="w-[98%] mt-12 mb-10 ml-auto mr-auto bg-black/75 h-[290px] py-3 px-1 flex flex-col items-center justify-center rounded-2xl">
          <div className="text-white">
           {
            <MnemonicList/>
           }
          </div>
          
          </div>
          <div>
            <div className="mt-4 w-[100%] ml-auto mr-auto">
              <div
                onClick={() => {
                 handleCopy(userMnemonic)
                 toastify()
                 setIsPhrase(false)
                }}
                className="w-[290px] mb-5   ml-auto mr-auto py-3 mt-3 px-3 flex  items-center justify-center bg-black/80 rounded-full h-11"
              >
                <p className="text-white font-light text-[18px] ml-auto mr-auto ">
                  Copy Seed Phrase
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
