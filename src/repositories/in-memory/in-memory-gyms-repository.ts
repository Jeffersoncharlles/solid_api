import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-cordinates'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { findManyParams, GymsRepository } from '../interfaces/gym.repository'

class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((gyms) => gyms.id === gymId)

    if (!gym) return null

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearBy({
    latitude,
    longitude,
  }: findManyParams): Promise<Gym[]> {
    return this.items.filter((gyms) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gyms.latitude.toNumber(),
          longitude: gyms.longitude.toNumber(),
        },
      )
      return distance < 10 // 10 km menor
    })
  }
}

export { InMemoryGymsRepository }
