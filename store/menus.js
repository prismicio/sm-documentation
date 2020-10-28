export const state = () => ({
  main: {},
  docsmenu: {},
  foot: {},
  error: {}
})

export const mutations = {
  SET: (state, {
    main,
    docsmenu,
    foot,
    error
  }) => {
    state.main = main
    state.docsmenu = docsmenu
    state.foot = foot
    state.error = error
  }
}
