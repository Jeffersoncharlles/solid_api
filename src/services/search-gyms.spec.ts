import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymService } from './search-gyms'

let gymsR: InMemoryGymsRepository
let sut: SearchGymService

describe('Search Gym Service', async () => {
  beforeEach(() => {
    gymsR = new InMemoryGymsRepository()
    sut = new SearchGymService(gymsR)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to search for gyms', async () => {
    await gymsR.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -16.6983363,
      longitude: -49.2487712,
    })

    await gymsR.create({
      title: 'gym-01',
      description: null,
      phone: null,
      latitude: -16.6983363,
      longitude: -49.2487712,
    })

    const { gyms } = await sut.execute({
      query: 'gym-01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsR.create({
        title: `gym-01 ${i}`,
        description: null,
        phone: null,
        latitude: -16.6983363,
        longitude: -49.2487712,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym-01',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-01 21' }),
      expect.objectContaining({ title: 'gym-01 22' }),
    ])
  })
})
