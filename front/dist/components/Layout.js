import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
const Layout = ({ current, styles, scripts, children }) => {
    return (_jsxs("html", { lang: "ja", children: [_jsxs("head", { children: [_jsx("meta", { charSet: "UTF-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }), _jsx("title", { children: "\u540D\u523A\u30B5\u30A4\u30C8" }), _jsx("style", { children: `
          body {
            margin: 0;
            font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', sans-serif;
            background-color: #f5f5f5;
            padding: 2rem;
          }
          .meishi-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 4px solid #3b82f6;
            border-radius: 8px;
            overflow: hidden;
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
          }
        ` }), styles] }), _jsxs("body", { children: [_jsxs("div", { className: "meishi-container", children: [_jsx("div", { className: "meishi-title", children: "\u540D\u523A" }), _jsxs("div", { className: "name-grid", children: [_jsx("a", { href: "/yamada", className: `name-item ${current === 'yamada' ? 'active' : ''}`, children: "\u5C71\u7530" }), _jsx("a", { href: "/tanaka", className: `name-item ${current === 'tanaka' ? 'active' : ''}`, children: "\u7530\u4E2D" }), _jsx("a", { href: "/suzuki", className: `name-item ${current === 'suzuki' ? 'active' : ''}`, children: "\u9234\u6728" }), _jsx("a", { href: "/yamamoto", className: `name-item ${current === 'yamamoto' ? 'active' : ''}`, children: "\u5C71\u672C" })] }), _jsx("main", { className: "content", children: children }), _jsx("footer", { className: "footer", children: "\u00A9 2025 \u540D\u523A\u30B5\u30A4\u30C8" })] }), scripts] })] }));
};
export default Layout;
