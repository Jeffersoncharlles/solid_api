import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'

let users: InMemoryUsersRepository
let sut: AuthenticateService

describe('Get User Profile Service', async () => {
  beforeEach(() => {
    users = new InMemoryUsersRepository()
    sut = new AuthenticateService(users)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able get to profile', async () => {
    await users.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String)) // espero que o id seja igual a qualquer string
  })
})
