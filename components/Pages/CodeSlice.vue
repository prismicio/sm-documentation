<template>
	<div class="clipboard" @click.stop.prevent="copyCommand" >
		<prismic-rich-text class="embed-text" :field="slice.primary.snippet" />
		<span>{{ copyText }}</span>
		<textarea :id="`command-to-copy-${index}`" readonly :value="slice.primary.snippet[0].text" />
	</div>
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'CodeSlice',
	data () {
		return {
			index: null,
			copyText: null
		}
	},
	components: {
		Body
	},
	props: {
		slice: {
			type: Object,
			required: true
		}
		// index: {
		// 	type: Number,
		// 	required: true
		// }
	},
	mounted() {
		this.index = Math.floor(Math.random() * 10000)
		this.copyText = 'Copy'
	},
	methods: {
		copyCommand() {
			const commandToCopy = document.querySelector(
				`#command-to-copy-${this.index}`
			)
			commandToCopy.setAttribute('type', 'text')
			commandToCopy.select()

			try {
				const successful = document.execCommand('copy')
				this.copyText = 'Copied'
				setTimeout(() => this.copyText='Copy', 1000);
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

.clipboard {
	display: flex;
	overflow-x: scroll;
	justify-content: space-between;
	background-color: #292929;
	color: #b7b7b7;
	border-radius: 5px;
	padding: 20px;
	margin: 20px 0;
	.embed-text {
		text-align: left;
		font-size: 13px;
	}
	span{
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 12px;
		padding: 2px 6px;
		border-radius: 3px;
		&:hover{
			background: rgba(255, 255, 255, 0.2);
			cursor: pointer;
		}
	}
	textarea {
		left: -9999px;
		position: absolute;
	}
}
</style>
