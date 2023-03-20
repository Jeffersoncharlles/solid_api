import fastify from 'fastify'
import { z } from 'zod'
import { prima } from './lib/prisma'

export const app = fastify()

app.post('/users', async (req, res) => {
  const requesterBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = requesterBodySchema.parse(req.body)

  await prima.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return res.status(201).send()
})
