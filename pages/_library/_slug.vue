<template>
	<div class="content">
		<h1>{{ slice[1].fieldset }} from the {{ library.packageName }} library.</h1>
		<p>{{ slice[1].description }}</p>
		<h2>Example</h2>
		<iframe :src="`https://prismic-sm.netlify.app/components/preview/${example}.html`"></iframe>
		<prismic-rich-text :field="document.install_info_title" />
		<prismic-rich-text :field="document.install_info_text" />
		<prismic-rich-text :field="document.info_tagline" />
		<MarkDownBox
			id="markdown-box"
			:edit-url="createEditUrl()"
			style="min-height: 80vh; margin-top: 4em; word-spacing: 0px;"
		>{{ readme }}</MarkDownBox>
	</div>
</template>

<script>

import MarkDownBox from '@/components/MarkDownBox'

// import { pascalize, hyphenate } from 'sm-commons/methods/misc'

const camelizeRE = /-(\w)/g

const hyphenateRE = /\B([A-Z])/g
function hyphenate(str, kebab) {
	const s = str.replace(hyphenateRE, '-$1').toLowerCase()
	return kebab ? s.replace(/-/g, '_') : s
}
function pascalize(str, kebab) {
	const s = str.replace(hyphenateRE, '-$1').toLowerCase()
	return kebab ? s.replace(/-/g, '-') : s
}
export default {
	layout: 'docs',
	components: {
		MarkDownBox
	},
	async asyncData({ $prismic, $axios, params, error }) {
		try {
			const document = (await $prismic.api.getSingle('sample_pages')).data

			const library = await $axios.$get(
				`http://sm-api.now.sh/api/library?lib=${params.library}`
			)

			const result = Object.entries(library.slices).filter(
				([key, value]) => key === hyphenate(params.slug, true)
			)

			const example = pascalize(params.slug, true)

			const readme = await $axios.$get(
				`https://raw.githubusercontent.com/prismicio/${params.library}/master/src/slices/${params.slug}/README.md`
			)

			return {
				document,
				library,
				slice: result[0],
				example,
				readme
			}
		} catch (e) {
			if (process.env.NODE_ENV === 'development') {
				console.error(e)
			}
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	methods: {
		mouseover() {
			this.hover = true
		},
		mouseleave() {
			this.hover = false
		},
		createEditUrl() {
			const base =
				'https://github.com/prismicio/slice-machine/tree/master/src/slices/'
			return `${base}${this.slice.displayName}/README.md`
		},
		copyCommand() {
			const commandToCopy = document.querySelector('#command-to-copy')
			commandToCopy.setAttribute('type', 'text')
			commandToCopy.select()

			try {
				const successful = document.execCommand('copy')
				const msg = successful ? 'successful' : 'unsuccessful'
				alert('Command was copied ' + msg)
			} catch (err) {
				alert('Oops, unable to copy')
			}

			/* unselect the range */
			commandToCopy.setAttribute('type', 'hidden')
			window.getSelection().removeAllRanges()
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.sample-image {
	max-width: 100%;
	border: 1px solid $grey-secondary;
	border-radius: 5px;
	margin: 32px 0;
}
.card {
	box-sizing: border-box;
	background: #fff;
	border: 1px solid $grey-secondary;
	border-radius: 3px;
	position: relative;
	width: 100%;
	margin: 32px 0;
	cursor: pointer;

	.image-block {
		width: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border-radius: 3px;
	}

	.hover-block {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		width: 100%;
		border-radius: 3px;
		background-image: linear-gradient(
			0deg,
			rgba(104, 104, 104, 0.95),
			rgba(104, 104, 104, 0.95)
		);
		h5 {
			text-align: center;
			color: #fff;
			text-shadow: 1px 1px #000;
			font-weight: bold;
		}
		&--hovered {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			flex-direction: column;
		}
	}
}
.clipboard {
	display: flex;
	justify-content: space-between;
	background-color: $black-primary;
	border-radius: 5px;
	padding: 20px;
	margin: 20px 0;
	cursor: pointer;
	img {
		display: none;
		@include rwd(400) {
			margin-left: 30px;
			display: inline-block;
		}
	}
	.embed-text {
		color: #ffffff;
		text-align: center;
		font-size: 13px;
		@include sm {
			font-size: 16px;
		}
	}
	&:hover {
		background-color: $black-secondary;
	}
}
iframe{
	width: 100%;
	height: 350px;
	border: none;
}
</style>
