import { UserAlreadyExistsError } from '@/services/errors/users-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const register = async (req: FastifyRequest, res: FastifyReply) => {
  const requesterBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = requesterBodySchema.parse(req.body)

  try {
    const registerService = makeRegisterService()

    await registerService.execute({ email, name, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }
    throw err // deixar camada de cima tratar
  }

  return res.status(201).send()
}
