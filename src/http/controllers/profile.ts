import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


const profileController = async (req: FastifyRequest, res: FastifyReply) => {

  try {
    await req.jwtVerify()

    const getUserProfile = makeGetUserProfileService()

    const { user} = await getUserProfile.execute({userId:req.user.sub})

    return res.status(201).send({
      user: {
        ...user, password_hash: undefined
    }})
  } catch (err) {
    if (err instanceof Error) {
      return res.status(409).send({ message: err.message })
    }
    throw err // deixar camada de cima tratar
  }


}

export { profileController }
