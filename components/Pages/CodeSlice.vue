<template>
	<div class="clipboard" @click.stop.prevent="copyCommand" >
		<prismic-rich-text class="embed-text" :field="slice.primary.snippet" />
		<span>{{ copyText }}</span>
		<input :id="`command-to-copy-${index}`" type="hidden" :value="slice.primary.snippet[0].text" />
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
	background-color: #eeeeef;
	border-radius: 5px;
	padding: 20px;
	margin: 20px 0;
	cursor: pointer;
	@include lg {
		padding: 20px 30px;
    	margin-left: -30px;
	    margin-right: -30px;
    }
	.embed-text {
		text-align: left;
		font-size: 13px;
	}
	&:hover {
		background-color: #e2e2e2;
	}
}
</style>
