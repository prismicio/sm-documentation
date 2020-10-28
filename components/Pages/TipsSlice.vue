<template>
	<blockquote class="tips">
		<p class="title">💡{{slice.primary.box_title}}</p>
		<prismic-rich-text :field="slice.primary.text" />
	</blockquote>
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'TipsSlice',
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
	blockquote.tips{
		background-color: #eff7ff;
	    border-left-color: #d6e3f1;
    	p{
    		font-size: 14px;
    		margin-bottom: 0;
    		&.title{
    			font-weight: 700;
    			margin-bottom: 10px;
				}
		}
	}
</style>
