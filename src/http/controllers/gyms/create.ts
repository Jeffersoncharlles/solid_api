import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createGymController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90 //tem que ser menor ou igual a 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180 //tem que ser menor ou igual a 180 + ou -
    })
  })

  const {description,latitude,longitude,phone,title } = reqBodySchema.parse(req.body)

  try {
    const create = makeCreateGymService()
    const response = await create.execute({ description, latitude, longitude, phone, title })

    return res.status(201).send(response)
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { createGymController }
