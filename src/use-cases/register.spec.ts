import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { describe, expect, it, test } from 'vitest';
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersAlreadyExistisError } from './erros/user-already-exists-error';
import { compare } from 'bcryptjs';

describe('Register Use Case', () => {
  it('shold to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'Cicrano de tal',
      email: 'cicrano@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('shold hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = 'cicrano@gmail.com';

    await registerUseCase.execute({
      name: 'Cicrano de tal',
      email,
      password: '123456',
    });

    expect(() =>
      registerUseCase.execute({
        name: 'Cicrano de tal',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UsersAlreadyExistisError);
  });
});
