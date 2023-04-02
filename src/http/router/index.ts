import { FastifyInstance } from 'fastify'
import { authenticateController } from '../controllers/authenticate'
import { registerController } from '../controllers/register'
import { profileController } from '../controllers/profile'
import { verifyJWT } from '../middlewares/verify-jwt'

export const routes = async (app: FastifyInstance) => {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  /* Authenticated */
  app.get('/me',{onRequest:[verifyJWT]}, profileController)
}
