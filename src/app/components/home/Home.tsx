import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useNavbar } from "@/app/context/Navigation";
import {
  useConnection,
  useWallet,
  useAnchorWallet
} from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, Idl, Wallet } from "@coral-xyz/anchor";
import { Moai as MoaiType } from "@/app/types/moai";
import Moai from "@/app/idl/moai.json";
import {
  Keypair,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  PublicKey
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync
} from "@solana/spl-token";
import BN from "bn.js";
import {
  SPL_MEMO,
  MOAI_PUBKEY,
  ROCK_MINT,
  MOAI_MINT,
  ESCROW_ACCOUNT,
  MOAI_PROGRAM_ID
} from "@/app/constants";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
  getUserInfoAddress,
  getMemeAddress,
  getVoteAddress
} from "@/app/utils";
import { Public } from "@prisma/client/runtime/library";

export default function Home() {
  const { memeId, setMemeId } = useNavbar();
  const { connection } = useConnection();

  const [meme, setMeme] = useState<null | any>(null);

  useEffect(() => {
    async function fetchMeme() {
      const id = memeId;
      console.log(id);
      const res = await fetch(`/api/meme?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setMeme(data);
        setMemeId(data?.memeId);
      } else {
        console.log("error");
      }
    }
    if (meme === null) fetchMeme();
    if (memeId === "") fetchMeme();
  }, [memeId]);

  const handlePass = () => {
    setMemeId("");
  };

  const vote = useCallback(
    async (memeId: string) => {
      try {
        const userSpending = Keypair.fromSecretKey(
          new Uint8Array(
            JSON.parse(`[${localStorage.getItem("moai-spending")}]` || "[]")
          )
        );

        const provider = new AnchorProvider(
          connection,
          new NodeWallet(userSpending),
          {
            commitment: "confirmed"
          }
        );
        const idl = JSON.parse(JSON.stringify(Moai));
        const program = new Program<MoaiType>(idl, MOAI_PROGRAM_ID, provider);

        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight }
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
            units: 300_000
          }),
          ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: PRIORITY_RATE
          })
        ];

        const userInfo = await program.account.user.fetch(
          getUserInfoAddress(userSpending.publicKey, MOAI_PUBKEY)
        );

        const userRockAccount = userInfo.rockAccount;
        const userMoaiAccount = userInfo.moaiAccount;

        let topVote: null | undefined | PublicKey = null;

        while (topVote === null) {
          topVote = await program.account.moai
            .fetch(MOAI_PUBKEY)
            .then((moai) => {
              console.log(moai);
              return moai.currentTopVote;
            })
            .catch((e) => {
              console.log(e);
              return null;
            });
          console.log("passed");
          console.log("topVote : ", topVote && topVote.toBase58());
        }
        const meme = new PublicKey(memeId);

        const signature = await program.methods
          .vote()
          .accounts({
            userSpending: userSpending.publicKey,
            meme: meme,
            moai: MOAI_PUBKEY,
            rockMint: ROCK_MINT,
            moaiMint: MOAI_MINT,
            userRockAccount,
            userMoaiAccount,
            memeRockAccount: getAssociatedTokenAddressSync(
              ROCK_MINT,
              meme,
              true
            ),
            userSpendingVote: getVoteAddress(userSpending.publicKey, meme),
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            memoProgram: SPL_MEMO,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
          })
          .remainingAccounts(
            topVote != undefined
              ? [
                  {
                    pubkey: topVote,
                    isSigner: false,
                    isWritable: false
                  }
                ]
              : []
          )
          .signers([userSpending])
          .rpc({ skipPreflight: true, commitment: "finalized" });
        console.log(signature);
        setMemeId("");
      } catch (err) {
        console.log(err);
      }
    },
    [connection, setMemeId]
  );
  if (meme === null) return <div>Loading...</div>;

  return (
    <div>
      <div className="my-3 inline-flex w-full items-start justify-between p-2">
        <div className="grow items-start justify-start gap-2.5 text-center text-xl font-bold text-zinc-950">
          {meme?.name}
        </div>
      </div>
      <div className="flex w-full grow flex-col items-center justify-center gap-2 rounded-3xl bg-gray-200 p-4">
        <div className="flex grow flex-col items-stretch gap-2 justify-evenly">
          <div className="flex items-center justify-between gap-2">
            <div className="rounded-2xl bg-purple-700 px-4 text-2xl text-white">
              {`$${meme?.symbol}`}
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
            <Image src={meme?.imageUri} layout="fill" alt="meme" />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-1">
              <div className=" text-xs underline">{`${meme?.memeId}`}</div>
            </div>
          </div>
          <div>{meme?.desc}</div>
        </div>

        <div className="w-full flex flex-row justify-between items-center gap-4">
          <div
            onClick={handlePass}
            className="flex items-center justify-center bg-gray-300 text-gray-500 h-full w-full rounded-2xl p-3"
          >
            <p className="font-bold text-3xl text-center ">PASS</p>
          </div>
          <div
            onClick={() => vote(meme?.memeId)}
            className="grow flex items-center justify-center bg-green-500 text-white h-full w-full rounded-2xl p-3"
          >
            <p className="font-bold text-3xl text-center ">DIP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
