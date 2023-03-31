import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins.repository'
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryService() {
  const prisma = new PrismaCheckInsRepository()
  const fetchUserCheck = new FetchUserCheckInsHistoryService(prisma)

  return fetchUserCheck
}
