<template>
  <div>
    <v-card
      elevation="2"
    >
      <v-card-title>Confirmation</v-card-title>

      <v-card-text>
        <p>
          Tweet has already been saved.
        </p>

        <SavedTweetInfo />
        <TweetView />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AlreadyStored'
}

</script>
