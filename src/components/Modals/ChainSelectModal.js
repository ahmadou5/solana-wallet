import { GlobalContext } from "@/context/AppContext"
//import { ethers } from "ethers"
//import { chains } from "@/Utils/format"

export const ChainSelector = () => {
    const { setWelcome, userName, providerURL, setCluster,setProviderURL,isSwap,setIsSwap,providerImg,setProviderImg ,userAddress, scan,setScan, providerTick,setProviderTick,providerName,setProviderName,isChainList,setIsChainList } = GlobalContext()
    
     const chains = [
        {
          name: 'Mainnet',
          providerUrl: 'https://api.mainnet-beta.solana.com',
          imgUrl: './assets/5426.png',
          cluster: 'mainnet-beta',
          Tick: 'solana',
          scan: 'holesky.fraxscan.com',
          faucet: 'https://www.alchemy.com/faucets/ethereum-sepolia'
        },
        {
            name: 'Testnet',
            providerUrl: 'https://api.testnet.solana.com',
            imgUrl: './assets/5426.png',
            Tick: 'Solana',
            cluster: 'testnet',
            scan: 'sepolia.etherscan.io',
            faucet: 'https://www.alchemy.com/faucets/ethereum-sepolia'
        },
        {
            name: 'Devnet',
            providerUrl: 'https://api.devnet.solana.com',
            imgUrl: './assets/5426.png',
            cluster: 'devnet',
            Tick: 'Solana',
            scan: 'sepolia.etherscan.io',
            faucet: 'https://www.alchemy.com/faucets/ethereum-sepolia'
        },
     
        
    ]

      const getUserEthBalance = async () => {
        try {
        
        } catch (error) {
          console.error("Error fetching ETH balance:", error);
          return null; // Handle errors gracefully
        }
      };
    
    return(
    <div className="inset-0 fixed bg-black/95 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px- justify-center">
            <div className="h-auto ml-auto mr-auto py-2 px-2 w-[90%] bg-white/85 rounded-xl">
            <div>
                <div onClick={() => setIsChainList(false)} className="w-16 rounded-xl text-white font-light flex items-center justify-center h-8 bg-white/95">
                    <p className="text-black text-[14]">esc</p>
                </div>
            </div>
            <div className=" mt-2 bg-black/20 text-black border  border-[#448cff]/60  flex items-center justify-center p-1 rounded-xl h-8 w-[45%] ml-auto mr-auto">
                <p>Select Network</p>
            </div>
            <div className="mt-3 ml-auto px-0.5 py-2 mr-auto flex flex-col items-center justify-center text-center">
                {
                    chains && chains.map((item,i) => (
                        <>
                        <div onClick={() => {
                            setIsChainList(false)
                            setCluster(item.cluster)
                            setProviderImg(item.imgUrl)
                            setProviderURL(item.providerUrl)
                            setProviderName(item.name)
                            setProviderTick(item.Tick)
                            setScan(item.scan)

                        }} key={i} className="w-[97%] mt-1 mb-1 bg-black/10 border  border-[#448cff]/60 flex rounded-2xl h-18">
                <div className="h-[80%] w-[26%] py-3 px-3">
                <img src={item.imgUrl} className="h-10 rounded-full mt-0 w-10"/>
                </div>
                <div className="h-[100%] text-black ml-auto mr-2 font-light  mt-1 w-[60%] py-1 px-2">
                 <div className="mt-1">
                 <p className="text-sm">{item.Tick}</p>
                 <p>{item.name}</p>
                 </div>
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