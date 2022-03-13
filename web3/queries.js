// arweave graphql playground:
// https://arweave.net/graphql

export const queryAllSavedTweets = {
  query: `
{
  transactions(first: 5, tags: [{
    name: "permaweb-intend",
    values: ["saved-tweet"]
  }])
  {
    edges {
      cursor
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
`
}
