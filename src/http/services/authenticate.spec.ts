import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let users: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', async () => {
  beforeEach(() => {
    users = new InMemoryUsersRepository()
    sut = new AuthenticateService(users)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to authenticate', async () => {
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
  //= ==========================================================//
  //= ==========================================================//
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should not be able to authenticate with wrong password', async () => {
    // await users.create({
    //   name: 'John Doe',
    //   email: 'johndoe@exemple.com',
    //   password_hash: await hash('123456', 6),
    // })

    await expect(() =>
      sut.execute({
        email: 'johndoe@exemple.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
