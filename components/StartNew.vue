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
          Restart
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Restart
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
            Restart
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

import {
  resetTwitter,
  resetArweave,
  resetRestart
} from '../helpers/store'

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
      resetTwitter(this.$store)
      resetArweave(this.$store)
      resetRestart(this.$store)
    }
  }
}
</script>

<style>
</style>
