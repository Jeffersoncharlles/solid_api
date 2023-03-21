import { prima } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterService {
  name: string
  email: string
  password: string
}

export const registerService = async ({
  email,
  name,
  password,
}: RegisterService) => {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prima.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  await prima.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
