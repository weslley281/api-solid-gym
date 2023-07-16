import { beforeEach, describe, expect, it, test } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('shold to authenticate', async () => {
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

  it('shold not v', async () => {
    expect(() =>
      sut.execute({
        email: 'cicrano@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'Cicrano de tal',
      email: 'cicrano@gmail.com',
      password_hash: await hash('123456', 6),
    });

    expect(() =>
      sut.execute({
        email: 'fulano@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Cicrano de tal',
      email: 'cicrano@gmail.com',
      password_hash: await hash('123456', 6),
    });

    expect(() =>
      sut.execute({
        email: 'cicrano@gmail.com',
        password: '123458',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
