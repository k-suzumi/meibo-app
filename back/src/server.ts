import Fastify from 'fastify';
import cors from '@fastify/cors';
import { personRoutes } from './routes/person.js';

const fastify = Fastify({
  logger: {
    transport: { target: "@fastify/one-line-logger" },
  },
});

async function main() {
  await fastify.register(cors, {
    origin: 'http://localhost:3000',
  });

  await fastify.register(personRoutes);

  await fastify.listen({ port: 3001, host: '0.0.0.0' });
  console.log('🚀 Server running on http://localhost:3001');
}
fastify.get('/healthcheck', () => {
  return { status: 'healthy' };
});

main().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
