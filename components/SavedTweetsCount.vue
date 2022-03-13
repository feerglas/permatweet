<template>
  <div>
    saved tweets: 0
  </div>
</template>

<script>
// import Arweave from 'arweave'
// const arweave = Arweave.init()

// const queryObject = {
//   query: `
// {
//   transactions(tags: [{
//     name: "permaweb-intend",
//     values: ["saved-tweet"]
//   }])
//   {
//     edges {
//       node {
//         id
//         tags {
//           name
//           value
//         }
//       }
//     }
//   }
// }
// `
// }

export default {
  name: 'SavedTweetsCount'
  // async created () {
  //   try {
  //     const results = await arweave.api.post('/graphql', queryObject)
  //     const edges = results.data.data.transactions.edges
  //     console.log(edges)
  //   } catch (err) {
  //     console.error('GraphQL query failed')
  //     throw new Error(err)
  //   }
  // }
}

</script>
