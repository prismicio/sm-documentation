export const actions = {
  nuxtServerInit({ commit }, { $prismic }) {
    try {
      return $prismic.api.query($prismic.predicates.any('document.type', ['menu', 'footer_menu', 'docsmenu']))
        .then(menus => {
          commit('menus/SET', {
            main: menus.results.find(e => e.uid === 'main_menu').data,
            docsmenu: menus.results.find(e => e.uid === 'docsmenu').data,
            foot: menus.results.find(e => e.uid === 'footer_menu').data
          })
        })
    } catch (e) {
      const error = 'Please create a menu document'

      commit('menus/SET', error);
    }
  }
}
