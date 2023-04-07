import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository'
import { SearchGymService } from '../search-gyms'

export function makeSearchGymsService() {
  const prismaGym = new PrismaGymsRepository()
  const search = new SearchGymService(prismaGym)

  return search
}
