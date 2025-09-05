import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import Yamada from '../src/components/pages/yamada.js';
import Tanaka from '../src/components/pages/tanaka.js';
import Suzuki from '../src/components/pages/suzuki.js';
import Yamamoto from '../src/components/pages/yamamoto.js';
import { serveStatic } from '@hono/node-server/serve-static'
import path from 'path';

const app = new Hono();

const API_URL = `http://${process.env.API_URL}:3001` || 'http://localhost:3001';

// app.get('/', (c) => {
//   return c.redirect('/login');
// });

// 実際に静的ファイルを返すミドルウェア
app.use('/dist/*', serveStatic({ root: './' }))
app.use('/static/*', serveStatic({ root: './' }))

app.get('/yamada', async (c) => {
  try {
    const response = await fetch(`${API_URL}/api/person/3`);
    const person = await response.json();
    return c.html(<Yamada person={person} />);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return c.html(<Yamada person={null} />);
  }
});

app.get('/tanaka', async (c) => {
  try {
    const response = await fetch(`${API_URL}/api/person/2`);
    const person = await response.json();
    return c.html(<Tanaka person={person} />);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return c.html(<Tanaka person={null} />);
  }
});

app.get('/suzuki', async (c) => {
  try {
    const response = await fetch(`${API_URL}/api/person/1`);
    const person = await response.json();
    return c.html(<Suzuki person={person} />);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return c.html(<Suzuki person={null} />);
  }
});

app.get('/yamamoto', async (c) => {
  try {
    const response = await fetch(`${API_URL}/api/person/4`);
    const person = await response.json();
    return c.html(<Yamamoto person={person} />);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return c.html(<Yamamoto person={null} />);
  }
});

// ログインフォームを表示
app.get('/login', async (c) => {
  return c.html(
    `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Login</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/dist/assets/login-CBvZafXU.js"></script>
      </body>
    </html>
    `);
});


// app.get('/dashboard', async (c) => {
//   const token = getCookie(c, 'token');

//   if (!token) {
//     console.log('No token found, redirecting to login');
//     return c.redirect('/login');
//   }

//   try {
//     const response = await fetch(`${API_URL}/profile`, {
//       headers: {
//         'Cookie': `token=${token}`
//       }
//     });

//     if (response.ok) {
//       const user = await response.json();
//       console.log('User authenticated:', user);
//       return c.html(<Dashboard />);
//     } else {
//       console.log('Token validation failed, redirecting to login');
//       return c.redirect('/login');
//     }
//   } catch (error) {
//     console.error('Authentication error:', error);
//     return c.redirect('/login');
//   }
// });

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Hono server is running on http://localhost:${info.port}`);
});