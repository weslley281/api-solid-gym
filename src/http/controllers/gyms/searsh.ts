import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function searsh(request: FastifyRequest, response: FastifyReply) {
  const searshGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searshGymsQuerySchema.parse(request.query);

  const searshGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searshGymsUseCase.execute({ query, page });

  return response.status(200).send({ gyms });
}
