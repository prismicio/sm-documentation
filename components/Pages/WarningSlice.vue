<template>
	<blockquote>
		<p class="title">⚠️{{slice.primary.box_title}}</p>
		<prismic-rich-text :field="slice.primary.text" />
	</blockquote>
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'WarningSlice',
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

<style lang="scss">
	blockquote{
		background-color: rgba(255, 229, 100, 0.3);
	    border-left-color: #ffcf64;
    	p{
    		font-size: 14px;
    		margin-bottom: 0;
    		&.title{
    			font-weight: 700;
					margin-bottom: 10px;
					&::before{
						content: U+26A0;
					}
				}
		}
	}
</style>
