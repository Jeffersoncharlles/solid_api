import fastify from 'fastify'
import { routes } from './http/router'

export const app = fastify()

app.register(routes)
