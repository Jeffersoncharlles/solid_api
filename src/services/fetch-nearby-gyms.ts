import { GymsRepository } from '@/repositories/interfaces/gym.repository'
import { Gym } from '@prisma/client'

interface NearByGymReq {
  userLatitude: number
  userLongitude: number
}

interface NearByGymRes {
  gyms: Gym[]
}

class FetchNearByGymsService {
  constructor(private gymsR: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: NearByGymReq): Promise<NearByGymRes> {
    const gyms = await this.gymsR.findManyNearBy({
      latitude: userLatitude,
      longitude: userLatitude,
    })

    return {
      gyms,
    }
  }
}

export { FetchNearByGymsService }
