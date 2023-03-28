import { CheckInRepository } from '@/repositories/interfaces/check-ins.repository'

interface UserMetricsReq {
  userId: string
}

interface UserMetricsRes {
  checkInsCount: number
}

class GetUserMetricsService {
  constructor(private checkIns: CheckInRepository) {}

  async execute({ userId }: UserMetricsReq): Promise<UserMetricsRes> {
    const checkInsCount = await this.checkIns.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}

export { GetUserMetricsService }
