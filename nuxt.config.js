// import colors from 'vuetify/es5/util/colors'
import ogProperties from './helpers/ogProperties'

export default {
  target: 'static',
  head: {
    titleTemplate: '%s - permatweet',
    title: 'permatweet',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      ...ogProperties
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
    '~/plugins/copyClipboard'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: '/'
  },
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/scss/index.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          // primary: colors.blue.darken2,
          // accent: colors.grey.darken3,
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3
        }
      }
    }
  },
  build: {
  }
}
