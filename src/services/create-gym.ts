import { GymsRepository } from '@/repositories/interfaces/gym.repository'
import { Gym } from '@prisma/client'

interface CreateGym {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymResp {
  gym: Gym
}

export class CreateGymsService {
  constructor(private gyms: GymsRepository) {}

  async execute({
    description,
    phone,
    title,
    latitude,
    longitude,
  }: CreateGym): Promise<CreateGymResp> {
    const gym = await this.gyms.create({
      latitude,
      longitude,
      title,
      phone,
      description,
    })

    return {
      gym,
    }
  }
}
