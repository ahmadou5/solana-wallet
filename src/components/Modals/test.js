import Image from "next/image";
import { useState } from "react";
export const TestModal = () => {
    const [claim,setClaimed] = useState(false)
    return(
    <>
   <div className="inset-0 fixed bg-black/5 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
            <div className="w-[100%] py-4 px-4 bg-black/95 rounded-t-2xl h-auto mt-[80%]">
              <div className="">
               
              </div>
                    <div className="mt-5 ml-auto mr-auto flex flex-col items-center justify-center text-center">
                      <div className="mt-[20%] mb-4 flex items-center justify-center">
                        <p className="text-white font-bold text-[21px]">You claim your daily reward</p>
                      </div>
                      <div className="w-[80%] mb-[40%] ml-auto mr-auto py-1 px-3 flex  items-center justify-center rounded-full mt-[20%] h-9">
                        <p className="text-white/85 text-[28px] font-light ml-auto mr-auto ">{`${1000} FUSE`}</p>
                      </div>
                      <div
                        onClick={() => {
                         
                        }}
                        className="w-[290px] mt-auto mb-[10%]  ml-auto mr-auto py-1 px-3 text-white  flex  items-center justify-center bg-[#046ae2]  rounded-2xl h-11"
                      >
                        <p>{"Close"}</p>
                      </div>
                    </div>
            </div>
          </div>

    </>
)
}