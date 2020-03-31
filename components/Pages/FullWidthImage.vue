<template>
  <figure class="block-img">
    <prismic-image :field="slice.primary.image" />
  </figure>
</template>

<script>
import Body from '@/components/Body'

export default {
  name: 'FullWidthImage',
  components: {
    Body
  },
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>
