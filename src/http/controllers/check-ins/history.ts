import { makeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-check-ins-history-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const historyCheckInsController = async (req: FastifyRequest, res: FastifyReply) => {
  const reqSchema = z.object({
    page:z.coerce.number().min(1).default(1)
  })

  const { page } = reqSchema.parse(req.query)

  try {
    const history = makeFetchUserCheckInsHistoryService()
    const {checkIns} = await history.execute({page,userId:req.user.sub})

    return res.status(200).send({ checkIns })
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { historyCheckInsController }
