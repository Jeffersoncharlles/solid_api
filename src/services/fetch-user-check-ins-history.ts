import { CheckInRepository } from '@/repositories/interfaces/check-ins.repository'
import { CheckIn } from '@prisma/client'

interface FetchReq {
  userId: string
  page: number
}

interface FetchRes {
  checkIns: CheckIn[]
}

class FetchUserCheckInsHistoryService {
  constructor(private checkIns: CheckInRepository) {}

  async execute({ userId, page }: FetchReq): Promise<FetchRes> {
    const checkIns = await this.checkIns.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}

export { FetchUserCheckInsHistoryService }
