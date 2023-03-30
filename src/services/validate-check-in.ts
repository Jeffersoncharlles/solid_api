import { CheckInRepository } from '@/repositories/interfaces/check-ins.repository'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateReq {
  checkInId: string
}

export class ValidateCheckInService {
  constructor(private checkInsR: CheckInRepository) {}

  async execute({ checkInId }: ValidateReq) {
    const checkIn = await this.checkInsR.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    ) // calcular future from pass

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsR.save(checkIn)

    return {
      checkIn,
    }
  }
}
