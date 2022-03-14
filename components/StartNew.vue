<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          elevation="2"
          color="red lighten-2"
          large
          x-large
          v-bind="attrs"
          v-on="on"
        >
          Reset
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Reset
        </v-card-title>

        <v-card-text>
          <p>
            Are you sure you want to reset? Make sure you copied the link to the tweet in the blockchain.
          </p>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="restart"
          >
            Reset
          </v-btn>
          <v-btn
            color="secondary"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { resetAll } from '../helpers/store'

export default {
  name: 'StartNew',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    restart () {
      this.dialog = false
      resetAll(this.$store)
    }
  }
}
</script>

<style>
</style>
