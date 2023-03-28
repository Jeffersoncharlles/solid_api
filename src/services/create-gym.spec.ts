import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymsService } from './create-gym'

let gyms: InMemoryGymsRepository
let sut: CreateGymsService

describe('Create Gym Service', async () => {
  beforeEach(() => {
    gyms = new InMemoryGymsRepository()
    sut = new CreateGymsService(gyms)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -16.6983363,
      longitude: -49.2487712,
    })

    expect(gym.id).toEqual(expect.any(String)) // espero que o id seja igual a qualquer string
  })
})
