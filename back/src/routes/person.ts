//ルーティングだけ
import { FastifyInstance } from 'fastify';
import { getPerson } from 'src/controllers/person';

export async function personRoutes(fastify: FastifyInstance) {
  fastify.get('/api/person/:id', getPerson);
}