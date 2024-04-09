"use client";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import Image from "next/image";
import { useState } from "react";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

export default function MyPage() {
  const [showKey, setShowKey] = useState(false);
  const [key, setKey] = useState("");
  const exportKey = () => {
    setShowKey(!showKey);
    const key = localStorage.getItem("moai-spending");
    if (!key) {
      location.reload();
    }
    setKey(bs58.encode(new Uint8Array(JSON.parse(`[${key}]` || "[]"))));
  };

  const clearKey = () => {
    localStorage.removeItem("moai-spending");
    location.reload();
  };

  return (
    <>
      <div className="grow flex flex-col items-center justify-center">
        <div className="h-[320px] w-[320px] relative">
          {!showKey ? (
            <Image src="/images/moai.png" fill alt="MOAI" />
          ) : (
            <p className="w-full h-full border-2 border-purple-700 text- overflow-x-scroll">
              {key}
            </p>
          )}
        </div>
        <div className="flex mt-[20px] gap-5">
          <p className="text-4xl font-bold text-center text-purple-600 ">
            MOAI
          </p>
          <p className="text-lg">meme of all internet</p>
        </div>
      </div>
      <div className="w-full flex-col justify-between items-center uppercase px-3">
        <div
          onClick={exportKey}
          className="px-[20px] py-[14px] bg-gray-300 w-full text-center font-bold rounded-full mb-[20px]"
        >
          {!showKey ? "export secret key" : "close secret key"}
        </div>
        <button className="w-full ">
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
