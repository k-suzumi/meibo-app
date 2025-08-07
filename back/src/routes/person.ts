import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function personRoutes(fastify: FastifyInstance) {
  fastify.get('/api/person/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const person = await prisma.person.findUnique({
      where: { id: parseInt(id) },
      include: { hobbies: { include: { hobby: true } } },
    });

    if (!person) {
      return reply.code(404).send({ error: 'Not found' });
    }

    return {
      name: person.name,
      gender: person.gender,
      job: person.job,
      hobbies: person.hobbies.map((h:any) => h.hobby.name),
    };
  });
}
