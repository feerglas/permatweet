<template>
  <v-btn
    v-clipboard:copy="textToCopy"
    rounded
    color="primary"
    dark
    small
    outlined
  >
    <v-icon
      left
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
      required: true,
      type: String
    },
    textToCopy: {
      required: true,
      type: String
    }
  }
}

</script>
