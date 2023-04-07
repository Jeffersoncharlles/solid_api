import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const searchGymController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    query:z.string()
  })

  const { page, query } = reqSchema.parse(req.query)

  try {
    const search = makeSearchGymsService()
    const response = await search.execute({ page,query })

    return res.status(200).send(response)
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { searchGymController }
