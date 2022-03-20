<template>
  <v-btn
    v-clipboard:copy="textToCopy"
    rounded
    color="primary"
    dark
    x-small
    outlined
    fab
  >
    <v-icon
      :left="text.length > 0"
      dark
    >
      mdi-content-copy
    </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'CopyToClipboard',
  props: {
    text: {
      required: false,
      type: String,
      default: ''
    },
    textToCopy: {
      required: true,
      type: String
    }
  }
}

</script>
