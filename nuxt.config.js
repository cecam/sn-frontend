import colors from 'vuetify/es5/util/colors'
const axios = require('axios')

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    //titleTemplate: '%s - ' + process.env.npm_package_name,
    titleTemplate: 'SchoolNotes',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '¡La mejor plataforma para estudiantes!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icono.png' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Spartan:wght@700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css' },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src: '~/plugins/vue-editor.js', ssr: false},
    {src: '~/plugins/vue-typed-js.js', ssr: false}
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/sitemap',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:8000/api/'
    //baseURL: 'https://schoolnotes.live/020040sn897200/api'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'token' },
          user: { url: 'profile', method: 'get', propertyName: 'user' },
          logout: { url: 'loggout', method: 'post'} 
        }
      }
    }
  },
  sitemap: {
    hostname: 'https://www.schoolnotes.live',
    gzip: true,
    exclude: [
      '/preguntas/**',
      '/preguntas',
      '/apuntes/**',
      '/inicio',
      '/editar-perfil/**',
      '/editar-perfil',
      '/crear-documento',
      '/busqueda-etiquetas',
      '/busqueda',
      '/mis-guardados',
      '/planes-de-clips',
      '/politicas',
      '/recuperar-password',
    ],
    routes: async () => {
      const { data } = await axios.get('https://schoolnotes.live/020040sn897200/api/slug-apuntes')
      return data.data.map((slug) => `/documentos/${slug}`)
    }
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
