import { CheckInRepository } from '@/repositories/interfaces/check-ins.repository'

interface CheckInReq {
  userId: string
  gymIn: string
}

class CheckInService {
  constructor(private checkIns: CheckInRepository) {}

  async execute({ gymIn, userId }: CheckInReq) {
    const checkIn = await this.checkIns.create({
      gym_id: gymIn,
      user_id: userId,
    })

    return { checkIn }
  }
}

export { CheckInService }
