export const state = () => ({
  fetchError: false,
  fetching: false,
  tweetContent: false,
  tweetId: false,
  tweetAlreadySaved: false
})

export const mutations = {
  fetchError (state, error) {
    state.fetchError = error
  },
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  tweetContent (state, content) {
    state.tweetContent = content
  },
  tweetId (state, id) {
    state.tweetId = id
  },
  tweetAlreadySaved (state, saved) {
    state.tweetAlreadySaved = saved
  }
}
