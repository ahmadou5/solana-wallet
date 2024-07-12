'use client'
import { useEffect, useState } from "react";
import { Keypair, Connection} from '@solana/web3.js'
//import { ethers } from "ethers";
import { IoArrowDown, IoArrowUp, IoKey, IoScan, IoSettings } from "react-icons/io5";
import * as bip39 from 'bip39'
import bs58 from 'bs58'
import { GlobalContext } from "@/context/AppContext";
import { Supabase } from "@/Utils/Supabasedb";
//import { Supabase } from "@/Utils/supabasedb";
//import { useGetUserId } from "@/hooks/useGetUserId";
//import { Loading } from "../Modals/LoadingModal";
//import { SuccessModal } from "../Modals/Success";
//import { ErrorModal } from "../Modals/Error";
//import { ImportModal } from "../Modals/Import";
import { Loading } from "../Loading";
export const Create = () => {
    const [errorMess,setErrorMess] = useState('')
    const [address,setAddress] = useState('');
    const [privKey,setPrivKey] = useState('');
    const [phrase, setPhrase] = useState('')
   // const [isLoading,setIsLoading] = useState(true)
    const {user,setUser,userPkey, isLoading, providerURL, isErrorM,setIsErrorM, isImport,setIsImport, isSuccess,setIsSuccess,setUserPkey, welcome,setWelcome,userAddress,setUserAddress,userMnemonic,setUserMnemonic, setIsAuthenticate, isAuthenticate} = GlobalContext()
    //const userID = useGetUserId()
    //console.log(userID)
    const Provider = 'https://ethereum-sepolia-rpc.publicnode.com'
    const createWallet = async () => {
            const name = user?.initDataUnsafe?.user?.username
            const id = user?.initDataUnsafe?.user?.id
           
            const {data ,error} = await Supabase
            .from('Wallets')
            .insert([{id:id,username:name,address:userWallet.address,privateKey:userWallet.privateKey,phrase:userWallet.mnemonic.phrase}])
            .select()
            if(error) {
                setIsErrorM(true)
                setErrorMess(error.message)
                console.log(error)
            }
            if(data) {
                //alert('data',data)
                setIsSuccess(true)
                //setIsAuthenticate(true)
                
            }
           
    }

    const createSolanaAccount  = async() => {
        try {
            const name = user?.initDataUnsafe?.user?.username
            const id = user?.initDataUnsafe?.user?.id
            const mnemonic = bip39.generateMnemonic()
            //console.log(mnemonic)
            const seed = await bip39.mnemonicToSeed(mnemonic)
            //console.log(seed,'seed')
            const seedBytes = seed.slice(0,32)
            const account = await Keypair.fromSeed(seedBytes);
            const base58 = bs58.encode(account.secretKey)
            //console.log('public',account.publicKey.toString());
            //console.log('private', base58)
           

            
            const { data, error} = await Supabase
            .from('SolWallet')
            .insert([{id:id,username:name,userAddress:account.publicKey,privateKey:base58,phrase:mnemonic}])
            .select()
            if(error) {
                throw error
            }
            if(data) {
                console.log(data,'data')
                alert('created')
            }
        } catch (error) {
            console.log(error)
        }
    } 

    const importWallet = async () => {
        //const phrase = `${} `
        const name = user?.initDataUnsafe?.user?.username
        const id = user?.initDataUnsafe?.user?.id
       
        const {data ,error} = await Supabase
        .from('Wallets')
        .insert([{id:'gfhfh',username:'fddds',address:userWallet.address,privateKey:userWallet.privateKey,phrase:userWallet.mnemonic.phrase}])
        .select()
        if(error) {
            setIsErrorM(true)
            setErrorMess(error.message)
            console.log(error)
        }
        if(data) {
            //alert('data',data)
            setIsSuccess(true)
            //setIsAuthenticate(true)
            
        }
    }
    
    useEffect(() => {
        //console.log(Supabase)
        console.log('useTelegram')
        function initTg() {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        console.log('Telegram WebApp is set');
        const tgData = window.Telegram.WebApp
        setUser(tgData);
        } else {
        console.log('Telegram WebApp is undefined, retrying…');
        console.log(user)
        setTimeout(initTg, 500);
        }
        }
        initTg();
      }, []);
   
    return(
    <div className="w-[100%] py-2 px-1 h-auto bg-red-400/0">
        <div className="bg-gothic-950/0 mt-[80px] mb-[30px] flex items-center justify-center w-[100%] h-auto">
            <img src="./assets/show.png" className="w-[320px] h-[320px]" />
        </div>
        <div className="bg-gothic-950/0 mt-3 mb-8 flex items-center justify-center w-[100%] h-auto">
            <div className="bg-s-gray-300/0 w-[90%] px-10 flex flex-col items-center justify-center rounded-3xl h-[140px]">
                <p className="text-2xl font-bold mb-6 text-gothic-950/85">{`inFuse Wallet`}</p>
                <p className="text-[15px] font-extrabold text-center mt-4 text-gothic-950/85">{`Hi ${user?.initDataUnsafe?.user?.username} Create a new wallet or import an existing one`}</p>
            </div>
        </div>
        <div className="bg-s-gray-300/0 w-[95%] ml-auto mr-auto mt-5 mb-20 px-2 flex flex-col items-center justify-center rounded-2xl h-auto">
                <button onClick={() => createSolanaAccount()} className="text-[15px]  bg-white/95 border  border-[#448cff]/60 w-[310px] mb-2 h-12 text-gothic-950 rounded-xl text-black font-extrabold ">{`Create New Wallet`}</button>
             {/**  <button onClick={() => setIsImport(true)} className="text-[15px] bg-gothic-950 w-[310px] text-s-gray-200 mt-1 h-12 rounded-xl font-extrabold ">{`Import Existing Wallet`}</button>*/  }
        </div>
      {/**
       *   {isLoading && <Loading/>}
        {isSuccess && <SuccessModal />}
        {isErrorM && <ErrorModal message={errorMess}/>}
        {isImport && <ImportModal />}

       */}
        {isLoading && <Loading/>}
    </div>
)
}