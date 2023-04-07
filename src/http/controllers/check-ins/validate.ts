import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const validateCheckInController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqParamsSchema = z.object({
    checkInId:z.string().uuid()
  })

  const { checkInId} = reqParamsSchema.parse(req.params)

  try {
    const validate = makeValidateCheckInService()
    await validate.execute({checkInId})

    return res.status(204).send()
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { validateCheckInController }
