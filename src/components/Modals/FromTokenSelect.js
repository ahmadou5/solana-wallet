import { GlobalContext } from "@/context/AppContext"
//import { ethers } from "ethers"
import { assets } from "@/Utils/format"
//import { chains } from "@/Utils/format"

export const FromTokenSelector = ({handleFrom}) => {
    const { setWelcome, userName, providerURL, isTokenSelect, fromName,setFromName,  toLogo,
        setToLogo,
        fromLogo,
        setFromLogo, isFromTokenSelect, setIsFromTokenSelect, toName,seToName, setCluster,setProviderURL,isSwap,setIsSwap,providerImg,setProviderImg ,userAddress, scan,setScan, providerTick,setProviderTick,providerName,setProviderName,isChainList,setIsChainList } = GlobalContext()
    
    
    return(
    <div className="inset-0 fixed bg-black/95 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px- justify-center">
            <div className="h-auto ml-auto mr-auto py-2 px-2 w-[90%] border border-[#448cff]/60 bg-white/35 rounded-xl">
            <div>
                <div onClick={() => setIsFromTokenSelect(false)} className="w-16 rounded-xl text-white font-light flex items-center justify-center h-8 bg-white/95">
                    <p className="text-black text-[14]">esc</p>
                </div>
            </div>
            <div className=" mt-2 bg-black/20 text-black border  border-[#448cff]/60  flex items-center justify-center p-1 rounded-xl h-8 w-[45%] ml-auto mr-auto">
                <p>From Token</p>
            </div>
            <div className="mt-3 ml-auto px-0.5 py-2 mr-auto flex flex-col items-center justify-center text-center">
                {
                    assets && assets.map((item,i) => (
                        <>
                        <div onClick={() => {
                            handleFrom(item.name)
                            setFromName(item.name);
                            setFromLogo(item.logo)
                            setIsFromTokenSelect(false)
                        }} key={i} className="w-[97%] mt-1 mb-1 bg-black/10 border  border-[#448cff]/60 flex rounded-2xl h-18">
                <div className="h-[80%] w-[26%] py-3 px-3">
                <img src={item.logo} className="h-10 rounded-full mt-0 w-10"/>
                </div>
                <div className="h-[100%] text-black ml-0 mr-2 font-light  flex items-center justify-center mt-1 w-[60%] py-4 px-1">
                 <div>{item.name}</div>
                </div>
                </div>
                        </>
                    ))
                }
                
            </div>
            </div>
        </div>
    </div>
    )
}