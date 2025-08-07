//apiの送受信だけ
import { FastifyRequest, FastifyReply } from 'fastify';
import { getPersonUseCase } from 'src/useCases/person';

export const getPerson = async (request: FastifyRequest, reply: FastifyReply) => {

  const { id } = request.params as { id: string };
  const personId = parseInt(id);

  const person = await getPersonUseCase(personId);

  if (!person) {
    return reply.code(404).send({ error: 'Not found' });
  }

  return person;
};