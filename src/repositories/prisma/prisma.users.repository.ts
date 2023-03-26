import { prima } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../interfaces/users.repository'

export class PrismaUsersRepository implements UsersRepository {
  //= =========================================================//
  async findByEmail(email: string): Promise<User | null> {
    const user = await prima.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  //= =========================================================//
  async create(data: Prisma.UserCreateInput) {
    const user = await prima.user.create({
      data,
    })

    return user
  }

  //= =========================================================//
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
}