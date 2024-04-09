"use client";
import Image from "next/image";
import { Keypair } from "@solana/web3.js";

export default function MyPage() {
  const generateSpendingKey = () => {
    const newKey = Keypair.generate();
    console.log(newKey.secretKey);

    localStorage.setItem("moai-spending", newKey.secretKey.toString());
    location.reload();
  };

  const clearKey = () => {
    localStorage.removeItem("moai-spending");
    location.reload();
  };

  return (
    <>
      <div className="grow flex flex-col items-center justify-center">
        <div className="h-[320px] w-[320px] relative">
          <Image src="/images/moai.png" fill alt="MOAI" />
        </div>
        <div className="flex mt-[20px] gap-5">
          <p className="text-4xl font-bold text-center text-purple-600 ">
            MOAI
          </p>
          <p className="text-lg">meme of all internet</p>
        </div>
      </div>
      <div className="w-full flex-col justify-between items-center uppercase px-3">
        <div className="px-[20px] py-[14px] bg-gray-300 w-full text-center font-bold rounded-full mb-[20px]">
          export secret key
        </div>
        <button onClick={generateSpendingKey} className="w-full ">
          <div
            onClick={clearKey}
            className="px-[20px] py-[14px] bg-purple-600 text-white text-center font-bold rounded-full"
          >
            clear local storage (sign out)
          </div>
        </button>
      </div>
    </>
  );
}
