import { ACTIONS_CORS_HEADERS } from "@solana/actions"
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction, Transaction } from "@solana/web3.js"
export const GET = async(request) => {
  const requestUrl = new URL(request.url);
  const logoUrl = new URL('/assets/infuse.svg',requestUrl.origin)
  console.log(logoUrl)
  const response = {
    icon: logoUrl,
    description: 'InFuse Fund Reqeust',
    title: 'Urgent SOL',
    label: 'Send 0.09',
    error: {
      message:"You Don`t Have Much to Give"
    }
  }
  return Response.json(response,{headers:ACTIONS_CORS_HEADERS})
}

export const POST = async(request) => {
    const ReqBody = await request.json()
   
    const userPKey = ReqBody.account;
    const connection = new Connection(clusterApiUrl('mainnet-beta'),'confirmed')
    const TO_ADDRESS = new PublicKey('BwY8CufbQMF7YPsPEfere1DhYPehTBPSpRJJKG2gTvDq')
    //const account = await Keypair.fromSeed(seedBytes);
   // const connection = new Connection(clusterApiUrl(cluster), "confirmed");

    const blockhash = await connection
      .getLatestBlockhash()
      .then((res) => res.blockhash);

    const instruction = [
      SystemProgram.transfer({
        fromPubkey: new PublicKey(userPKey),
        toPubkey: TO_ADDRESS,
        lamports: 0.5 * LAMPORTS_PER_SOL,
      }),
    ];

    const messageV0 = new TransactionMessage({
      payerKey: new PublicKey(userPKey),
      recentBlockhash: blockhash,
      instructions: instruction,
    }).compileToV0Message();  
    const transaction = new VersionedTransaction(messageV0).serialize().toString('base64');

    

    //transaction.sign([new PublicKey(userPKey)]);
    const response = {
      transaction: transaction ,
      message: `Hello from ${userPKey}`
    }
    
    return Response.json(response,{headers:ACTIONS_CORS_HEADERS})
}

export const OPTIONS = async(request) => {
  return new Response(null,{headers:ACTIONS_CORS_HEADERS})
}