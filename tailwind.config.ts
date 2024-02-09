import type { Config } from 'tailwindcss';

const config: Config = {
    mode: 'jit',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                main: '#c1d5e9',
                back: '#1a1b1c',
                darkMain: '#111112',
                discordBlue: '#5964f2'
            },
        },
    },
    plugins: [],
};
export default config;
