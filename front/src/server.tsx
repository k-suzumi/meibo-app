import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import Yamada from './components/pages/yamada.js';
import Tanaka from './components/pages/tanaka.js';
import Suzuki from './components/pages/suzuki.js';
import Yamamoto from './components/pages/yamamoto.js';

const app = new Hono();

const API_URL = `http://${process.env.API_URL}:3001` || 'http://localhost:3001';

app.get('/', (c) => {
  return c.redirect('/yamada');
});

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
app.get('/login', (c) => {
  return c.html(`
    <h1>ログイン</h1>
    <form action="/login" method="post">
      <input name="email" value="test@example.com"/>
      <input name="password" value="pass123"/>
      <button type="submit">ログイン</button>
    </form>
  `);
});

// ログイン処理：Fastify API にPOST
app.post('/login', async (c) => {
  const form = await c.req.parseBody();
  const email = form.email;
  const password = form.password;

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    return c.text('ログイン失敗');
  }
  // FastifyからトークンをJSONで受け取る
  const data = await res.json();
  if (data.token) {
    // HonoがブラウザにCookieをセットする
    setCookie(c, 'token', data.token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 15
    });
    return c.redirect('/dashboard');
  }
  return c.text('トークンが取得できませんでした');
})

// 認証が必要なページ（手動テスト用）
app.get('/dashboard', async (c) => {
  // ブラウザからのリクエストに含まれる 'token' Cookieを取得
  const token = getCookie(c, 'token');

  // Cookieがなければログインページへ
  if (!token) {
    return c.redirect('/login');
  }

  // Fastifyへのリクエストに、取得したCookieをそのまま転送する
  const res = await fetch(`${API_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // トークンが無効・期限切れの場合
  if (!res.ok) {
    deleteCookie(c, 'token');
    return c.redirect('/login');
  }

  const profile = await res.json();
  // 取得したプロフィール情報を表示
  return c.html(`
    <h1>ダッシュボード</h1>
    <p>ようこそ！これは保護されたページです。</p>
    <pre>${JSON.stringify(profile, null, 2)}</pre>
  `);
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://${process.env.API_URL}:${info.port}`)
})