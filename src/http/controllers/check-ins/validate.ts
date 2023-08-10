import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use.case';
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function validate(
  request: FastifyRequest,
  response: FastifyReply
) {
  const validateCheckInParamsBodySchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsBodySchema.parse(request.body);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return response.status(204).send();
}
