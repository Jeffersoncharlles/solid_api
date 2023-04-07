import { makeFetchNearbyGymService } from '@/services/factories/make-fetch-nearby-gym-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const nearbyGymController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90 //tem que ser menor ou igual a 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180 //tem que ser menor ou igual a 180 + ou -
    })
  })

  const { latitude,longitude} = reqBodySchema.parse(req.body)

  try {
    const nearby = makeFetchNearbyGymService()
    const response = await nearby.execute({ userLatitude:latitude,userLongitude:longitude})

    return res.status(200).send(response)
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { nearbyGymController }
