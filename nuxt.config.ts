// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss'],
  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker'],
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
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
  ]
})
