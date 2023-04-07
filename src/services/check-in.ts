import { CheckInRepository } from '@/repositories/interfaces/check-ins.repository'
import { GymsRepository } from '@/repositories/interfaces/gym.repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-cordinates'
import { CheckIn } from '@prisma/client'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInError } from './errors/max-number0of-check-ins-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInReq {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInResponse {
  checkIn: CheckIn
}

class CheckInService {
  constructor(
    private checkIns: CheckInRepository,
    private gyms: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInReq): Promise<CheckInResponse> {
    const gym = await this.gyms.findById(gymId)

    if (!gym) throw new ResourceNotFoundError()

    // exists calculate distance between user and gym

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE = 0.1 // 100 METROS

    if (distance > MAX_DISTANCE) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkIns.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInError()
    }

    const checkIn = await this.checkIns.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}

export { CheckInService }
