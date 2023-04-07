
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'


export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT) // todas rotas daqui para baixo tem que estar authenticate
}
