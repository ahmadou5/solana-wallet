'use client'
import { createContext, useContext, useState } from "react";


const MiniContext = createContext()


export const MiniContextProvider = ({children}) => {
    const [isTokenInfo,setIsTokenInfo] = useState(true)
    const [isFaucet,setIsFaucet] = useState(false);
    const [scan,setScan] = useState('solscan.io')
    const [providerURL,setProviderURL] = useState('https://api.mainnet-beta.solana.com')
    const [providerName,setProviderName] = useState('Devnet')
    const [providerTick,setProviderTick] = useState('SOL')
    const [providerImg,setProviderImg] = useState('./assets/5426.png')
    const [cluster,setCluster] = useState('devnet');
    const [isChainList,setIsChainList] = useState(false)
    const [history, setHistory] = useState(null);
    const [tokens,setTokens] = useState(null)
    const [isPrivate,setIsPrivate] = useState(false)
    const [isPhrase,setIsPhrase] = useState(false)
    const [tokenAddress,setTokenAddress] = useState('')
    const [tokenName,setTokenName] = useState('')
    const [tokenTicker,setTokenTicker] = useState('')
    const [tokenDecimals,setTokenDecimals] = useState(18)
    const [isTokenModal,setIsTokenModal] = useState(false)
    const [hReceiver,setHReceiver] = useState('')
    const [hSender,setHSender] = useState('')
    const [hHash,setHHash] = useState('')
    const [hIsSend,setHIsSend] = useState(false)
    const [hDate,setHDate] = useState(null)
    const [hAmount,setHAmount] = useState(0)
    const [isTCard,setIsTCard] = useState(false)
    const [isWallet,setIsWallet] = useState(true)
    const [isTokens,setIsTokens] = useState(false)
    const [isHistory,setIsHistory] = useState(false)
    const [isSwap,setIsSwap] = useState(false)
    const [one,setOne] = useState('')
    const [two,setTwo] = useState('')
    const [three,setThree] = useState('')
    const [four,setFour] = useState('')
    const [five,setFive] = useState('')
    const [six,setSix] = useState('')
    const [seven,setSeven] = useState('')
    const [eight,setEight] = useState('')
    const [nine,setNine] = useState('')
    const [ten,setTen] = useState('')
    const [eleven,setEleven] = useState('')
    const [twelve,setTwelve] = useState('')
    const [isImport,setIsImport] = useState(false)
    const [isTxSuccess,setIsTxSuccess] = useState(false)
    const [isTxFail,setIsTxFail] = useState(false)
    const [isErrorM,setIsErrorM] = useState(false)
    const [isSuccess,setIsSuccess] = useState(false)
    const [ethBalance,setEthBalance] = useState(0)
    const [ethPrice,setEthPrice] = useState(0)
    const [isSend,setIsSend] = useState(false)
    const [isReceive,setIsReceive] = useState(false)
    const [isScan,setIsScan] = useState(false)
    const [isAuthenticate,setIsAuthenticate] = useState(false)
    const [user,setUser ] = useState(null);
    const [userAddress,setUserAddress] = useState('')
    const [userName, setUserName] = useState('')
    const [userPkey,setUserPkey] = useState('')
    const [userMnemonic,setUserMnemonic] = useState(null)
    const [welcome,setWelcome] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [fromName,setFromName] = useState('SOL')
    const [toName,setToName] = useState('USDC')
    const [toMint,setToMint] = useState('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    const [fromMint,setFromMint] = useState('So11111111111111111111111111111111111111112')
    const [toLogo,setToLogo] = useState('https://statics.solscan.io/cdn/imgs/s60?ref=https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67')
    const [fromLogo,setFromLogo] = useState('https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f536f31313131313131313131313131313131313131313131313131313131313131313131313131313131322f6c6f676f2e706e67')
    const [fromDec,setFromDec] = useState(0)
    const [toDec,setToDec] = useState(0)
    const [isFromTokenSelect, setIsFromTokenSelect] = useState(false)
    const [isToTokenSelect, setIsToTokenSelect] = useState(false)
    const [isSwapModal,setIsSwapModal] = useState(true);
   const value = {
    user,
    userAddress,
    userPkey,
    userMnemonic,
    isAuthenticate,
    isSend,
    isReceive,
    isScan,
    welcome,
    isLoading,
    userName, 
    ethPrice,
    ethBalance,
    isSuccess,
    isErrorM,
    isTxSuccess,
    isTxFail,
    isImport,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    isWallet,
    isTokens,
    isHistory,
    isTCard,
    hReceiver,
    hSender,
    hIsSend,
    hAmount,
    hDate,
    hHash,
    tokenAddress,
    tokenName,
    tokenTicker,
    tokenDecimals,
    isTokenModal,
    isPrivate,
    isPhrase,
    tokens,
    history, 
    providerURL,
    providerImg,
    isChainList,
    providerName,
    providerTick,
    scan,
    isFaucet,
    isTokenInfo,
    isSwap,
    cluster,
    fromName,
    toName,
    isFromTokenSelect, 
    isToTokenSelect, 
    isSwapModal,
    toLogo,
    setToLogo,
    toMint,
    fromMint,
    fromDec,
    setFromDec,
    setFromMint,
    setToMint,
    toDec,
    setToDec,
    fromLogo,
    setFromLogo,
    setIsSwapModal,
    setIsToTokenSelect,
    setIsFromTokenSelect,
    setToName,
    setFromName,
    setCluster,
    setIsSwap,
    setIsTokenInfo,
    setIsFaucet,
    setScan,
    setProviderTick,
    setProviderName,
    setIsChainList,
    setProviderImg,
    setProviderURL,
    setHistory,
    setTokens,
    setIsPhrase,
    setIsPrivate,
    setIsTokenModal,
    setTokenDecimals,
    setTokenTicker,
    setTokenName,
    setTokenAddress,
    setHHash,
    setHDate,
    setHAmount,
    setHIsSend,
    setHSender,
    setHReceiver,
    setIsTCard,
    setIsHistory,
    setIsTokens,
    setIsWallet,
    setTwelve,
    setEleven,
    setTen,
    setNine,
    setEight,
    setSeven,
    setSix,
    setFive,
    setFour,
    setThree,
    setTwo,
    setOne,
    setIsImport,
    setIsTxFail,
    setIsTxSuccess,
    setIsErrorM,
    setIsSuccess,
    setEthBalance,
    setEthPrice,
    setUserName,
    setIsLoading,
    setWelcome,
    setIsScan,
    setIsReceive,
    setIsSend,
    setIsAuthenticate,
    setUserMnemonic,
    setUserPkey,
    setUserAddress,
    setUser
   }
   return(
   <MiniContext.Provider value={value}>
    {children}
   </MiniContext.Provider>
   )
}

export const GlobalContext = () => useContext(MiniContext)
