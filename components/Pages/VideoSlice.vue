<template>
	<prismic-embed :field="slice.primary.video"/>
</template>

<script>
export default {
	name: 'VideoSlice',
	props: {
		slice: {
			type: Object,
			required: true
		}
	}
}
</script>
