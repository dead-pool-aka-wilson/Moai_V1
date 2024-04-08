import { PublicKey } from "@solana/web3.js";

export const MOAI_PROGRAM_ID: PublicKey = new PublicKey(
  process.env.NEXT_PUBLIC_MOAI_PROGRAM_ID ||
    "2Svk2fb1YwpjKrxktUabBsYYm49HiXyxHpAAAK5g6K9t"
);

export const SPL_MEMO = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

export const MOAI_PUBKEY = new PublicKey(
  process.env.NEXT_PUBLIC_MOAI_PUBKEY ||
    "2stMVqkU4qf8n5as1wifa83YyNQd3U8LYgxooCwgiG5K"
);

export const ROCK_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_ROCK_MINT ||
    "FUAwJW59LUC46Bduk7btXTsPHiW1eSi34w3FCKfqd9en"
);

export const MOAI_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_MOAI_MINT ||
    "EAXr94U2iAitexiiVSqnwAiLwqMdiLL348VFp9TPG7yR"
);

export const ESCROW_ACCOUNT = new PublicKey(
  process.env.NEXT_PUBLIC_MOAI_MINT ||
    "AYnB345i16HXm6EcDL4GjHawoQvSKetGGvDRP5ZvL3gp"
);
