// backend/server.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { personRoutes } from './routes/person.js';
import dotenv from 'dotenv';
dotenv.config();

const fastify = Fastify({ logger: true });

async function main() {
  await fastify.register(cors, {
    origin: 'http://localhost:5173',
  });

  await fastify.register(personRoutes);

  await fastify.listen({ port: 3001 });
  console.log('🚀 Server running on http://localhost:3001');
}

main().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
