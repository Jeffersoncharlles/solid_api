import { UsersRepository } from '../repositories/interfaces/users.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileReq {
  userId: string
}

class GetUserProfile {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileReq) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}

export { GetUserProfile }
