import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, findManyParams } from '../interfaces/gym.repository'
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
  async findManyNearBy({ latitude, longitude }: findManyParams) {
    const gymDistance = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE(6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude)))) <= 10
    ` // pegar o resultado e ver se a distancia em km e menor ou igual a 10 km

    return gymDistance
  }
  //= ==============================================//
}

export { PrismaGymsRepository }
