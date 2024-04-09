"use client";
import Image from "next/image";
import { ed25519 } from "@noble/curves/ed25519";
import { createHash } from "crypto";
import type { PutBlobResult } from "@vercel/blob";
import {
  useConnection,
  useWallet,
  useAnchorWallet
} from "@solana/wallet-adapter-react";
import { useState, useCallback } from "react";
import * as anchor from "@coral-xyz/anchor";
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
import Irys, { WebIrys } from "@irys/sdk";
import { get } from "http";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
  getUserInfoAddress,
  getMemeAddress,
  getVoteAddress
} from "@/app/utils";
import { useNavbar } from "@/app/context/Navigation";
import { useRouter } from "next/navigation";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";

const UPLOAD_MAX_TRIES = 3;
const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB
const NETWORK = "devnet";

const getIrys = async (rpcEndpoint: string, key: any) => {
  const token = "solana";
  const providerUrl = rpcEndpoint;
  console.log(key);

  const irys = new Irys({
    network: NETWORK,
    token, // Token used for payment
    key: key,
    config: { providerUrl } // Optional provider URL, only required when using Devnet
  });
  await irys.ready();
  return irys;
};

const getWebIrys = async (rpcEndpoint: string, key: any) => {
  const rpcUrl = rpcEndpoint;

  const wallet = { rpcUrl: rpcUrl, name: "solana", provider: key };
  const webIrys = new WebIrys({ network: NETWORK, token: "solana", wallet });
  await webIrys.ready();
  return webIrys;
};

const uploadImage = async (irys: any, file: any) => {
  // Add a custom tag that tells the gateway how to serve this file to a browser
  const tags = [{ name: "Content-Type", value: "image/png" }];
  try {
    const response = await irys.uploadFile(file, { tags });

    return `https://gateway.irys.xyz/${response.id}`;
  } catch (e) {
    console.log("Error uploading image ", e);
  }
};

const fileExtensionValid = ({ name }: { name: string }): boolean => {
  const extension = removeFileName(name);

  if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === "") {
    return false;
  }
  return true;
};

const removeFileName = (originalFileName: string): string => {
  const lastIndex = originalFileName.lastIndexOf(".");

  if (lastIndex < 0) {
    return "";
  }

  return originalFileName.substring(lastIndex + 1).toLowerCase();
};

const hashValue = (name: string): Promise<string> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(createHash("sha256").update(name).digest("hex")),
      0
    )
  );

export default function Create() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected, connecting } = useWallet();
  const wallet = useAnchorWallet();
  const [image, setImage] = useState<string>("/images/deposit.png");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { setTab, setMemeId } = useNavbar();
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 32) {
      alert("Name should be less than 32 characters");
      return;
    } else setName(e.target.value);
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      alert("Symbol should be less than 10 characters");
      return;
    } else setSymbol(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length > 200) {
      alert("Description should be less than 200 characters");
      return;
    } else setDescription(e.target.value);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files || [])[0];

    if (files === undefined) return;

    if (!fileExtensionValid(files)) {
      target.value = "";
      alert(`image type not supported. Allowlist : [${ALLOW_FILE_EXTENSION}]`);
      return;
    }

    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = "";
      alert("image size is too big. [max size : 5MB]");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImage(e.target.result as string);
        setFile(files);
      }
    };
  };

  const createMeme = useCallback(
    async (name: string, symbol: string, description: string) => {
      console.log("button clicked");
      if (!file) {
        alert("Please upload image");
        return;
      }
      if (!name) {
        alert("Please input name");
        return;
      }
      if (!symbol) {
        alert("Please input symbol");
        return;
      }
      if (!description) {
        alert("Please input description");
        return;
      }

      try {
        const userSpending = Keypair.fromSecretKey(
          new Uint8Array(
            JSON.parse(`[${localStorage.getItem("moai-spending")}]` || "[]")
          )
        );

        let imageUri: string | undefined = undefined;
        let tries = 0;
        while (imageUri === undefined) {
          tries++;

          const response = await fetch(
            `/api/upload/photo?filename=${file.name}`,
            {
              method: "POST",
              body: file
            }
          );
          const newBlob = (await response.json()) as PutBlobResult;
          imageUri = newBlob.url;

          if (tries > UPLOAD_MAX_TRIES) {
            alert("Failed to upload image");
            throw Error("Failed to upload image");
          }
        }
        console.log(imageUri);
        const jsonFile = {
          name,
          symbol,
          description,
          image: imageUri
        };
        tries = 0;
        let jsonUri: string | undefined = undefined;
        while (jsonUri === undefined) {
          tries++;

          const response = await fetch(
            `/api/upload/jsonFile?filename=${name}.json`,
            {
              method: "POST",
              body: JSON.stringify(jsonFile)
            }
          );
          const newBlob = (await response.json()) as PutBlobResult;
          jsonUri = newBlob.url;

          if (tries > UPLOAD_MAX_TRIES) {
            alert("Failed to upload json");
            throw Error("Failed to upload json");
          }
        }
        console.log(jsonUri);

        const index = await (await hashValue(name)).slice(0, 32);

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
        const meme = getMemeAddress(index);

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

        const signature = await program.methods
          .createMeme(index, name, jsonUri)
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

        const res = await fetch(`/api/meme`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },

          body: JSON.stringify({
            name: name,
            symbol: symbol,
            desc: description,
            image: imageUri,
            memeId: meme.toBase58(),
            creator: userSpending.publicKey.toBase58()
          })
        });

        if (res.ok) {
          setMemeId(meme.toBase58());
          setTab(0);
        } else {
          throw Error("Failed to post meme");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [connection, file, name, symbol, description]
  );

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-1 rounded-b-3xl bg-purple-200 px-[10px] pb-[20px]">
        <div className="my-3 inline-flex w-full items-start justify-between p-2">
          <div className="grow items-start justify-start gap-2.5 text-center text-xl font-bold text-zinc-950">
            Post new MEME for Contest <br />
            <span className="text-sm text-zinc-500">cost : 1 $ROCK</span>
          </div>
        </div>

        <div className="relative h-[200px] w-[200px] overflow-hidden rounded-3xl border-4 flex items-center justify-center bg-purple-400">
          {file ? (
            <Image src={image} fill alt="add image" />
          ) : (
            <>
              <input
                id="file-input"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={handleFilesChange}
              />
              <label htmlFor="file-input">
                <div className="h-[60px] w-[60px] relative">
                  <Image src="/icons/plus.svg" fill alt="add image" />
                </div>
              </label>
            </>
          )}
        </div>
      </div>
      <div className="h-full flex flex-col justify-center px-4 w-full pt-2">
        <div className="flex flex-row justify-between gap-4">
          <input
            type="text"
            className="border-solid border-2 border-purple-400 rounded-2xl p-2 my-2 w-full"
            placeholder="Name"
            required
            onChange={handleNameChange}
          />
          <input
            type="text"
            className="border-solid border-2 border-purple-400 rounded-2xl p-2 my-2 w-full"
            placeholder="Symbol"
            required
            onChange={handleSymbolChange}
          />
        </div>
        <textarea
          className="border-solid border-2 border-purple-400 rounded-2xl p-2 my-2 w-full h-full"
          placeholder="Description"
          required
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="w-full px-4">
        <button
          className="bg-purple-600 text-white rounded-2xl p-2 my-2 w-full"
          onClick={() => createMeme(name, symbol, description)}
        >
          Post
        </button>
      </div>
    </>
  );
}
