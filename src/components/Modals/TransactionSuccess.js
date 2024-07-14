import { GlobalContext } from "@/context/AppContext"
//import { useGetUserId } from "@/hooks/useGetUserId"
import { formatAddress } from "@/Utils/format"
import Link from "next/link"

export const TransactionSuccessModal = ({hash,amount}) => {
  
    const { setWelcome, userName,isTxSuccess,setIsTxSuccess, setIsSend,scan } = GlobalContext()
    return(
    <div className="inset-0 fixed bg-black/95 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px-3 justify-center">
            <div className="h-[280px] ml-auto mr-auto py-2 px-2 w-[90%] bg-white/15 rounded-xl">
            
            <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                <p className="text-center text-white font-light text-[20px] mb-7">{`Transaction Success 🎉🎉`} </p>
                <div className="w-[175px]  ml-auto mr-auto py-1 px-3 flex  items-center justify-center bg-white/0 rounded-full h-9">
                  <p className="text-white/85 font-light ml-auto mr-auto ">{`You just send ${amount} SOL now`}</p>
                </div>
                <div className="w-[100%]  ml-auto mr-auto py-1 px-3 flex  items-center justify-center bg-white/0 rounded-full h-9">
                  {hash != '' ? <div className="text-white/85 flex font-light ml-auto mr-auto ">
                  <Link href={`https://${scan}/tx/${hash}?cluster=devnet`} target="_blank">
                   <p className="text-white font-light ml-auto mr-auto ">{`Tx Hash: ${formatAddress(hash)}`}</p>
                  </Link> 
                  </div> : 
                    <div>
                      <p>No Hash</p>
                    </div>
                    }
                </div>
                <div onClick={() => {
                    setIsSend(false)
                    setIsTxSuccess(false)
                    }} className="w-[175px] mt-7  ml-auto mr-auto py-1 px-3 flex  items-center border border-[#448cff]/60  justify-center text-white bg-black/90 rounded-full h-9">
                  <p>Continue</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}