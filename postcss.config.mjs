export default {
  plugins: {
    '@tailwindcss/postcss': {}, // 1. 先跑 Tailwind v4 生成原始 CSS (带 @layer 和 oklch)
    'postcss-preset-env': {     // 2. 后跑这个，负责“剥壳”和“转化”
      stage: 2,
      features: {
        'cascade-layers': true, // 核心：自动删掉 @layer utilities 等外壳，兼容旧 Safari
        'oklch-function': true  // 核心：把 oklch 颜色转为 rgb，解决颜色不显示问题
      }
    },
    'autoprefixer': {},         // 3. 最后加前缀
  },
}