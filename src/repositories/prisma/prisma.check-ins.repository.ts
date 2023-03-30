import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../interfaces/check-ins.repository'

class PrismaCheckInsRepository implements CheckInRepository {
  //= =====================================================================//
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }

  //= =====================================================================//

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  //= =====================================================================//
  async findManyByUserId(userId: string): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }

  //= =====================================================================//
  async countByUserId(userId: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  //= =====================================================================//
  async findById(id: string): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  //= =====================================================================//
  async save(checkIn: CheckIn): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }
  //= =====================================================================//
}

export { PrismaCheckInsRepository }
