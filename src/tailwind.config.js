module.exports = {
  mode: 'jit',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'mb-blue-deep': '#00043b',
        'mb-blue-bright': '#37b7ff',
        'mb-blue-classic': '#134f9a',
        'mb-red-accent': 'rgba(211, 87, 104, 0.8)',
        'mb-violet': '#8a2be2',
      },
      boxShadow: {
        'glow-blue': '0 0 15px #134f9a',
        'glow-lumina': '0 0 20px #37b7ff, 0 0 5px #ffffff',
        'glow-red': '0 0 20px rgba(211, 87, 104, 0.8)',
      },
      textShadow: {
        'glow-blue': '0 0 5px #a6d5ef',
        'glow-lumina': '0 0 10px #37b7ff, 0 0 2px #ffffff',
      }
    },
  },
  plugins: [],
}
