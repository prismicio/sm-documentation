<template>
	<section class="wrapper">
		<SlicesBlock :sliceContent="sliceContent"/>
		<aside>
			<TocSlice :slices="sliceContent" />
		</aside>
	</section>
</template>

<script>
// Imports for all slices
const SlicesBlock = () => import('../../components/Pages/SlicesBlock.vue')
// Parses Slice to create a table of contents
const TocSlice = () => import('../../components/Pages/TocSlice.vue')

export default {
	name: 'page',
	layout ({ params, error }) {
		if (params.parent || params.uid === 'nuxt') {
			return 'nuxtdocs'
		} else if (params.parent || params.uid === 'next') {
			return 'nextjsdocs'
		} else {
			return 'defaultdocs'
		}
  },
	components: {
		SlicesBlock,
		TocSlice,
	},
	async asyncData({ $prismic, params, error }) {
		try {
			const document = (await $prismic.api.getByUID('page', params.uid, {fetchLinks: 'page.parent'})).data
			return {
				// Slices
				sliceContent: document.body
			}
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' })
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
img {
	max-width: 100%;
}
@include lg {
	section.wrapper {
	    grid-template-columns: 3fr 1fr;
	    grid-gap: 40px;
	    display: grid;
	}
}
article{
	width: 100%;
    max-width: 650px;
    min-width: 100px;
    @include md {
    	max-width: 100%;
    }
}
</style>
