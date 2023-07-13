import { describe, expect, it, test } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';

describe('Authenticate Use Case', () => {
  it('shold to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: 'Cicrano de tal',
      email: 'cicrano@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'cicrano@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
