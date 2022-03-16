// import colors from 'vuetify/es5/util/colors'

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
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:title', content: 'permatweet' },
      { property: 'og:image', content: 'http://arweave.net/PwLnzYGJqtBpJA68xqVGBHb_CzVGTVht4vmMHPo001A' },
      { property: 'og:url', content: 'https://permatweet.netlify.app/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'Store tweets on the Arweave Blockchain on demand - forever...' },
      { property: 'og:locale', content: 'en_US' },
      { property: '', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
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
