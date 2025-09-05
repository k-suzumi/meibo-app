import type { Child, FC, PropsWithChildren } from 'hono/jsx';
import AppFooter from '../common/AppFooter.js';
import AppHeader from '../common/AppHeader.js';

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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>名簿サイト</title>
        <style>{`
        body {
            height: 100vh;
            margin: 0;
            font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', sans-serif;
            background-color: #f5f5f5;
            display: flex;
            flex-direction: column;
        }
        main {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .meishi-container {
            margin: 0 auto;
            background: white;
            overflow: hidden;
            flex: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .meishi-title {
            text-align: center;
            padding: 2rem;
            font-size: 2.5rem;
            font-weight: bold;
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
        }
        .name-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border-bottom: 2px solid #e5e7eb;
        }
        .name-item {
            padding: 2rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 500;
            color: #374151;
            text-decoration: none;
            border-right: 1px solid #e5e7eb;
            transition: all 0.2s;
        }
        .name-item:last-child {
            border-right: none;
        }
        .name-item:hover {
            background-color: #f9fafb;
        }
        .name-item.active {
            background-color: #eff6ff;
            color: #2563eb;
        }
        .content {
            padding: 3rem;
            flex: 1;
        }
        .detail-item {
            display: flex;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }
        .detail-label {
            font-weight: 500;
            color: #374151;
            width: 5rem;
        }
        .detail-value {
            color: #6b7280;
        }
        .footer {
            text-align: center;
            padding: 1rem;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            margin-top: auto;
        }
    `}</style>
        {styles}
      </head>
      <body>
        <div className="meishi-container">
          <AppHeader current={current} />
          <main className="content">
            {children}
          </main>
          <AppFooter></AppFooter>
        </div>
        {scripts}
      </body>
    </html>
  );
};

export default Layout;