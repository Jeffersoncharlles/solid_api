
import { createGymController } from '@/http/controllers/gyms/create'
import { nearbyGymController } from '@/http/controllers/gyms/nearby'
import { searchGymController } from '@/http/controllers/gyms/search'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'


export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT) // todas rotas daqui para baixo tem que estar authenticate
  app.get('/gyms/search', searchGymController)
  app.get('/gyms/nearby', nearbyGymController)
  app.post('/gyms',createGymController)
}
