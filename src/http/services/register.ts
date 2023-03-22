import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/interfaces/users.repository'
import { UserAlreadyExistsError } from './errors/users-already-exists-error'

interface Register {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: Register) {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    await this.usersRepository.create({ email, name, password_hash })
  }
}
