import { FastifyReply, FastifyRequest } from "fastify"

const verifyJWT =async (req:FastifyRequest,res:FastifyReply) => {


  try {

    await req.jwtVerify()

  } catch (error) {
    return res.status(401).send({message: 'Unauthorized.'})
  }
}

export {verifyJWT}
