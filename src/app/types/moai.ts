export type Moai = {
  version: "0.1.0";
  name: "moai";
  instructions: [
    {
      name: "initializeMoai";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "moai";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrowAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "wsolMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "moaiMint";
          isMut: true;
          isSigner: true;
        },
        {
          name: "rockMint";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: "createMeme";
      accounts: [
        {
          name: "userSpending";
          isMut: true;
          isSigner: true;
        },
        {
          name: "meme";
          isMut: true;
          isSigner: false;
        },
        {
          name: "moai";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rockMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "moaiMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userRockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userMoaiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userSpendingVote";
          isMut: true;
          isSigner: false;
        },
        {
          name: "memeRockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "memoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "index";
          type: "string";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        },
      ];
    },
    {
      name: "mintRock";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userSpending";
          isMut: true;
          isSigner: true;
        },
        {
          name: "moai";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rockMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "moaiMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userRockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userMoaiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrowAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "memoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "vote";
      accounts: [
        {
          name: "userSpending";
          isMut: true;
          isSigner: true;
        },
        {
          name: "meme";
          isMut: true;
          isSigner: false;
        },
        {
          name: "moai";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rockMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "moaiMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userRockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userMoaiAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "memeRockAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userSpendingVote";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "memoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: "moai";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "currentTopVote";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "epoch";
            type: "u64";
          },
          {
            name: "escrowAccount";
            type: "publicKey";
          },
          {
            name: "moaiMintAccount";
            type: "publicKey";
          },
          {
            name: "rockMintAccount";
            type: "publicKey";
          },
          {
            name: "nonce";
            type: "u8";
          },
          {
            name: "authorityValid";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "meme";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "uri";
            type: "string";
          },
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "vote";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "voteStatus";
      type: {
        kind: "struct";
        fields: [
          {
            name: "meme";
            type: "publicKey";
          },
          {
            name: "userSpending";
            type: "publicKey";
          },
          {
            name: "count";
            type: "u64";
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: "NotEnoughRock";
      msg: "Not enough $ROCK";
    },
    {
      code: 6001;
      name: "TopVoteNotProvided";
      msg: "Top Vote not provided";
    },
  ];
};

export const IDL: Moai = {
  version: "0.1.0",
  name: "moai",
  instructions: [
    {
      name: "initializeMoai",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "moai",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "wsolMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "moaiMint",
          isMut: true,
          isSigner: true,
        },
        {
          name: "rockMint",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createMeme",
      accounts: [
        {
          name: "userSpending",
          isMut: true,
          isSigner: true,
        },
        {
          name: "meme",
          isMut: true,
          isSigner: false,
        },
        {
          name: "moai",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rockMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "moaiMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userRockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userMoaiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userSpendingVote",
          isMut: true,
          isSigner: false,
        },
        {
          name: "memeRockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "memoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "index",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
      ],
    },
    {
      name: "mintRock",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userSpending",
          isMut: true,
          isSigner: true,
        },
        {
          name: "moai",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rockMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "moaiMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userRockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userMoaiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrowAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "memoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "vote",
      accounts: [
        {
          name: "userSpending",
          isMut: true,
          isSigner: true,
        },
        {
          name: "meme",
          isMut: true,
          isSigner: false,
        },
        {
          name: "moai",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rockMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "moaiMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userRockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userMoaiAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "memeRockAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userSpendingVote",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "memoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "moai",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "currentTopVote",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "epoch",
            type: "u64",
          },
          {
            name: "escrowAccount",
            type: "publicKey",
          },
          {
            name: "moaiMintAccount",
            type: "publicKey",
          },
          {
            name: "rockMintAccount",
            type: "publicKey",
          },
          {
            name: "nonce",
            type: "u8",
          },
          {
            name: "authorityValid",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "meme",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "uri",
            type: "string",
          },
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "vote",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "voteStatus",
      type: {
        kind: "struct",
        fields: [
          {
            name: "meme",
            type: "publicKey",
          },
          {
            name: "userSpending",
            type: "publicKey",
          },
          {
            name: "count",
            type: "u64",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "NotEnoughRock",
      msg: "Not enough $ROCK",
    },
    {
      code: 6001,
      name: "TopVoteNotProvided",
      msg: "Top Vote not provided",
    },
  ],
};
