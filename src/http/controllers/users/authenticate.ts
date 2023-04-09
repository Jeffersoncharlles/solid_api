import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const authenticateController = async (req: FastifyRequest,res: FastifyReply,) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateService = makeAuthenticateService()

    const { user } = await authenticateService.execute({ email, password })

    const token = await res.jwtSign({}, {
      sign: {
        sub: user.id,
      },
    })

    const refreshToken = await res.jwtSign({}, {
      sign: {
        sub: user.id,
        expiresIn:'7d',// refresh token 7 days
      }
    })

    return res
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, //crypt in http
        sameSite: true, // cookie in with site
        httpOnly: true, // with cookie in back-end and not front-end

      })
      .send({
      token
    })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }
    throw err // deixar camada de cima tratar
  }
}

export { authenticateController }
