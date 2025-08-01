import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import AppFooter from './components/AppFooter.js';
import AppHeader from './components/AppHeader.js';
import { Style, css } from 'hono/css';
import { html } from 'hono/html';
const Layout = ({ current, styles, scripts, children }) => {
    return (_jsxs("html", { lang: "ja", children: [_jsxs("head", { children: [_jsx("meta", { charSet: "UTF-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }), _jsx("link", { rel: "stylesheet", href: "./index.css" }), _jsx("title", { children: "Document" }), styles] }), _jsxs("body", { children: [_jsx(AppHeader, { current: current }), _jsx("main", { children: children }), _jsx(AppFooter, {}), scripts] })] }));
};
export default Layout;
