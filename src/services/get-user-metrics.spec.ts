import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsService } from './get-user-metrics'

// TDD => state red => error test
// TDD => state green => code para passar
// TDD => state refactor =>  refatorar code

let checkIn: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', async () => {
  beforeEach(async () => {
    checkIn = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkIn)
  })

  //= ==========================================================//
  //= ==========================================================//
  it('should be able to get check-ins count from metrics', async () => {
    await checkIn.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkIn.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
  //= ==========================================================//
})
