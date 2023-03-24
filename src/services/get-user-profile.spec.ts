import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfile } from './get-user-profile'

let users: InMemoryUsersRepository
let sut: GetUserProfile

describe('Get User Profile Service', async () => {
  beforeEach(() => {
    users = new InMemoryUsersRepository()
    sut = new GetUserProfile(users)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to get user profile', async () => {
    const createUser = await users.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    expect(user.id).toEqual(expect.any(String)) // espero que o id seja igual a qualquer string
    expect(user.name).toEqual('John Doe')
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
