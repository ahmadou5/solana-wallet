import { ACTIONS_CORS_HEADERS } from "@solana/actions"
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
export const GET = async(request) => {
  const response = {
    icon: 'https://earn-fuse.vercel.app/assets/show.png',
    description: 'this is infuse blink',
    title: 'Urgent 2k',
    label: 'Send SOL',
    error: {
      message:"This is not yet implemented"
    }
  }
  return Response.json(response,{headers:ACTIONS_CORS_HEADERS})
}

export const POST = async(request) => {
    const ReqBody = await request.json()
    //const Receiver = ReqBody.address
    const userPKey = ReqBody.account;
    const connection = new Connection(clusterApiUrl('mainnet-beta'))
    const TO_ADDRESS = new PublicKey('BwY8CufbQMF7YPsPEfere1DhYPehTBPSpRJJKG2gTvDq')
   // const tx = new Transaction()
    const blockhash = await connection
        .getLatestBlockhash()
        .then((res) => res.blockhash);

      const instruction = [
        SystemProgram.transfer({
          fromPubkey: new PublicKey(userPKey),
          toPubkey: TO_ADDRESS,
          lamports: 2 * LAMPORTS_PER_SOL,
        }),
      ];

      const messageV0 = new TransactionMessage({
        payerKey: new PublicKey(userPKey),
        recentBlockhash: blockhash,
        instructions: instruction,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);
    console.log(userPKey,'account ne')
    const response = {
      transaction: transaction,
      message: `Hello from ${userPKey}`
    }
    
    return Response.json(response,{headers:ACTIONS_CORS_HEADERS})
}

export const OPTIONS = async(request) => {
  return new Response(null,{headers:ACTIONS_CORS_HEADERS})
}