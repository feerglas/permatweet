export const state = () => ({
  fetchError: false,
  fetching: false,
  tweetContentDocument: false,
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
  tweetContentDocument (state, content) {
    state.tweetContentDocument = content
  },
  tweetId (state, id) {
    state.tweetId = id
  },
  tweetAlreadySaved (state, saved) {
    state.tweetAlreadySaved = saved
  }
}
