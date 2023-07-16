import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersAlreadyExistisError } from './errors/user-already-exists-error';
import { compare } from 'bcryptjs';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('shold to register', async () => {
    const { user } = await sut.execute({
      name: 'Cicrano de tal',
      email: 'cicrano@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('shold hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Cicrano de tal',
      email: 'cicrano@gmail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('shold not be able to register with same email twice', async () => {
    const email = 'cicrano@gmail.com';

    await sut.execute({
      name: 'Cicrano de tal',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'Cicrano de tal',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UsersAlreadyExistisError);
  });
});
