import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins.repository'
import { CheckInService } from '../check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository'

export function makeCheckInService() {
  const prismaCheckIn = new PrismaCheckInsRepository()
  const prismaGym = new PrismaGymsRepository()
  const checkIn = new CheckInService(prismaCheckIn, prismaGym)

  return checkIn
}
