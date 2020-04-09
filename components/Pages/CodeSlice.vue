<template>
	<div class="clipboard" @click.stop.prevent="copyCommand">
		<prismic-rich-text class="embed-text" :field="slice.primary.snippet" />
		<img src="../../static/clipboard.svg" />
		<input :id="`command-to-copy-${index}`" type="hidden" :value="slice.primary.snippet[0].text" />
	</div>
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'CodeSlice',
	data () {
		return {
			index: null
		}
	},
	components: {
		Body
	},
	props: {
		slice: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			required: true
		}
	},
	created() {
		this.index = Math.floor(Math.random() * 20)
	},
	methods: {
		copyCommand(index) {
			const commandToCopy = document.querySelector(
				`#command-to-copy-${this.index}`
			)
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
	img {
		display: none;
		@include rwd(400) {
			margin-left: 30px;
			display: inline-block;
		}
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
