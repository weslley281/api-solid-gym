import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UsersAlreadyExistisError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err: any) {
    if (err instanceof UsersAlreadyExistisError) {
      return reply.status(409).send();
    }
    throw err;
  }

  return reply.status(201).send();
}
