"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  VersionedTransaction,
  publicKey,
} from "@solana/web3.js";
import fetch from "cross-fetch";
import * as bip39 from "bip39";
//import { Wallet } from "@project-serum/anchor";
import bs58 from "bs58";
import { GlobalContext } from "@/context/AppContext";
import { assets } from "@/Utils/format";
import { useState, useCallback, useEffect } from "react";
import { FromTokenSelector } from "../Modals/FromTokenSelect";
import { ToTokenSelector } from "../Modals/ToTokenSelect";

// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.

export const SwapView = () => {
  const [fromAsset, setFromAsset] = useState(assets[0]);
  const [toAsset, setToAsset] = useState(assets[1]);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [quoteResponse, setQuoteResponse] = useState(null);

  
  const { userPkey, userMnemonic,fromName,setFromName, toName,seToName , setIsToTokenSelect,
    setIsFromTokenSelect,isToTokenSelect, isFromTokenSelect } = GlobalContext();

  const connection = new Connection(clusterApiUrl("devnet"));

  const handleFromAssetChange = async (event) => {
    setFromAsset(
      assets.find((asset) => asset.name === fromName) || assets[1]
    );
  };

  const handleToAssetChange = (event) => {
    setToAsset(
      assets.find((asset) => asset.name === toName) || assets[0]
    );
  };

  const handleFromValueChange = (event) => {
    setFromAmount(event.target.value);
  };
  

  const getQuote = async (currentAmount) => {
    if (currentAmount || currentAmount <= 0) {
      console.error("Invalid fromAmount value:", currentAmount);
      return;
    }

    const quote = await (
      await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${
          fromAsset.mint
        }&outputMint=${toAsset.mint}&amount=${
          currentAmount * Math.pow(10, fromAsset.decimals)
        }&slippage=0.5`
      )
    ).json();

    if (quote && quote.outAmount) {
      const outAmountNumber = quote.outAmount / Math.pow(10, toAsset.decimals);
      setToAmount(outAmountNumber);
    }

    setQuoteResponse(quote);
  };

  const debounce = ({func, wait}) => {
    let timeout;
  
    return () => {
      const later = () => {
        clearTimeout(timeout);
        func();
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  const debounceQuoteCall = useCallback(debounce(getQuote, 500), []);

  useEffect(() => {
    debounceQuoteCall(fromAmount);
  }, [fromAmount, debounceQuoteCall]);

  const signAndSendTransaction = async () => {
    const seed = await bip39.mnemonicToSeed(userMnemonic);
    console.log(seed, "seed");
    const seedBytes = seed.slice(0, 32);
    const account = await Keypair.fromSeed(seedBytes);

    // get serialized transactions for the swap
    const { swapTransaction } = await (
      await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: new publicKey(account.publicKey?.toString()),
          wrapAndUnwrapSol: true,
          // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
          // feeAccount: "fee_account_public_key"
        }),
      })
    ).json();
    try {
      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const signedTransaction = await account.signTransaction(transaction);

      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed"
      );

      console.log(`https://solscan.io/tx/${txid}`);
    } catch (error) {
      console.error("Error signing or sending the transaction:", error);
    }
  };
  return (
    <div className=" mt-1 flex  mb-2 flex-col items-center justify-center w-[100%] h-auto">
      <div className="w-[40%] mt-4 mb-2 ml-auto mr-auto flex items-center justify-center bg-black/25 h-9 rounded-3xl ">
        <p className="text-white text-[16px] font-bold">Swap</p>
      </div>
      <div className="w-[100%] mt-6 flex items-center justify-center">
        <div className="w-[98%] bg-white/10 px-2 flex flex-col border border-[#448cff]/60 justify-center items-center rounded-xl h-[370px]">
          <div className="w-[99%] py-2 px-1 h-[40%] bg-black/0">
            <p className="mb-2 mt-2 mr-auto ml-3">You are Paying</p>
            <div className="w-[100%] ml-auto mr-auto h-16 py-2 px-1 flex rounded-2xl bg-black/15">
              <div
                onClick={() => setIsFromTokenSelect(true)}
                className="bg-white/15 border border-[#448cff]/45 text-white mt-1 rounded-3xl p-1.5 flex ml-3 mr-[45px] w-[40%] h-9"
              >
                <img
                  src="./assets/5426.png"
                  className="mr-1 w-6 h-6 rounded-full"
                />
                <div className="mb-0.5">{fromAsset.name}</div>
                <MdKeyboardArrowDown className="text-2xl text-[#448cff]/45 ml-auto mr-1 mb-2" />
              </div>
              <div className="w-[55%] py-1.5 flex items-center justify-center bg-slate-50/0">
                <input
                  className="w-[90%] h-[90%] ml-auto mr-auto text-[19px] bg-transparent outline-none"
                  onChange={handleFromValueChange}
                  type="text"
                  placeholder="0.00"
                 
                />
              </div>
            </div>
          </div>
          <div className="w-[99%] flex flex-col py-2 px-1 h-[60%] bg-black/0">
            <p className="mb-2 mt-2 mr-auto ml-3">To Receive</p>
            <div className="w-[100%] ml-auto mr-auto h-16 py-2 px-1 flex rounded-2xl bg-black/15">
              <div
                onClick={() => setIsToTokenSelect(true)}
                className="bg-white/15 border border-[#448cff]/45 text-white mt-1 rounded-3xl p-1.5 flex ml-3 mr-[45px] w-[40%] h-9"
              >
                <img
                  src="./assets/5426.png"
                  className="mr-1 w-6 h-6 rounded-full"
                />
                <div className="mb-0.5">{toAsset.name}</div>
                <MdKeyboardArrowDown className="text-2xl text-[#448cff]/45 ml-auto mr-1 mb-2" />
              </div>
              <div className="w-[55%] py-1.5 flex items-center justify-center bg-slate-50/0">
                <input
                  className="w-[90%] h-[90%] ml-auto mr-auto text-[19px] bg-transparent outline-none"
                  value={toAmount}
                  type="text"
                  placeholder="0.00"
                  title="Enter Number"
                />
              </div>
            </div>
            <div className="mt-8 w-[98%] ml-auto mr-auto">
               <button className="w-[98%] ml-auto mr-auto py-1 border border-[#448cff]/60 rounded-xl bg-black/90 h-14">Swap</button>
            </div>
          </div>
          
        </div>
      </div>
      <div className="w-[98%] bg-white/10 px-2 flex mt-2 flex-col border border-[#448cff]/60 justify-center items-center rounded-xl h-[80px]">
      empty
      </div>
      {isFromTokenSelect && <FromTokenSelector handleFrom={handleFromAssetChange}/>}
      {isToTokenSelect && <ToTokenSelector handleTo={handleToAssetChange} />}
    </div>
  );
};
