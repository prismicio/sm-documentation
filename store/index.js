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
                      ...repeatFields
                    }
                  }
                }
              }
            }
          }
        }
      }`

      return $prismic.api.query($prismic.predicates.at('document.type', 'menu'), { graphQuery })
        .then(menus => {
          commit('menus/SET', {
            main: menus.results.find(e => e.uid === 'main_menu').data,
            side: menus.results.find(e => e.uid === 'side_menu').data,
            docs: menus.results.find(e => e.uid === 'docs_menu').data
          })
        })
    } catch (e) {
      const error = 'Please create a menu document'

      commit('menus/SET', error);
    }
  }
}
