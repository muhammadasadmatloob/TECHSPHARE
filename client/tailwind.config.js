/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stage: "#050505",
        panel: {
          bg: "rgba(18, 18, 18, 0.65)",
          solid: "#121212",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.22)"
        },
        ink: {
          primary: "#fafafa",
          secondary: "#a7a6a6",
          muted: "#666666"
        },
        accent: {
          cyan: "#00f0ff",
          purple: "#7000ff",
          glow: "rgba(255, 255, 255, 0.15)"
        }
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
