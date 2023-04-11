import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './http/router/users'
import { gymsRoutes } from './http/router/gyms'
import { checkInsRoutes } from './http/router/checkIns'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.SECRET_JWT,
  cookie: {
    cookieName: 'refreshToken',
    signed:false,// no signed
  },
  sign: {
    expiresIn:'10m' //refresh token
  }
})

app.register(fastifyCookie)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({
        message: 'Validation error.',
        issues: err.format(),
      })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    // TODO: here we should log to an external tool like  DataDog/NewRelic/sentry
  }

  return res.status(500).send({
    message: 'Internal Server error.',
  })
})
