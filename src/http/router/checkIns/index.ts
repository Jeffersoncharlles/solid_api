
import { createCheckInsController } from '@/http/controllers/check-ins/create'
import { historyCheckInsController } from '@/http/controllers/check-ins/history'
import { metricsCheckInController } from '@/http/controllers/check-ins/metrics'
import { validateCheckInController } from '@/http/controllers/check-ins/validate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'


export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT) // todas rotas daqui para baixo tem que estar authenticate

  app.post('/gyms/:gymId/check-ins', createCheckInsController)
  app.patch('/check-ins/:checkInId/validate', {onRequest:[verifyUserRole('ADMIN')]},validateCheckInController)

  app.get('/check-ins/history', historyCheckInsController)
  app.get('/check-ins/metrics', metricsCheckInController)
}
