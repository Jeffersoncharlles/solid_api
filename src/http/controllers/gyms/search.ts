import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-serivice'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const searchGymController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqBodySchema = z.object({
    page: z.number(),
    query:z.string()
  })

  const { page,query } = reqBodySchema.parse(req.body)

  try {
    const search = makeSearchGymsService()
    const response = await search.execute({ page,query })

    return res.status(200).send(response)
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { searchGymController }
