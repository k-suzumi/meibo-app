import { jsx as _jsx } from "hono/jsx/jsx-runtime";
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import Yamada from './components/pages/yamada.js';
import Tanaka from './components/pages/tanaka.js';
import Suzuki from './components/pages/suzuki.js';
import Yamamoto from './components/pages/yamamoto.js';
const app = new Hono();
// ルート定義
app.get('/', (c) => {
    return c.redirect('/yamada');
});
app.get('/yamada', (c) => {
    return c.html(_jsx(Yamada, {}));
});
app.get('/tanaka', (c) => {
    return c.html(_jsx(Tanaka, {}));
});
app.get('/suzuki', (c) => {
    return c.html(_jsx(Suzuki, {}));
});
app.get('/yamamoto', (c) => {
    return c.html(_jsx(Yamamoto, {}));
});
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
