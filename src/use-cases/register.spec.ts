import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { describe, expect, it, test } from 'vitest';
import { RegisterUseCase } from './register';

describe('Register Use Case', () => {
  it('shold hash user password upon registration', async () => {
    const prismaUserRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUserRepository);

    await registerUseCase.execute({
      name: 'Cicrano de tal',
      email: 'cicrano@gmail.com',
      password: '123456',
    });
  });
});
