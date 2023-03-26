import { Gym, Prisma } from '@prisma/client'

import { GymsRepository } from '../interfaces/gym.repository'

class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((gyms) => gyms.id === gymId)

    if (!gym) return null

    return gym
  }
}

export { InMemoryGymsRepository }
