"use client";
import Image from "next/image";
import Link from "next/link";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, useCallback, use } from "react";

import {
  Program,
  AnchorProvider,
  Idl,
  Wallet as AnchorWallet,
} from "@coral-xyz/anchor";
import { Moai as MoaiType } from "@/app/types/moai";
import Moai from "@/app/idl/moai.json";
import {
  Keypair,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import BN from "bn.js";
import {
  SPL_MEMO,
  MOAI_PUBKEY,
  ROCK_MINT,
  MOAI_MINT,
  ESCROW_ACCOUNT,
  MOAI_PROGRAM_ID,
} from "@/app/constants";
import { getUserInfoAddress } from "@/app/utils";

export default function Deposit() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected, connecting } = useWallet();
  const wallet = useAnchorWallet();
  const [count, setCount] = useState(1);

  const buyRock = useCallback(
    async (amount: number) => {
      if (wallet && publicKey) {
        try {
          const userSpending = Keypair.fromSecretKey(
            new Uint8Array(
              JSON.parse(`[${localStorage.getItem("moai-spending")}]` || "[]")
            )
          );
          console.log(userSpending.publicKey.toBase58());
          const provider = new AnchorProvider(connection, wallet, {
            commitment: "confirmed",
          });
          const idl = JSON.parse(JSON.stringify(Moai));
          const program = new Program<MoaiType>(idl, MOAI_PROGRAM_ID, provider);

          const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight },
          } = await connection
            .getLatestBlockhashAndContext()
            .then((blockhash) => blockhash)
            .catch((err) => {
              throw Error(err);
            });
          // Config priority fee and amount to transfer
          const PRIORITY_RATE = 25000; // MICRO_LAMPORTS
          const AMOUNT_TO_TRANSFER = 0.001 * LAMPORTS_PER_SOL;

          // Instruction to set the compute unit price for priority fee
          const PRIORITY_FEE_INSTRUCTIONS = [
            ComputeBudgetProgram.setComputeUnitLimit({
              units: 300_000,
            }),
            ComputeBudgetProgram.setComputeUnitPrice({
              microLamports: PRIORITY_RATE,
            }),
          ];

          const userRockAccount = getAssociatedTokenAddressSync(
            ROCK_MINT,
            publicKey
          );
          const userMoaiAccount = getAssociatedTokenAddressSync(
            MOAI_MINT,
            publicKey
          );
          console.log(program.programId.toBase58());
          const signature = await program.methods
            .mintRock(new BN(amount))
            .accounts({
              user: publicKey,
              userSpending: userSpending.publicKey,
              moai: MOAI_PUBKEY,
              rockMint: ROCK_MINT,
              moaiMint: MOAI_MINT,
              userRockAccount,
              userMoaiAccount,
              escrowAccount: ESCROW_ACCOUNT,
              userInfo: getUserInfoAddress(userSpending.publicKey, MOAI_PUBKEY),
              tokenProgram: TOKEN_PROGRAM_ID,
              associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
              systemProgram: SystemProgram.programId,
              memoProgram: SPL_MEMO,
              rent: SYSVAR_RENT_PUBKEY,
            })
            .signers([userSpending])
            .preInstructions(PRIORITY_FEE_INSTRUCTIONS)
            .rpc({ skipPreflight: false, commitment: "confirmed" })
            .then((res) => res)
            .catch((err) => {
              throw Error(err);
            });
          console.log("signature : ", signature);
        } catch (err) {
          console.log(err);
        }
      }
    },
    [connection, wallet, publicKey, sendTransaction]
  );

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
                {count.toString().length > 1
                  ? `${count.toString().slice(0, count.toString().length - 1)}.${count.toString().slice(-1)}`
                  : `0.${count.toString()}`}
              </span>{" "}
              SOL
            </span>
          </div>
          <div>
            <span className="text-purple-600 font-bold text-lg">
              0.1 SOL (per rock)
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
            <div
              onClick={async () => {
                await buyRock(count);
              }}
              className="flex h-max-[60px] items-center justify-center bg-purple-600 text-white  w-[200px] rounded-2xl p-4"
            >
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
