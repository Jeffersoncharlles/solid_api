import { Prisma } from '@prisma/client'
import { GymsRepository } from '../interfaces/gym.repository'
import { prisma } from '@/lib/prisma'

class PrismaGymsRepository implements GymsRepository {
  //= ==============================================//
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  //= ==============================================//
  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  //= ==============================================//
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query, // contem
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  //= ==============================================//
  async findManyNearBy(latitude: number, longitude: number) {
    const gymDistance = await prisma.gym

    // SELECT * from gyms
    // WHERE(6371 * acos(cos(radians(${ latitude })) * cos(radians(latitude)) * cos(radians(longitude) - radians(${ longitude })) + sin(radians(${ latitude })) * sin(radians(latitude)))) <= 10

    return gymDistance
  }
  //= ==============================================//
}

export { PrismaGymsRepository }
