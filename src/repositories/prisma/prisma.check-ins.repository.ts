import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../interfaces/check-ins.repository'

class PrismaCheckInsRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }
}

export { PrismaCheckInsRepository }
