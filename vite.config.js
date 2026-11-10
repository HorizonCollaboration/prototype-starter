// Fixed by Horizon: don't change this file.
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * The published prototype can't load scripts from, or send anything to,
 * another website. Added only to the built page, so local development works.
 */
const CONTENT_SECURITY_POLICY = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "form-action 'none'",
    "base-uri 'none'",
    "object-src 'none'",
].join('; ');

const securityPolicy = {
    name: 'horizon-security-policy',
    apply: 'build',
    transformIndexHtml: (html) =>
        html.replace(
            '<head>',
            `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY}">`,
        ),
};

export default defineConfig({
    base: './',
    plugins: [react(), tailwindcss(), securityPolicy],
});
