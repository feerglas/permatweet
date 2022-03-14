<template>
  <v-btn
    rounded
    color="primary"
    dark
    :href="link"
    rel="noopener noreferrer"
    target="_blank"
  >
    <v-icon
      v-if="icon.length > 0"
      left
      dark
    >
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    link: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    icon: {
      required: false,
      type: String,
      default: ''
    }
  }
}

</script>
