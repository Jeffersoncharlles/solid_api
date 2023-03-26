import { CheckInRepository } from '@/repositories/interfaces/check-ins.repository'
import { CheckIn } from '@prisma/client'

interface CheckInReq {
  userId: string
  gymIn: string
}

interface CheckInResponse {
  checkIn: CheckIn
}

class CheckInService {
  constructor(private checkIns: CheckInRepository) {}

  async execute({ gymIn, userId }: CheckInReq): Promise<CheckInResponse> {
    const checkInOnSameDay = await this.checkIns.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkIns.create({
      gym_id: gymIn,
      user_id: userId,
    })

    return { checkIn }
  }
}

export { CheckInService }
