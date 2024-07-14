"use client";
import { GlobalContext } from "@/context/AppContext";
import { useState } from "react";
import { Transaction, SystemProgram, PublicKey, Connection, clusterApiUrl, sendAndConfirmTransaction, LAMPORTS_PER_SOL, Keypair, TransactionMessage, VersionedTransaction, } from "@solana/web3.js";
import { TransactionSuccessModal } from "./TransactionSuccess";
import { formatAddress } from "@/Utils/format";
//import { c formatAddress } from "@/Utils/format"
//import { ethers, parseUnits } from "ethers"
//import { TransactionSuccessModal } from "./TransactionSuccess";
//import { FailedTxModal } from "./TransactionFailed"
//import { Supabase } from "@/Utils/supabasedb"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinningCircles } from "react-loading-icons"
import { Supabase } from "@/Utils/Supabasedb";
import { FailedTxModal } from "./TransactionFailed";
import * as bip39 from 'bip39'
import bs58 from 'bs58'
//import { useGetUserId } from "@/hooks/useGetUserId"
export const SendModal = () => {
  const [loading, setIsLoading] = useState(false);
  const {
    setIsSend,
    userPkey,
    ethPrice,
    cluster,
    ethBalance,
    userAddress,
    userMnemonic,
    providerURL,
    providerName,
    isTxFail,
    setIsTxFail,
    isTxSuccess,
    setIsTxSuccess,
    user,
  } = GlobalContext();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [receiveAddress, setReceiveAddress] = useState("");
  const [comment, setComment] = useState("");
  const [failedcomment, setFailedComment] = useState("");
  const [amount, setAmount] = useState(0);
  
  const alertify = toast('Address Copied!!!')
  const multiple = (x, y) => {
    return x * y;
  };
  const id = user?.initDataUnsafe?.user?.id;
 
  const handleSendSol = async () => {
    setIsLoading(true);
    try {
      const seed = await bip39.mnemonicToSeed(userMnemonic)
            //console.log(seed,'seed')
      const seedBytes = seed.slice(0,32)
      const account = await Keypair.fromSeed(seedBytes);
      const connection = new Connection(clusterApiUrl(cluster),'confirmed')
     
      
      const  blockhash  = await connection.getLatestBlockhash().then(res => res.blockhash)

      const instruction = [
        SystemProgram.transfer({
          fromPubkey: new PublicKey(userAddress),
          toPubkey: new PublicKey(receiveAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        }),
      ]

      const messageV0 = new TransactionMessage({
        payerKey: new PublicKey(account.publicKey),
        recentBlockhash: blockhash,
        instructions: instruction
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0)
      
      transaction.sign([account])

      const txid =  await connection.sendTransaction(transaction);
      console.log(txid)
      
     

     

      console.log('trx confirnm',txid)
      setComment(txid);
      setIsTxSuccess(true);
      setIsLoading(false);

          {/** // Update Supabase history only after successful mining
            const { data, error } = await Supabase.from("NewHistory")
            //.insert([{ id: id, sender: userAddress, receiver: receiveAddress, amount: amount, hash: signature, isSend: true, chain: providerName  }])
            .select();
    
          if (data) {
            console.log(data, "Transaction data saved to Supabase");
          }
    
          if (error) {
            console.error(error, "Error saving transaction to Supabase");
          }
             */} 
      
     
    } catch (error) {
      console.log(error);
      console.error("Error sending sol:", error);
      setFailedComment(error?.message);
      setIsTxSuccess(false); // Set error state if transaction fails
      setIsTxFail(true);
      setIsLoading(false);
    }
  };
 

  return (
    <div className="inset-0 fixed bg-black bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
      <div className="w-[100%] py-4 px-4 bg-white/20 rounded-t-3xl h-auto mt-[90px]">
        <div className="">
          <div
            onClick={() => setIsSend(false)}
            className="w-20 rounded-xl text-black text-xl font-light flex items-center justify-center h-9 bg-white/90"
          >
            <p>esc</p>
          </div>
        </div>
        {isConfirmed ? (
          <div className="mt-8 px-2 py-3 bg-red-600/0 h-[85%] flex flex-col rounded-xl w-[99%] ml-auto mr-auto">
            <div className="w-[100%] h-12 bg-slate-50/0 rounded-xl py-3 px-6">
              <p className="text-[19px] text-white font-light">{`to: ${
                formatAddress(receiveAddress)
              }`}</p>
            </div>
            <div className="w-[98%] mt-4 ml-auto mr-auto h-[230px] py-3 px-2 flex flex-col items-center justify-center border border-[#448cff]/60 rounded-2xl bg-black/40">
              <div className="w-[100%] ml-auto mr-auto text-white rounded-xl  flex  h-16">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="text"
                  className="outline-none bg-transparent text-end text-3xl ml- w-[50%] h-[100%] "
                  value={amount}
                />
                <p className="mt-5 text-xl font-light ml-1 mr-auto">SOL</p>
              </div>
              <div className="bg-black/0 rounded-2xl w-[120px] border border-white h-9">
                <p className="text-white text-center py-1.5">
                  {multiple(ethPrice, amount).toString().slice(0, 6)}
                </p>
              </div>
            </div>
            <div>
              <div className="h-12 w-[100%] flex items-center justify-between py-1 px-2 bg-red-500/0 mt-8">
                <div
                  onClick={() => setAmount(ethBalance.toString().slice(0, 6))}
                  className="bg-black/20 rounded-2xl w-20 h-9"
                >
                  <p className="text-white text-center py-1.5">MAX</p>
                </div>
                <div className="text-s-gray-950">
                  <p>{`Available: ${ethBalance.toString().slice(0, 5)} SOL`}</p>
                </div>
              </div>
              <div className="mt-10 w-[100%] ml-auto mr-auto">
                <div className="w-[98%] ml-auto mr-auto py-1 border border-[#448cff]/60 rounded-xl bg-black/90 h-14">
                  <button
                    onClick={() => {
                      if (receiveAddress !== "" && amount > 0) {
                       handleSendSol()
                      }
                    }}
                    className="outline-none bg-transparent w-[100%] h-[100%] text-white  py-2 px-4"
                  >
                   {
                    /** */
                   } {loading ? (
                      <SpinningCircles className="ml-auto mr-auto h-7 w-7" />
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </div>
              {isTxSuccess && (
                <TransactionSuccessModal hash={comment} amount={amount} />
              )}
              {isTxFail && <FailedTxModal message={failedcomment} />}
            </div>
          </div>
        ) : (
          <div className="mt-3 px-2 py-3 bg-red-600/0 h-[85%] flex flex-col rounded-xl w-[99%] ml-auto mr-auto">
            <div className="mt-7 w-[100%] ml-auto mr-auto">
              <div className="w-[100%] ml-auto mr-auto mb-4 mt-[80px] flex rounded-xl text-[19px] text-black/75 py-3 px-3 items-start  bg-black/0 h-12">
                <p className=" text-white/85 text-xl font-light">Receiver</p>
              </div>
              <div className="w-[100%] mt-5 ml-auto mr-auto rounded-xl text-xl border bg-black/0 border-[#448cff]/45 h-16">
                <input
                  onChange={(e) => setReceiveAddress(e.target.value)}
                  type="text"
                  className="outline-none text-[22px] text-white/60 bg-transparent w-[100%] h-[100%]  py-2 px-4"
                  placeholder="Enter Address"
                />
              </div>
            </div>

            <div className="mt-10 w-[100%] ml-auto mr-auto">
              <div className="w-[99%] ml-auto mr-auto rounded-xl border border-[#448cff]/60 bg-black/90 h-14">
                <button
                  onClick={() => {
                    if (receiveAddress.length < 32) {
                      alert("not Valid PublicKey");
                    } else {
                      setIsConfirmed(true);
                    }
                  }}
                  className="outline-none bg-transparent w-[100%] h-[100%] text-[16px] text-white/95  py-2 px-4"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
