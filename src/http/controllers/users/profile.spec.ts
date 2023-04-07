import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Profile (2e2)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get user profile', async () => {
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

    const profile = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // expect(profile.body.statusCode).toEqual(200)
    expect(profile.body.user).toEqual(
      expect.objectContaining({
        email:'johndoe@example.com'
      })
    )
  })
})
