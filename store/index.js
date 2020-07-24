export const actions = {
  nuxtServerInit({ commit }, { $prismic }) {
    try {
      const graphQuery = `{
        menu {
          ...menuFields
          menu_item {
            link_label
            link {
              ...on page {
                ...pageFields
                body {
                  ...on sub_menu {
                    repeat {
                      link_label
                      link_to_menu_item {
                        ...on page {
                          parent
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`

      return $prismic.api.query($prismic.predicates.any('document.type', ['menu', 'footer_menu']), { graphQuery })
        .then(menus => {
          commit('menus/SET', {
            main: menus.results.find(e => e.uid === 'main_menu').data,
            side: menus.results.find(e => e.uid === 'side_menu').data,
            default_docs: menus.results.find(e => e.uid === 'default_docs_menu').data,
            nuxt_docs: menus.results.find(e => e.uid === 'nuxt_docs_menu').data,
            next_docs: menus.results.find(e => e.uid === 'next_docs_menu').data,
            foot: menus.results.find(e => e.uid === 'footer_menu').data
          })
        })
    } catch (e) {
      const error = 'Please create a menu document'

      commit('menus/SET', error);
    }
  }
}
