//apiの送受信だけ
import { FastifyRequest, FastifyReply } from 'fastify';
import { getPersonUseCase } from 'src/useCases/person';

interface GetPersonParams {
  id: string;
}

export const getPerson = async (
  request: FastifyRequest<{ Params: GetPersonParams }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const personId = parseInt(id);

  const person = await getPersonUseCase(personId);

  if (!person) {
    return reply.code(404).send({ error: 'Not found' });
  }

  return person;
};