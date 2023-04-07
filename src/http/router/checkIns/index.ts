
import { createCheckInsController } from '@/http/controllers/check-ins/create'
import { historyCheckInsController } from '@/http/controllers/check-ins/history'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'


export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT) // todas rotas daqui para baixo tem que estar authenticate
  app.post('checkins', createCheckInsController)
  app.get('checkins/history', historyCheckInsController)
}
