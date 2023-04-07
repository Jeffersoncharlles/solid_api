import { makeCheckInService } from "@/services/factories/make-check-in-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const createCheckInsController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqParamsSchema = z.object({
    gymId:z.string().uuid()
  })
  const reqBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90 //tem que ser menor ou igual a 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180 //tem que ser menor ou igual a 180 + ou -
    })
  })

  const { latitude, longitude } = reqBodySchema.parse(req.body)
  const { gymId} = reqParamsSchema.parse(req.params)

  try {
    const create = makeCheckInService()
    await create.execute({gymId,userId:req.user.sub,userLatitude:latitude,userLongitude:longitude})
    return res.status(201).send()
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { createCheckInsController }
