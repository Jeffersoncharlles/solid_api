
import { authenticateController } from '@/http/controllers/users/authenticate'
import { profileController } from '@/http/controllers/users/profile'
import { refreshController } from '@/http/controllers/users/refresh'
import { registerController } from '@/http/controllers/users/register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'


export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
  app.patch('/token/refresh', refreshController)

  /* Authenticated */
  app.get('/me',{onRequest:[verifyJWT]}, profileController)
}
