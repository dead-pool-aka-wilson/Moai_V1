import * as anchor from "@coral-xyz/anchor";

import { PublicKey } from "@solana/web3.js";

import { MOAI_PROGRAM_ID } from "@/app/constants";

const MOAI = "moai";
const MEME = "meme";
const VOTE = "vote";
const USER = "user";

export const getMemeAddress = (index: string) => {
  const [address, _] = PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(MEME), Buffer.from(index)],
    MOAI_PROGRAM_ID
  );
  return address;
};

export const getVoteAddress = (userSpending: PublicKey, meme: PublicKey) => {
  const [address, _] = PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode(VOTE),
      userSpending.toBuffer(),
      meme.toBuffer(),
    ],
    MOAI_PROGRAM_ID
  );
  return address;
};

export const getUserInfoAddress = (
  userSpending: PublicKey,
  moai: PublicKey
) => {
  const [address, _] = PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode(USER),
      moai.toBuffer(),
      userSpending.toBuffer(),
    ],
    MOAI_PROGRAM_ID
  );
  return address;
};
