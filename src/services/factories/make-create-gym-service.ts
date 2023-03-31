import { CreateGymsService } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository'

export function makeCreateGymService() {
  const prismaGym = new PrismaGymsRepository()
  const createGym = new CreateGymsService(prismaGym)

  return createGym
}
