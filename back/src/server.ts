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
  fastify.get('/healthcheck', async () => {
    return { status: 'healthy' };
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as any;
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      const token = fastify.jwt.sign({ userId: user.id, role: user.role }, { expiresIn: '15m' });
      
      reply.setCookie('token', token, {
        path: '/',
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax'
      });

      return { message: 'ログイン成功', user: { email: user.email, role: user.role }, token }; // tokenも返す
    }
    return reply.code(401).send({ error: 'Invalid credentials' });
  });

  fastify.get('/profile', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    return { message: '認証OK', user: request.user };
  });

  fastify.get(
    '/admin/users',
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