<template>
  <v-footer
    :absolute="true"
    app
    class="d-flex justify-space-between"
    color="blue-grey lighten-5"
  >
    <span class="mr-2">&copy; {{ new Date().getFullYear() }}</span>

    <SavedTweetsCount class="my-2" />

    <ButtonLink
      link="https://github.com/feerglas/permatweet"
      text="GitHub"
      icon="mdi-github"
      :outlined="true"
      :small="true"
      class="ml-2"
    />
  </v-footer>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>
