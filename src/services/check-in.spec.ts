import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in'

// TDD => state red => error test
// TDD => state green => code para passar
// TDD => state refactor =>  refatorar code

let checkIn: InMemoryCheckInsRepository
let sut: CheckInService

describe('CheckIn Service', async () => {
  beforeEach(() => {
    checkIn = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkIn)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymIn: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  //= ==========================================================//

  //= ==========================================================//
  it('should not be able to check in twice in on same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 19, 8, 0, 0))

    await sut.execute({
      gymIn: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        gymIn: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should be to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 19, 8, 0, 0))

    await sut.execute({
      gymIn: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymIn: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
