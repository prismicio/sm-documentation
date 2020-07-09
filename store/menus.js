export const state = () => ({
  main: {},
  side: {},
  default_docs: {},
  nuxt_docs: {},
  next_docs: {},
  foot: {},
  error: {}
})

export const mutations = {
  SET: (state, {
    main,
    side,
    default_docs,
    nuxt_docs,
    next_docs,
    foot,
    error
  }) => {
    state.main = main
    state.side = side
    state.default_docs = default_docs
    state.nuxt_docs = nuxt_docs
    state.next_docs = next_docs
    state.foot = foot
    state.error = error
  }
}
