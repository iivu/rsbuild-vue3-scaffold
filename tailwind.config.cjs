// 0.01rem ~ 7.5rem
function spacing() {
  const spacing = {}
  for (let i = 1; i <= 750; i += 1) {
    spacing[i] = `${(i * 0.01).toFixed(2)}rem`
  }
  return spacing
}

// 0.02rem ~ 0.4rem
function borderRadius() {
  const borderRadius = {}
  for (let i = 1; i <= 20; i += 1) {
    borderRadius[i] = `${i * 0.02}rem`
  }
  return borderRadius
}

// 0.12rem ~ 0.96rem
function fontSize() {
  const min = 12, max = 96, step = 2;
  const fontSize = {};
  for (let i = min; i <= max; i += step) {
    fontSize[i] = [`${i / 100}rem`, '1.5'];
  }
  return fontSize;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    fontSize: fontSize(),
    spacing: {
      '0': '0px',
      'px': '1px',
      ...spacing(),
    },
    borderRadius: borderRadius(),
    extend: {},
  },
  plugins: [],
};