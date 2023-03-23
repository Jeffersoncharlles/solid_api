import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/users-already-exists-error'
import { RegisterService } from './register'

describe('Register Service', async () => {
  //= ==========================================================//
  //= ==========================================================//
  it('should be able to register', async () => {
    const registerMemory = new InMemoryUsersRepository()
    const registerService = new RegisterService(registerMemory)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String)) // espero que o id seja igual a qualquer string
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should hash user password upon registration', async () => {
    const registerMemory = new InMemoryUsersRepository()
    const registerService = new RegisterService(registerMemory)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  //= ==========================================================//
  //= ==========================================================//
  it('should not be able to register with same email twice', async () => {
    const registerMemory = new InMemoryUsersRepository()
    const registerService = new RegisterService(registerMemory)

    const email = 'johndoe@exemple.com'

    await registerService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })
    expect(() =>
      registerService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
  //= ==========================================================//
  //= ==========================================================//
})
