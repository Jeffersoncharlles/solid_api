import { makeGetUserMetricsService } from "@/services/factories/make-get-user-metrics-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const metricsCheckInController = async (req: FastifyRequest, res: FastifyReply) => {

  try {
    const metrics = makeGetUserMetricsService()
    const {checkInsCount} = await metrics.execute({userId:req.user.sub})

    return res.status(200).send({checkInsCount})
  } catch (err) {

    throw err // deixar camada de cima tratar
  }
}

export { metricsCheckInController }
