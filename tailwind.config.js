/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo[600],
        dbg:'#05061B',
        dcard:'#070E27'

      }
    },
  },
  plugins: [],
}