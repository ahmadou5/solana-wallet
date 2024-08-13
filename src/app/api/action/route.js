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
    const userPKey = ReqBody.account;
    const connection = new Connection(clusterApiUrl('mainnet-beta'))
    const tx = new Transaction()
    tx.feePayer = new PublicKey(userPKey)
    tx.recentBlockhash = (await connection.getLatestBlockhash({commitment: 'finalized'})).blockhash
    const serialTX = tx.serialize({requireAllSignatures:false, verifySignatures:false}).toString('base64')
    console.log(userPKey,'account ne')
    const response = {
      transaction: serialTX,
      message: `Hello from ${userPKey}`
    }
    
    return Response.json(response,{headers:ACTIONS_CORS_HEADERS})
}

export const OPTIONS = async(request) => {
  return new Response(null,{headers:ACTIONS_CORS_HEADERS})
}