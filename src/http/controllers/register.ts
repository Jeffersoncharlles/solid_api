import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma.users.repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '../services/errors/users-already-exists-error'
import { RegisterService } from '../services/register'

export const register = async (req: FastifyRequest, res: FastifyReply) => {
  const requesterBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = requesterBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)

    await registerService.execute({ email, name, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }
    return res.status(500).send()
  }

  return res.status(201).send()
}
