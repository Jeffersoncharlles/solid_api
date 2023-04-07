import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInError } from './errors/max-number0of-check-ins-error'

// TDD => state red => error test
// TDD => state green => code para passar
// TDD => state refactor =>  refatorar code

let checkIn: InMemoryCheckInsRepository
let sut: CheckInService
let gyms: InMemoryGymsRepository

describe('CheckIn Service', async () => {
  beforeEach(async () => {
    checkIn = new InMemoryCheckInsRepository()
    gyms = new InMemoryGymsRepository()
    sut = new CheckInService(checkIn, gyms)

    await gyms.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  //= ==========================================================//
  it('should not be able to check in twice in on same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 19, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
  })
  //= ==========================================================//
  it('should be to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 19, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  //= ==========================================================//
  it('should not  be able to check in on distant gym', async () => {
    await gyms.create({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -16.6878541,
        userLongitude: -49.2740054,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
  //= ==========================================================//
})
