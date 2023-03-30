import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { ValidateCheckInService } from './validate-check-in'

// TDD => state red => error test
// TDD => state green => code para passar
// TDD => state refactor =>  refatorar code

let checkInR: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate Check-in Service', async () => {
  beforeEach(async () => {
    checkInR = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInR)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInR.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInR.items[0].validated_at).toEqual(expect.any(Date))
  })
  //= ==========================================================//
  it('should be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
