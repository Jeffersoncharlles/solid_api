import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { routes } from './http/router'

export const app = fastify()

app.register(routes)
app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: err.format() })
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
