import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import Yamada from '../src/components/pages/yamada.js';
import Tanaka from '../src/components/pages/tanaka.js';
import Suzuki from '../src/components/pages/suzuki.js';
import Yamamoto from '../src/components/pages/yamamoto.js';
import { serveStatic } from '@hono/node-server/serve-static'
import { loadAssets } from '../SearchFiles.js';


const assets = loadAssets();
const loginJS = assets.loginJS;
const dashboardJS = assets.dashboardJS;
const app = new Hono();

const API_URL = `http://${process.env.API_URL}:3001` || 'http://localhost:3001';

app.get('/', (c) => {
  return c.redirect('/login');
});

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
        <script type="module" src="/dist/assets/${loginJS}"></script>
      </body>
    </html>
    `);
});


app.get('/dashboard', async (c) => {
  return c.html(
    `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Login</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/dist/assets/${dashboardJS}"></script>
      </body>
    </html>
    `);
}
);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Hono server is running on http://localhost:${info.port}`);
});