import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it} from 'vitest'
import request from 'supertest'

describe('Register (2e2)', () => {

  beforeAll(async() => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to register', async() => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password:'123456'
      })

    expect(response.statusCode).toEqual(201)
  })
})
