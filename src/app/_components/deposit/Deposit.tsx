"use client";
import Image from "next/image";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PublicKey, Keypair } from "@solana/web3.js";
import { useState } from "react";
import clsx from "clsx";

export default function Deposit() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected, connecting } = useWallet();
  const [count, setCount] = useState(1);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-1 rounded-b-3xl bg-purple-200 px-[10px] ">
        <div className="my-3 inline-flex w-full items-start justify-between p-2">
          <div className="grow items-start justify-start gap-2.5 text-center text-xl font-bold text-zinc-950">
            Buy $ROCK to make MOAI
          </div>
        </div>
        <div className="flex grow flex-col items-stretch gap-2 justify-evenly">
          <div className="flex items-center justify-between gap-2"></div>
        </div>
        <div className="relative h-[120px] w-[120px] overflow-hidden rounded-3xl  ">
          <Image src="/images/rock.jpeg" layout="fill" alt="meme" />
        </div>
        <div className="flex flex-col my-4 w-full px-2 gap-2">
          <div className="text-center">
            <span className="text-2xl font-bold">
              <span className=" font-normal">$TOTAL Price</span> :{" "}
              <span className=" font-extrabold text-purple-700">
                {count * 0.01}
              </span>{" "}
              SOL
            </span>
          </div>
          <div>
            <span className="text-purple-600 font-bold text-lg">
              0.01 SOL (per rock)
            </span>
            <br />
            - 0.096 SOL (Pool Escrow)
            <br /> - 0.004 SOL (sent to Spending Wallet)
            <br />
            <span className="text-xs font-light">
              additional tx fee may apply
            </span>
          </div>
        </div>
      </div>

      {connected ? (
        <>
          <div className="w-full grow flex flex-col justify-center items-center gap-4 px-10">
            <WalletMultiButton>
              {!connected ? (
                <p className="font-bold text-lg text-center flex flex-row justify-between gap-4">
                  <Image
                    src="/icons/phantom.svg"
                    width={40}
                    height={40}
                    alt="my page"
                  />
                  connect wallet (web)
                </p>
              ) : (
                connecting ?? <p>connecting</p>
              )}
            </WalletMultiButton>
          </div>
          <div className="flex flex-row justify-between w-[300px] gap-2">
            <div className="w-full flex flex-row border-4 justify-between rounded-2xl px-6 items-center">
              <p
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
                className="font-extrabold text-3xl"
              >
                -
              </p>
              <p className="font-bold text-4xl text-purple-500">{count}</p>
              <p
                onClick={() => {
                  setCount(count + 1);
                }}
                className="font-extrabold text-3xl"
              >
                +
              </p>
            </div>
            <div className="flex h-max-[60px] items-center justify-center bg-purple-600 text-white  w-[200px] rounded-2xl p-4">
              <p className="font-bold text-lg text-center flex flex-row justify-between  gap-4">
                buy rock
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full grow flex flex-col justify-center items-center gap-4">
            <div className="flex h-max-[60px] items-center justify-between bg-purple-600 text-white  w-[300px] rounded-2xl py-4 px-[16px]">
              <p className="font-bold text-lg text-center flex flex-row justify-between  gap-3">
                <Image
                  src="/icons/phantom.svg"
                  width={24}
                  height={24}
                  alt="my page"
                />
                connect wallet (mobile)
              </p>
            </div>

            <WalletMultiButton>
              {!connected ? (
                <p className="font-bold text-lg text-center flex flex-row justify-between gap-4">
                  connect wallet (web)
                </p>
              ) : (
                connecting ?? <p>connecting</p>
              )}
            </WalletMultiButton>
          </div>
        </>
      )}
      <div className="mt-5">
        <p className="uppercase font-bold">Spending Wallet : </p>
        <p className="text-xs text-purple-600 underline">
          <Link
            href={`https://solscan.io/account/${Keypair.fromSecretKey(new Uint8Array(JSON.parse(`[${localStorage.getItem("moai-spending")}]` || "[]"))).publicKey.toBase58()}`}
          >{`${Keypair.fromSecretKey(new Uint8Array(JSON.parse(`[${localStorage.getItem("moai-spending")}]` || "[]"))).publicKey.toBase58()}`}</Link>
        </p>
      </div>
    </>
  );
}
