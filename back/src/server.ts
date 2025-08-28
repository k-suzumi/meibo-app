import Fastify from 'fastify';
import cors from '@fastify/cors';
import { personRoutes } from './routes/person.js';
import jwt from '@fastify/jwt';

const fastify = Fastify({
  logger: {
    transport: { target: "@fastify/one-line-logger" },
  },
});

async function main() {
  await fastify.register(cors, {
    origin: 'http://localhost:3000',
    credentials: true,
  });

  fastify.register(jwt, {
    secret: 'super-secret-key', // 実運用は環境変数で！
  });

  fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as any;

    if (email === 'test@example.com' && password === 'pass123') {
      const token = fastify.jwt.sign({ userId: 'user-123', role: 'user' }, { expiresIn: '15m' });
      // Cookieを設定する代わりに、JSONレスポンスでトークンを返す
      return { token };
    }
    return reply.code(401).send({ error: 'Invalid credentials' });
  });

  fastify.get('/profile', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    return { message: '認証OK', user: request.user };
  });

  await fastify.register(personRoutes);

  await fastify.listen({ port: 3001, host: '0.0.0.0' });
}

fastify.get('/healthcheck', () => {
  return { status: 'healthy' };
});

main().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
