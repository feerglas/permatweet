<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="8" lg="6">
            <PageHeader />
          </v-col>
        </v-row>
        <Nuxt />
      </v-container>
    </v-main>
    <PageFooter />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
