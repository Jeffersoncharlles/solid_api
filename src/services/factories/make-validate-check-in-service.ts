import { ValidateCheckInService } from '../validate-check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins.repository'

export function makeValidateCheckInService() {
  const prismaCheckIn = new PrismaCheckInsRepository()
  const validateCheckIn = new ValidateCheckInService(prismaCheckIn)

  return validateCheckIn
}
