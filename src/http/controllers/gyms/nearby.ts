import { makeFetchNearbyGymService } from '@/services/factories/make-fetch-nearby-gym-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const nearbyGymController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude,longitude} = reqSchema.parse(req.query)

  try {
    const nearby = makeFetchNearbyGymService()
    const response = await nearby.execute({ userLatitude: latitude, userLongitude: longitude })

    return res.status(200).send(response)
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { nearbyGymController }
