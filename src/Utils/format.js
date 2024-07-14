export const formatAddress = (value) => {
  return value.substring(0, 10) + "..." + value.substring(value.length - 3);
};
export const formatString = (value) => {
  return value.substring(0, 28) + "..." + value.substring(value.length - 14);
};
export const formatMString = (value) => {
  return value.substring(0, 15) + "..." + value.substring(value.length - 8);
};
export const truncate = (value) => {
  return value.trim(0, 5);
};
export const handleCopy = (value) => {
  navigator.clipboard.writeText(value).then(
    () => {
      console.log("Copied to clip Board");
    },
    (err) => {
      // Failed to copy to clipboard
      console.error("Could not copy: ", err);
    }
  );
};

export const assets = [
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    logo: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f536f31313131313131313131313131313131313131313131313131313131313131313131313131313131322f6c6f676f2e706e67',
    decimals: 9,
  },
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    logo: 'https://statics.solscan.io/cdn/imgs/s60?ref=https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
    decimals: 6,
  },
  {
    name: "USDT",
    logo: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f457339764d46727a614345526d4a667246344832465944344b436f4e6b5931314d6343653842656e774e59422f6c6f676f2e737667',
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    decimals: 6,
  },
  {
    name: "BONK",
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    logo: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f617277656176652e6e65742f685169505a4f73525a584758424a645f3832506856646c4d5f68414373545f713677717766356353593749',
    decimals: 5,
  },
  {
    name: "WIF",
    logo: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
    mint: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    decimals: 6,
  },
];

export const chains = [
  {
    name: "Fraxtal",
    providerUrl: "https://rpc.testnet.frax.com",
    imgUrl: "./assets/frx.png",
    Tick: "frxETH",
    scan: "holesky.fraxscan.com",
    faucet: "https://www.alchemy.com/faucets/ethereum-sepolia",
  },
  {
    name: "Sepolia",
    providerUrl: "https://ethereum-sepolia-rpc.publicnode.com",
    imgUrl: "./assets/chain1.svg",
    Tick: "ETH",
    scan: "sepolia.etherscan.io",
    faucet: "https://www.alchemy.com/faucets/ethereum-sepolia",
  },
  {
    name: "Arb Sepolia",
    providerUrl: "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public",
    imgUrl: "./assets/arb.png",
    Tick: "ETH",
    scan: "sepolia.arbiscan.io",
    faucet: "https://t.me/ArbitrumFaucetBot",
  },
  {
    name: "Base Sepolia",
    providerUrl: "https://sepolia.base.org",
    imgUrl: "./assets/ba.png",
    Tick: "ETH",
    scan: "sepolia.basescan.org",
    faucet: "https://t.me/BaseFaucetBot",
  },
];
