/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            borderRadius: {
                judo: '10px',
            },
            boxShadow: {
                judo: '0 0 6px 0 rgba(0,0,0,0.20)',
            },
            colors: {
                'judo-purple': '#9A48D6',
            },
        },
    },
    plugins: [],
}
