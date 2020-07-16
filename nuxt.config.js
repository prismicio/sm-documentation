export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Slice Machine',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Devs make the parts, users make the websites.' },
      { property: 'og:title', content: 'Slice Machine'},
      { property: 'og:description', content: 'Devs make the parts, users make the websites.'},
      { property: 'og:image', content: 'https://images.prismic.io/slice-machine/c638562a-dfb5-4477-baa2-6046e0964520_Slicemachine-social-card.png?auto=compress,format' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://images.prismic.io/slice-machine/f8c31810-7dda-488b-a487-60ee694d6ffc_Favicon.png?auto=compress,format' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora:400,400italic,700,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inter:400,500,600,700,800&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['@/style/_global.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/prism'
  ],

  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-43699356-5'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
			'vue-github-buttons/nuxt',
			{
				css: false,
				useCache: false
			}
		],
    // hotjar
    [
      '@netsells/nuxt-hotjar',
      {
        id: '1748750',
        sv: '6'
      }
    ],
    // https://prismic-nuxt.js.org/
    "@nuxtjs/prismic",
    '@nuxtjs/axios'
  ],

  prismic: {
    endpoint: "https://slice-machine-staging.cdn.prismic.io/api/v2",
    apiOptions: {
      routes: [
        {
          type: "page",
          path: "/documentation/:parent?/:uid",
          resolvers: {
            parent: 'parent' // id of the content relationship in the article mask
          }
        }
      ]
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   transpile: ['prism-es6'],
    extend(config, ctx) {
      // to transform link with <nuxt-link> for the htmlSerializer
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  },

  generate: {
    fallback: '404.html' // Netlify reads a 404.html, Nuxt will load as an SPA
  }
}
