import { Prisma, Gym } from '@prisma/client'
import { GymsRepository } from '../interfaces/gym.repository'

class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }

  async findById(gymId: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  async findManyNearBy(latitude: number, longitude: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }
}

export { PrismaGymsRepository }
