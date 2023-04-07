import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const validateCheckInController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqBodySchema = z.object({

  })

  const { } = reqBodySchema.parse(req.body)

  try {


    return res.status(200).send()
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { validateCheckInController }
