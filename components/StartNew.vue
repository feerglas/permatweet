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
          :disabled="!(storing || confirming || confirmed)"
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
            Before restarting, copy the followingtransaction id and keep it somewhere so you can access your saved tweet later:
          </p>
          <p>
            {{ trxId }}
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

import { removeTransactionId } from '../localStorage'

export default {
  name: 'StartNew',
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    storing () {
      return this.$store.state.arweave.storing
    },
    confirming () {
      return this.$store.state.arweave.confirming
    },
    confirmed () {
      return this.$store.state.arweave.confirmed
    },
    trxId () {
      return this.$store.state.arweave.id
    }
  },
  methods: {
    restart () {
      this.dialog = false

      this.$store.commit('twitter/fetchError', false)
      this.$store.commit('twitter/fetching', false)
      this.$store.commit('twitter/tweetContent', false)
      this.$store.commit('twitter/tweetId', false)
      this.$store.commit('twitter/tweetAlreadySaved', false)

      this.$store.commit('graphql/trxCount', 0)
      this.$store.commit('graphql/queryingTrxCount', false)

      this.$store.commit('arweave/setConfirmations', 0)
      this.$store.commit('arweave/storing', false)
      this.$store.commit('arweave/confirming', false)
      this.$store.commit('arweave/confirmed', false)
      this.$store.commit('arweave/id', false)
      this.$store.commit('arweave/error', false)

      removeTransactionId()
    }
  }
}
</script>

<style>
</style>
