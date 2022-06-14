export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'letao-web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vant",
    "~/plugins/axios",
    "~/plugins/indexApi"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  server: {
    ip: 'localhost',
    port: 8080,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    // 自动加前缀
    prefix: '/api'
  },
  proxy: {
    '/api': {
      pathRewrite: {
        '^/api': '/'
      },
      target: "http://localhost:3000"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  loading: '~/components/Loading.vue'
}
