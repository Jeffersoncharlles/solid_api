import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../interfaces/check-ins.repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

class PrismaCheckInsRepository implements CheckInRepository {
  //= =====================================================================//
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  //= =====================================================================//

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInDay = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(), // apos esse dia especifico
          lte: endOfTheDay.toDate(), // e que a data de criação seja antes do final do dia
        },
      },
    })

    return checkInDay
  }

  //= =====================================================================//
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20, // quantos itens trazer
      skip: (page - 1) * 20, // ele vai pegar a pagina e multiplicar por 20
    })

    return checkIns
  }

  //= =====================================================================//
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  //= =====================================================================//
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  //= =====================================================================//
  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
  //= =====================================================================//
}

export { PrismaCheckInsRepository }
