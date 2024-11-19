/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#c084fc",
                secondary: "#eff6ff",
            },
        },
    },
    plugins: [],
};
