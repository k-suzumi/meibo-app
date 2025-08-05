import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import Yamada from './components/pages/yamada.js';
import Tanaka from './components/pages/tanaka.js';
import Suzuki from './components/pages/suzuki.js';
import Yamamoto from './components/pages/yamamoto.js'

const app = new Hono();

// ルート定義
app.get('/', (c) => {
  return c.redirect('/yamada');
});

app.get('/yamada',  async (c) => {try {
    // サーバーでデータを取得
    const response = await fetch('http://localhost:3001/api/person/3');
    const person = await response.json();
    console.log(person)
    return c.html(<Yamada person={person} />);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return c.html(<Yamada person={null} />);
  }
});

app.get('/tanaka',  async (c) => {try {
    // サーバーでデータを取得
    const response = await fetch('http://localhost:3001/api/person/2');
    const person = await response.json();
    console.log(person)
    return c.html(<Tanaka person={person} />);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return c.html(<Tanaka person={null} />);
  }
});

app.get('/suzuki', async (c) => { try {
    // サーバーでデータを取得
    const response = await fetch('http://localhost:3001/api/person/1');
    const person = await response.json();
    console.log(person)
    return c.html(<Suzuki person={person} />);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return c.html(<Suzuki person={null} />);
  }
});

app.get('/yamamoto', async (c) => {try {
    // サーバーでデータを取得
    const response = await fetch('http://localhost:3001/api/person/4');
    const person = await response.json();
    console.log(person)
    return c.html(<Yamamoto person={person} />);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return c.html(<Yamamoto person={null} />);
  }
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})