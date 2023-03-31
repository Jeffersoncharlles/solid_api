import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { GetUserProfile } from '../get-user-profile'

export function makeGetUserProfileService() {
  const prismaUser = new PrismaUsersRepository()
  const userProfile = new GetUserProfile(prismaUser)

  return userProfile
}
