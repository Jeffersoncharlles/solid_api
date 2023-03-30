import { Prisma } from '@prisma/client'
import { GymsRepository } from '../interfaces/gym.repository'

class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    throw new Error('Method not implemented.')
  }

  async findById(gymId: string) {
    throw new Error('Method not implemented.')
  }

  async searchMany(query: string, page: number) {
    throw new Error('Method not implemented.')
  }

  async findManyNearBy(latitude: number, longitude: number) {
    throw new Error('Method not implemented.')
  }
}

export { PrismaGymsRepository }
