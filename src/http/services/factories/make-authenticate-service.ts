import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma.users.repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(prismaUsersRepository)

  return authenticateService
}
