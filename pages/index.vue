<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Permatweet
        </v-card-title>
        <v-card-text>
          <p>Store tweets on the Arweave Blockchain on demand..</p>
        </v-card-text>
      </v-card>
      <GetTweet />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
