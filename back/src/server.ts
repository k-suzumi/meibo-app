import Fastify from 'fastify';
import cors from '@fastify/cors';
import { personRoutes } from './routes/person.js';
import jwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    authorize: (requiredRole: string) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

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

  await fastify.register(fastifyCookie);

  await fastify.register(jwt, {
    secret: 'super-secret-key', // 実運用は環境変数で！
    cookie: {
      cookieName: 'token',
      signed: false
    }
  });

  fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.decorate("authorize", function (requiredRole: string) {
    return async function (request: any, reply: any) {
      if (request.user.role !== requiredRole) {
        reply.code(403).send({ error: 'Forbidden', message: 'あなたにはこの操作を行う権限がありません。' });
      }
    }
  });

  const mockUsers = [
    { id: 'user-123', email: 'test@example.com', password: 'pass123', role: 'user' },
    { id: 'admin-001', email: 'admin@example.com', password: 'pass123', role: 'admin' }
  ];

  // ヘルスチェックを先に定義
  fastify.get('/api/healthcheck', async () => {
    return { status: 'healthy' };
  });

  fastify.post('/api/login', async (request, reply) => {
    const { email, password } = request.body as any;
    fastify.log.info(`Login attempt for email: ${email}`);

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      fastify.log.info(`User found: ${user.email}, role: ${user.role}`);
      const payload = { userId: user.id, role: user.role };

      const token = await reply.jwtSign(payload, { expiresIn: '15m' });
      fastify.log.info(`JWT token generated for user: ${user.email}`);

      reply.setCookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      fastify.log.info(`Cookie set for user: ${user.email}`);

      fastify.log.info(`Redirecting to dashboard for user: ${user.email}`);
      return reply.code(200).send({ message: 'Login successful' });
    }

    fastify.log.warn(`Login failed for email: ${email}`);
    return reply.code(401).send({ error: 'Invalid credentials' });
  });

  fastify.get('/api/profile', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    return { message: '認証OK', user: request.user };
  });

  fastify.get(
    '/api/admin/users',
    {
      preHandler: [
        fastify.authenticate,
        fastify.authorize('admin')
      ]
    },
    async (request, reply) => {
      return { message: 'ようこそ管理者様。' };
    }
  );

  await fastify.register(personRoutes);

  await fastify.listen({ port: 3001, host: '0.0.0.0' });
  console.log('Fastify server running on http://localhost:3001');
}

main().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});