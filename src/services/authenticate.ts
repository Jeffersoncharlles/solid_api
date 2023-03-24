import { compare } from 'bcryptjs'
import { UsersRepository } from '../repositories/interfaces/users.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateReq {
  email: string
  password: string
}

class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateReq) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

export { AuthenticateService }
