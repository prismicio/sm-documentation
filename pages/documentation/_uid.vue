<template>
	<section class="wrapper">
		<article>
			<!-- Slice section template -->
			<div v-for="(slice, index) in sliceContent" :key="'slice-' + index">
				<!-- Alternative Text Video component -->
				<AlternateTextVideo v-if="slice.slice_type === 'textvideo'" :slice="slice" />
				<!-- Next/Previous component -->
				<ArticleControls v-else-if="slice.slice_type === 'article_controls'" :slice="slice" />
				<!-- Banner component -->
				<BannerSlice v-if="slice.slice_type === 'banner'" :slice="slice" />
				<!-- Code Snippet component -->
				<CodeSlice v-else-if="slice.slice_type === 'code'" :slice="slice" />
				<!-- Image component -->
				<FullWidthImage v-if="slice.slice_type === 'image'" :slice="slice" />
				<!-- SubMenu slice component -->
				<SubMenuSlice v-if="slice.slice_type === 'sub_menu'" :slice="slice" />
				<!-- Text slice component -->
				<TextSlice v-if="slice.slice_type === 'text'" :slice="slice" />
				<!-- Tips Text slice component -->
				<TipsSlice v-if="slice.slice_type === 'tips'" :slice="slice" />
				<!-- Text slice component -->
				<TitleSlice v-if="slice.slice_type === 'title'" :slice="slice" />
				<!-- Video component -->
				<VideoSlice v-else-if="slice.slice_type === 'video'" :slice="slice" />
				<!-- Warning Text slice component -->
				<WarningSlice v-if="slice.slice_type === 'warning'" :slice="slice" />
			</div>
		</article>
		<aside>
			<TocSlice :slices="sliceContent" />
		</aside>
	</section>
</template>

<script>
// Imports for all slices
const AlternateTextVideo = () => import('../../components/Pages/AlternateTextVideo.vue')
const ArticleControls = () => import('../../components/Pages/ArticleControls.vue')
const BannerSlice = () => import('../../components/Pages/BannerSlice.vue')
const CodeSlice = () => import('../../components/Pages/CodeSlice.vue')
const FullWidthImage = () => import('../../components/Pages/FullWidthImage.vue')
const SubMenuSlice = () => import('../../components/Pages/SubMenuSlice.vue')
const TextSlice = () => import('../../components/Pages/TextSlice.vue')
const TipsSlice = () => import('../../components/Pages/TipsSlice.vue')
const TitleSlice = () => import('../../components/Pages/TitleSlice.vue')
const VideoSlice = () => import('../../components/Pages/VideoSlice.vue')
const WarningSlice = () => import('../../components/Pages/WarningSlice.vue')
// Parses Slice to create a table of contents
const TocSlice = () => import('../../components/Pages/TocSlice.vue')

export default {
	name: 'page',
	layout ({ params, error }) {
		if (params.parent || params.uid === 'nuxt') {
			return 'nuxtdocs'
		} 
		if (params.parent || params.uid === 'next') {
			return 'nextjsdocs'
		}
		return 'defaultdocs'
  },
	components: {
		AlternateTextVideo,
    ArticleControls,
    BannerSlice,
    CodeSlice,
    FullWidthImage,
    SubMenuSlice,
    TextSlice,
    TipsSlice,
    TitleSlice,
    VideoSlice,
    WarningSlice,
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
