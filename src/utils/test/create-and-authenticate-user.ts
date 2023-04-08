import { FastifyInstance } from "fastify"
import request from "supertest"

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server)
    .post('/users')
    .send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

  const auth = await request(app.server)
    .post('/sessions')
    .send({
      email: 'johndoe@example.com',
      password: '123456'
    })

  const { token } = auth.body

  return {token}
}
