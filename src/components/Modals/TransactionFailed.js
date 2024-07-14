import { GlobalContext } from "@/context/AppContext"
//import { useGetUserId } from "@/hooks/useGetUserId"

export const FailedTxModal = ({message}) => {
   
    const { setWelcome, userName, isTxFail,setIsTxFail} = GlobalContext()
    return(
    <div className="inset-0 fixed bg-black/95 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px-3 justify-center">
            <div className="h-[190px] ml-auto mr-auto py-2 px-2 w-[90%] bg-white/15 rounded-xl">
            
            <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                <p className="text-center text-white font-light text-[20px] mb-4">{`Transaction Failed`} </p>
                <div className="w-[175px] mb-2 ml-auto mr-auto py-1 px-3 flex  items-center justify-center bg-black/0 rounded-full h-9">
                  <p className="text-white/85 font-light ml-auto mr-auto ">{`Error`}</p>
                </div>
                
                <div onClick={() => {
                   
                    setIsTxFail(false)
                    }} className="w-[175px] mt-3  ml-auto mr-auto py-1 px-3 flex  items-center justify-center border border-[#448cff]/60 text-white bg-black/90 rounded-full h-9">
                  <p>Continue</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}