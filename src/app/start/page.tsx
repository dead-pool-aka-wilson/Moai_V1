import Image from "next/image";
import { Page } from "../_components";

export default function Start() {
  return (
    <Page>
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
      <div className="w-full flex-col justify-between items-center uppercase">
        <div className="px-[20px] py-[14px] bg-gray-300 w-full text-center font-bold rounded-full mb-[20px]">
          import secret key
        </div>
        <div className="px-[20px] py-[14px] bg-purple-600 text-white w-full text-center font-bold rounded-full">
          create new key
        </div>
      </div>
    </Page>
  );
}
