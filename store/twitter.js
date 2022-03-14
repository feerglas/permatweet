export const state = () => ({
  fetchError: false,
  fetching: false,
  tweetContentDocument: false,
  tweetContentComponent: false,
  tweetData: false,
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
  tweetContentComponent (state, content) {
    state.tweetContentComponent = content
  },
  tweetData (state, content) {
    state.tweetData = content
  },
  tweetId (state, id) {
    state.tweetId = id
  },
  tweetAlreadySaved (state, saved) {
    state.tweetAlreadySaved = saved
  }
}
