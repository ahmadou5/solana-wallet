
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
  return Response.json(response)
}

export const POST = async(request) => {
    const ReqBody = await request.json()
    const userPKey = ReqBody.account;

    console.log(userPKey,'account ne')
    const response = {
      transaction: '',
      message: `Hello ${userPKey}`
    }
    return Response.json(response)
}