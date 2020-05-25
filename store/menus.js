export const state = () => ({
  main: {},
  side: {},
  docs: {},
  foot: {},
  error: {}
})

export const mutations = {
  SET: (state, {
    main,
    side,
    docs,
    foot,
    error
  }) => {
    state.main = main
    state.side = side
    state.docs = docs
    state.foot = foot
    state.error = error
  }
}
