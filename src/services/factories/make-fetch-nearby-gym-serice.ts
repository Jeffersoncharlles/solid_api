import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository'
import { FetchNearByGymsService } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymService() {
  const prisma = new PrismaGymsRepository()
  const gyms = new FetchNearByGymsService(prisma)

  return gyms
}
