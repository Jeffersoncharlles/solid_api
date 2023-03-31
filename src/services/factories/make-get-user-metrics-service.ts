import { GetUserMetricsService } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins.repository'

export function makeGetUserMetricsService() {
  const prismCheckIn = new PrismaCheckInsRepository()
  const userMetrics = new GetUserMetricsService(prismCheckIn)

  return userMetrics
}
