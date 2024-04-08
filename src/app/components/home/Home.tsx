import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="my-3 inline-flex w-full items-start justify-between p-2">
        <div className="grow items-start justify-start gap-2.5 text-center text-xl font-bold text-zinc-950">
          MEME OF ALL INTERNET
        </div>
      </div>
      <div className="flex w-full grow flex-col items-center justify-center gap-2 rounded-3xl bg-gray-200 p-4">
        <div className="flex grow flex-col items-stretch gap-2 justify-evenly">
          <div className="flex items-center justify-between gap-2">
            <div className="rounded-2xl bg-purple-700 px-4 text-2xl text-white">
              {"$TICKER"}
            </div>
            <div className="flex flex-row gap-3">
              <div className="relative h-[24px] w-[24px]">
                <Image src="/icons/twitter.svg" layout="fill" alt="twitter" />
              </div>
              <div className="relative h-[24px] w-[24px]">
                <Image src="/icons/telegram.svg" layout="fill" alt="telegram" />
              </div>
              <div className="relative h-[24px] w-[24px]">
                <Image src="/icons/web.svg" layout="fill" alt="web" />
              </div>
            </div>
          </div>
          <div className="relative h-[320px] w-[320px] overflow-hidden rounded-3xl  ">
            <Image src="/sample/meme.png" layout="fill" alt="meme" />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-1">
              <div className="relative h-[20px] w-[20px] overflow-hidden rounded-full">
                <Image src="/sample/pfp.png" layout="fill" alt="meme" />
              </div>
              <div className="text-base">{`user name`}</div>
            </div>
          </div>
          <div>This is new meme</div>
        </div>

        <div className="w-full flex flex-row justify-between items-center gap-4">
          <div className="flex items-center justify-center bg-red-400 text-gray-500 h-full w-full rounded-2xl p-3">
            <p className="font-bold text-3xl text-center ">PASS</p>
          </div>
          <div className="grow flex items-center justify-center bg-green-500 text-white h-full w-full rounded-2xl p-3">
            <p className="font-bold text-3xl text-center ">DIP</p>
          </div>
        </div>
      </div>
    </>
  );
}
