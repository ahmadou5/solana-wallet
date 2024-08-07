"use client";
import { GlobalContext } from "@/context/AppContext";
import { useState } from "react";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  Connection,
  clusterApiUrl,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  Keypair,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { TransactionSuccessModal } from "./TransactionSuccess";
import { formatAddress } from "@/Utils/format";
//import { c formatAddress } from "@/Utils/format"
//import { ethers, parseUnits } from "ethers"
//import { TransactionSuccessModal } from "./TransactionSuccess";
//import { FailedTxModal } from "./TransactionFailed"
//import { Supabase } from "@/Utils/supabasedb"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpinningCircles } from "react-loading-icons";
import { Supabase } from "@/Utils/Supabasedb";
import { FailedTxModal } from "./TransactionFailed";
import * as bip39 from "bip39";
import bs58 from "bs58";
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
  const [preview,setPreview] = useState(false)
  const [receiveAddress, setReceiveAddress] = useState("");
  const [comment, setComment] = useState("");
  const [failedcomment, setFailedComment] = useState("");
  const [amount, setAmount] = useState(0);

  const alertify = toast("Address Copied!!!");
  const multiple = (x, y) => {
    return x * y;
  };
  const id = user?.initDataUnsafe?.user?.id;

  const handleSendSol = async () => {
    setIsLoading(true);
    try {
      const seed = await bip39.mnemonicToSeed(userMnemonic);
      //console.log(seed,'seed')
      const seedBytes = seed.slice(0, 32);
      const account = await Keypair.fromSeed(seedBytes);
      const connection = new Connection(clusterApiUrl(cluster), "confirmed");

      const blockhash = await connection
        .getLatestBlockhash()
        .then((res) => res.blockhash);

      const instruction = [
        SystemProgram.transfer({
          fromPubkey: new PublicKey(userAddress),
          toPubkey: new PublicKey(receiveAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        }),
      ];

      const messageV0 = new TransactionMessage({
        payerKey: new PublicKey(account.publicKey),
        recentBlockhash: blockhash,
        instructions: instruction,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);

      

      transaction.sign([account]);

      const txid = await connection.sendTransaction(transaction);
      console.log(txid);

      await connection.confirmTransaction(txid, "confirmed");

      console.log("trx confirnm", txid);
      setComment(txid);
      setIsTxSuccess(true);
      setIsLoading(false);

      const { data, error } = await Supabase.from("SolHistory")
        .insert([
          {
            id: id,
            sender: userAddress,
            receiver: receiveAddress,
            amount: amount,
            hash: txid,
            isSend: true,
            isSpl: false,
            token: "SOL",
            network: cluster,
          },
        ])
        .select();

      if (data) {
        console.log(data, "Transaction data saved to Supabase");
      }

      if (error) {
        console.error(error, "Error saving transaction to Supabase");
      }
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
              <p className="text-[19px] text-white font-light">{`to: ${formatAddress(
                receiveAddress
              )}`}</p>
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
                        setPreview(true);
                      }
                    }}
                    className="outline-none bg-transparent w-[100%] h-[100%] text-white  py-2 px-4"
                  >
                    {/** */}{" "}
                    {loading ? (
                      <SpinningCircles className="ml-auto mr-auto h-7 w-7" />
                    ) : (
                      "Confirm"
                    )}
                  </button>
                </div>
              </div>
              { preview && (
                <>
                <div className="inset-0 fixed bg-black/95 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px-3 justify-center">
            <div className="h-[416px] ml-auto mr-auto py-2 px-2 w-[352px] bg-white/15 rounded-xl">
            
            <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                <p className="text-center text-[#DEEAFC]  font-light text-[18px] mb-3">{`Transaction Details`} </p>
                <div className="flex items-center justify-center">
                  <img src="./assets/sol.png" className="w-[42px] h-[42px]" />
                </div>
                <div className="w-[90%]  ml-auto mr-auto py-1 px-3 flex  items-center justify-center bg-white/0 rounded-full h-9">
                  <p className="text-white/85 font-bold text-[32px] ml-auto mr-auto ">{`${amount} SOL`}</p>
                </div>
                <div className="w-[90%]  ml-auto mr-auto py-1 px-3 flex  items-center justify-center bg-white/0 rounded-full h-9">
                  <p className="text-[#666666] font-bold text-[14px] ml-auto mr-auto ">{`$${multiple(ethPrice, amount).toString().slice(0, 6)}`}</p>
                </div>
                
                <div className="w-[303px]  ml-auto mr-auto py-1 px-3 flex flex-col items-center justify-center bg-white/0 rounded-sm mt-1 mb-3 h-[163px]">
                  <div className="w-[100%] mt-1 mb-1 bg-black/15 h-10 py-2 px-2 rounded-2xl flex">
                    <div className="ml-2 mr-auto">To</div>
                    <div className="ml-auto mr-2">{formatAddress(receiveAddress)}</div>
                  </div>
                  <div className="w-[100%] mt-1 mb-1 bg-black/15 h-10 py-2 px-2 rounded-2xl flex">
                    <div className="ml-2 mr-auto">Network</div>
                    <div className="ml-auto mr-2">Solana</div>
                  </div>
                  <div className="w-[100%] mt-1 mb-1 bg-black/15 h-10 py-2 px-2 rounded-2xl flex">
                    <div className="ml-2 mr-auto">Fee</div>
                    <div className="ml-auto mr-2">0.0003</div>
                  </div>
                  <div className="w-[100%] bg-white h-0.5/2"></div>
                </div>
                <div className="flex w-[100%]">
                <div onClick={() => {
                    //setIsSend(false)
                    setPreview(false)
                    }} className="w-[105px] mt-1  ml-auto mr-auto py-1 px-3 flex  items-center border border-[#448cff]/60  justify-center text-white bg-black/90 rounded-full h-9">
                  <p>Cancel</p>
                </div>
               
                <div className="w-[105px] mt-1  ml-auto mr-auto py-1 px-3 flex  items-center border border-[#448cff]/60  justify-center text-white bg-black/90 rounded-full h-9">
                  <button
                    onClick={() => {
                      if (receiveAddress !== "" && amount > 0) {
                        handleSendSol();
                        //setIsTxSuccess(true)
                      }
                    }}
                    className="outline-none bg-transparent w-[100%] h-[100%] text-white  py-0 px-4"
                  >
                    {/** */}{" "}
                    {loading ? (
                      <SpinningCircles className="ml-auto mr-auto h-5 w-5" />
                    ) : (
                      "Sign"
                    )}
                  </button>
                </div>
                </div>
               
            </div>
            </div>
        </div>
    </div>
                </>
                )}
              {isTxSuccess && (
                <TransactionSuccessModal hash={comment} amount={amount} />
              )}
              {isTxFail && <FailedTxModal message={failedcomment} />}
            </div>
          </div>
        ) : (
          <div className="mt-3 px-1 py-3 bg-red-600/0 h-[85%] flex flex-col rounded-xl w-[100%] ml-auto mr-auto">
            <div className="w-[100%] bg-white/0 px-2 flex flex-col border mt-5 border-[#448cff]/0 justify-center items-center rounded-xl h-[370px]">
          <div className="w-[100%] py-2 px-0 h-[40%] bg-black/0">
            <div className="flex">
            <p className="mb-3 mt-2 mr-auto text-[16px] ml-3">Receiver`s Address</p>
            <div className="mr-4 mt-2">
              {
                receiveAddress.length > 42 &&
                <>
                <img src="./assets/good.svg" />
                </> 
               
              }
            </div>
            </div>
            <div className={`w-[100%] ml-auto mr-auto ${receiveAddress.length > 0 && receiveAddress.length < 42 ? ' border-red-500 border' : 'border-none'} h-16 py-2 px-1 flex rounded-2xl bg-[#1F1F1F]`}>
              
              <div className="w-[99%] py-1.5 flex items-center justify-center bg-slate-50/0">
                <input
                  className={`w-[90%] h-[90%] ml-auto mr-auto text-[18px] bg-transparent outline-none`}
                  onChange={(e) => setReceiveAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                />
              </div>
            </div>
            <div>
              { receiveAddress.length > 0 && receiveAddress.length < 42 ? 
              <>
              <p className="text-[#FC4444] text-[14px]">Invalid address</p>
              </>
               : 
              <></>}
            </div>
          </div>
          <div className="w-[99%] flex flex-col py-2 px-1 h-[60%] bg-black/0">
           
            
            <div className="mt-[190px] w-[98%] ml-auto mr-auto">
              <button onClick={() => {
                if(receiveAddress.length >= 40 ) {
                  setIsConfirmed(true)
                }
              }}  className="w-[98%] ml-auto mr-auto py-1 border border-[#448cff]/60 rounded-xl bg-black/90 h-14">
                Next
              </button>
            </div>
          </div>
        </div>
            
          </div>
        )}
      </div>
    </div>
  );
};
