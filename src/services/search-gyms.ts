import { GymsRepository } from '@/repositories/interfaces/gym.repository'
import { Gym } from '@prisma/client'

interface SearchGymReq {
  query: string
  page: number
}

interface SearchGymRes {
  gyms: Gym[]
}

class SearchGymService {
  constructor(private gyms: GymsRepository) {}

  async execute({ query, page }: SearchGymReq): Promise<SearchGymRes> {
    const gyms = await this.gyms.searchMany(query, page)

    return {
      gyms,
    }
  }
}

export { SearchGymService }
