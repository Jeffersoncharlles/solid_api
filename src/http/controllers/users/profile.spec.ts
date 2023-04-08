import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Profile (2e2)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get user profile', async () => {
    const {token } = await createAndAuthenticateUser(app)

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
