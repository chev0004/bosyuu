import type { Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';

const config: Config = {
    mode: 'jit',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '1024px',
            lg: '1280px',
        },
        extend: {
            colors: {
                main: '#c1d5e9',
                back: '#1a1b1c',
                darkMain: '#111111',
                lightMain: '#707070',
                darkerMain: '#090909',
                discordBlue: '#5964f2',
            },
            dropShadow: {
                glow: [
                    '0 0px 2px rgba(255, 255, 255, 0.9)',
                    '0 0px 2px rgba(255, 255, 255, 0.9)',
                ],
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
export default config;
