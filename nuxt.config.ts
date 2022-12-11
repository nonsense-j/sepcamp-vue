// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  plugins: [
    { src: "~/plugins/rsa.js", mode: "client" }
  ],
  modules: [
      '@pinia/nuxt'
  ]
})
