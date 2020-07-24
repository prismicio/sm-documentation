<template>
	<main>
		<!-- Slice section template -->
		<div v-for="(slice, index) in sliceContent" :key="'slice-' + index">
			<!-- Text slice component -->
			<Container v-if="slice.slice_type === 'text'">
				<TextSlice :slice="slice" />
			</Container>
			<!-- Text slice component -->
			<Container v-if="slice.slice_type === 'title'">
				<TitleSlice :slice="slice" />
			</Container>
			<!-- Image component -->
			<FullWidthImage v-else-if="slice.slice_type === 'image'" :slice="slice" />
			<!-- Banner component -->
			<div class="banner" v-else-if="slice.slice_type === 'banner'">
				<BannerSlice :slice="slice" />
			</div>
			<!-- Alternative Text Video component -->
			<div class="videotext">
				<Container v-if="slice.slice_type === 'textvideo'">
					<AlternateTextVideo :slice="slice" />
				</Container>
			</div>
			<!-- Warning Text slice component -->
			<Container v-if="slice.slice_type === 'warning'">
      	<WarningSlice :slice="slice" />
			</Container>
		</div>
	</main>
</template>

<script>
const Container = () => import('../../components/Container.vue')
// Imports for all slices
const AlternateTextVideo = () => import('../../components/Pages/AlternateTextVideo.vue')
const TextSlice = () => import('../../components/Pages/TextSlice.vue')
const TitleSlice = () => import('../../components/Pages/TitleSlice.vue')
const FullWidthImage = () => import('../../components/Pages/FullWidthImage.vue')
const BannerSlice = () => import('../../components/Pages/BannerSlice.vue')
const WarningSlice = () => import('../../components/Pages/WarningSlice.vue')

export default {
	components: {
		AlternateTextVideo,
		Container,
		TextSlice,
		TitleSlice,
		FullWidthImage,
		BannerSlice,
    WarningSlice,
	},
	async asyncData({ $prismic, params, error }) {
		try {
			const document = (await $prismic.api.getByUID('page', 'documentation')).data

			return {
				// Page content
				document,
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
main {
	padding-bottom: 44px;
}
.banner {
	padding-bottom: 44px;
}
img {
	max-width: 100%;
}
// .videotext{
// 	margin-top: -100px;
// }
</style>
