<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="true"
      app
      class="d-flex justify-space-between"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <ButtonLink
        link="https://github.com/feerglas/permatweet"
        text="GitHub"
        icon="mdi-github"
        :outlined="true"
        :small="true"
      />
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
