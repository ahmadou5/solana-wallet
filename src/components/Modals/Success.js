import { GlobalContext } from "@/context/AppContext"
//import { useGetUserId } from "@/hooks/useGetUserId"

export const SuccessModal = () => {
   
    const { setWelcome, userName, setIsAuthenticate, isSuccess,setIsSuccess } = GlobalContext()
    return(
    <div className="inset-0 fixed bg-black/95 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px-3 justify-center">
            <div className="h-[230px] ml-auto mr-auto py-2 px-2 w-[98%] bg-white/15  border-[#448cff]/60 border rounded-xl">
            
            <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                <p className="text-center text-white font-light text-[25px] mb-6">{`🎉🎉 Congratulations 🎉🎉`} </p>
                <div className="w-[80%] mb-2 ml-auto mr-auto py-1 px-3 flex  items-center justify-center rounded-full h-9">
                  <p className="text-white/85 text-[18px] font-light ml-auto mr-auto ">{'You Just Created a Solana Wallet'}</p>
                </div>
                <div onClick={() => {
                    setIsSuccess(false)
                    setIsAuthenticate(true)
                    
                    }} className="w-[175px] mt-6  ml-auto mr-auto py-1 px-3 text-black border  border-[#448cff]/60 flex  items-center justify-center bg-white/90 rounded-full h-9">
                  <p>Next</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}