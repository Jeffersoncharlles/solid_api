import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInService } from './checkin'

let checkIn: InMemoryCheckInsRepository
let sut: CheckInService

describe('CheckIn Service', async () => {
  beforeEach(() => {
    checkIn = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkIn)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymIn: '212312321',
      userId: '123123123',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
