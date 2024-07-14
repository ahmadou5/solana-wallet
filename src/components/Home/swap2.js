"use client";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  VersionedTransaction,
  publicKey
  
} from "@solana/web3.js";
import fetch from "cross-fetch";
import * as bip39 from 'bip39'
//import { Wallet } from "@project-serum/anchor";
import bs58 from "bs58";
import { GlobalContext } from "@/context/AppContext";
import { assets, debounce } from "@/Utils/format";

// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.

export const SwapView = () => {
  const [fromAsset, setFromAsset] = useState(assets[0]);
  const [toAsset, setToAsset] = useState(assets[1]);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [quoteResponse, setQuoteResponse] = useState(null);
  const { userPkey, userMnemonic } = GlobalContext();

  const connection = new Connection(clusterApiUrl("devnet"));

  const handleFromAssetChange = async (event) => {
    setFromAsset(
      assets.find((asset) => asset.name === event.target.value) || assets[0]
    );
  };

  const handleToAssetChange = (event) => {
    setToAsset(
      assets.find((asset) => asset.name === event.target.value) || assets[0]
    );
  };

  const handleFromValueChange = (event) => {
    setFromAmount(event.target.value);
  };

  const debounceQuoteCall = useCallback(debounce(getQuote, 500), []);

  useEffect(() => {
    debounceQuoteCall(fromAmount);
  }, [fromAmount, debounceQuoteCall]);
  
  const getQuote = async() => {
    if ((currentAmount) || currentAmount <= 0) {
        console.error('Invalid fromAmount value:', currentAmount);
        return;
      }
  
      const quote = await (
        await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${fromAsset.mint}&outputMint=${toAsset.mint}&amount=${currentAmount * Math.pow(10, fromAsset.decimals)}&slippage=0.5`
        )
      ).json();
  
      if (quote && quote.outAmount) {
        const outAmountNumber =
          (quote.outAmount) / Math.pow(10, toAsset.decimals);
        setToAmount(outAmountNumber);
      }
  
      setQuoteResponse(quote);
    
  }

  const signAndSendTransaction = async() => {
      const seed = await bip39.mnemonicToSeed(userMnemonic)
      console.log(seed,'seed')
      const seedBytes = seed.slice(0,32)
      const account = await Keypair.fromSeed(seedBytes);
  
      // get serialized transactions for the swap
      const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quoteResponse,
            userPublicKey: new publicKey(account.publicKey?.toString()),
            wrapAndUnwrapSol: true,
            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
          }),
        })
      ).json();
      try {
        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
        const signedTransaction = await account.signTransaction(transaction);
  
        const rawTransaction = signedTransaction.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
          skipPreflight: true,
          maxRetries: 2,
        });


      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid
      }, 'confirmed');
      
      console.log(`https://solscan.io/tx/${txid}`);

    } catch (error) {
      console.error('Error signing or sending the transaction:', error);
    }
  }
  return (
    <div className="bg-gothic-950/0 mt-1 flex bg-slate-600  mb-2 flex-col items-center justify-center w-[100%] h-auto">
      <div className="ml-">Holaa</div>
    </div>
  );
};
