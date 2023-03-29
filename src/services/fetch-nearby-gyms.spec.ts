import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearByGymsService } from './fetch-nearby-gyms'

let gymsR: InMemoryGymsRepository
let sut: FetchNearByGymsService

describe('Search Gym Service', async () => {
  beforeEach(() => {
    gymsR = new InMemoryGymsRepository()
    sut = new FetchNearByGymsService(gymsR)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to fetch nearby gyms', async () => {
    await gymsR.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -16.684955,
      longitude: -49.2738512,
    })

    await gymsR.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -17.7638608,
      longitude: -49.3056673,
    })

    const { gyms } = await sut.execute({
      userLatitude: -16.684955,
      userLongitude: -49.2738512,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
