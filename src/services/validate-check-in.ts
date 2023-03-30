import { CheckInRepository } from '@/repositories/interfaces/check-ins.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateReq {
  checkInId: string
}

export class ValidateCheckInService {
  constructor(private checkInsR: CheckInRepository) {}

  async execute({ checkInId }: ValidateReq) {
    const checkIn = await this.checkInsR.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    checkIn.validated_at = new Date()

    await this.checkInsR.save(checkIn)

    return {
      checkIn,
    }
  }
}
