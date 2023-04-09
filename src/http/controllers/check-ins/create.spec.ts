import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-In create (2e2)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

   const gym =  await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description?',
        phone: '9999999999',
        latitude: -16.6983363,
        longitude: -49.2487712,
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -16.6983363,
        longitude: -49.2487712,
      })

    expect(response.statusCode).toEqual(201)
  })
})
