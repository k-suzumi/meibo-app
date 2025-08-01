import AppFooter from './components/AppFooter.js';
import AppHeader from './components/AppHeader.js';
import { Style, css } from 'hono/css';
import { html } from 'hono/html';
import type { Child, FC, PropsWithChildren } from 'hono/jsx';

const Layout: FC<
  PropsWithChildren<{
    current?: string;
    styles?: Child;
    scripts?: Child;
  }>
> = ({ current, styles, scripts, children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./index.css" />
        <title>Document</title>
        {styles}
      </head>
      <body>
        <AppHeader current={current} />
        <main>{children}</main>
        <AppFooter />
        {scripts}
      </body>
    </html>
  );
};

export default Layout;