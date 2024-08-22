import { ACTIONS_CORS_HEADERS } from "@solana/actions"
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
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
   
    const userPKey = ReqBody.account;
    const connection = new Connection(clusterApiUrl('mainnet-beta'))
    const TO_ADDRESS = new PublicKey('BwY8CufbQMF7YPsPEfere1DhYPehTBPSpRJJKG2gTvDq')
    const transaction1 = new Transaction().add(
      SystemProgram.transfer({
        toPubkey: TO_ADDRESS,
        lamports: 2 * LAMPORTS_PER_SOL,
        fromPubkey: new PublicKey(userPKey)
      })
    )
    transaction1.feePayer = new PublicKey(userPKey)
    transaction1.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    const seriliaze = transaction1.serialize({requireAllSignatures:false,verifySignatures:false}).toString('base64')
      const response = {
      transaction: seriliaze,
      message: `Hello from ${userPKey}`
    }
    
    return Response.json(response,{headers:ACTIONS_CORS_HEADERS})
}

export const OPTIONS = async(request) => {
  return new Response(null,{headers:ACTIONS_CORS_HEADERS})
}