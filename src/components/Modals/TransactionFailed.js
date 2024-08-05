import { GlobalContext } from "@/context/AppContext"
//import { useGetUserId } from "@/hooks/useGetUserId"

export const FailedTxModal = ({message}) => {
   
    const { setWelcome, userName, setIsSend, isTxFail,setIsTxFail} = GlobalContext()
    return(
    <div className="inset-0 fixed bg-black/95 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] flex items-center px-3 justify-center">
        <div className="h-[100%] mt-[200px] ml-auto mr-auto py-2 px-2 w-[90%] bg-white/0 rounded-xl">
            
            <div className="mt-0 ml-auto mr-auto flex flex-col items-center justify-center text-center">
               
                <div className="w-[200px] mb-5 h-[200px] flex items-center justify-center">
                  <img src="./assets/bad.svg" className="w-[90%] h-[90%]"/>
                </div>
                <div className="w-[90%]  ml-auto mr-auto py-1 px-3 flex  items-center justify-center bg-white/0 rounded-full h-9">
                  <p className="text-white/85 font-light text-[24px] ml-auto mr-auto ">{`Transaction Failed`}</p>
                </div>
                <div className="w-[100%]  ml-auto mr-auto py-1 px-3 flex  mt-12 items-center justify-center bg-white/0 rounded-full h-9">
                 {
                    message
                 }
                </div>
                <div onClick={() => {
                    setIsSend(false)
                    setIsTxFail(false)
                    }} className="w-[245px] mt-[120px]  ml-auto mr-auto py-1 px-3 flex  items-center border border-[#448cff]/60  justify-center text-black bg-white/60 rounded-full h-9">
                  <p>Continue</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}