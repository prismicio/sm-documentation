<template>
	<div class="introduction">
		<prismic-rich-text :v-if="slice.primary.title" :field="slice.primary.title" />

		<div class="grid video" :v-if="slice.primary.video">
			<div><prismic-rich-text :v-if="slice.primary.desc" :field="slice.primary.desc" /></div>
			<div><prismic-embed :v-if="slice.primary.video" :field="slice.primary.video"/></div>
		</div>

		<div class="grid links">
			<section v-for="(item, index) in slice.items" :key="'item-' + index" class="grid-item">
				<prismic-link :field="item.link">
					<prismic-rich-text :field="item.link_title"/>
				</prismic-link>

				<prismic-rich-text :field="item.desc"/>
			</section>
		</div>


	</div>
</template>

<script>
import Body from '@/components/Body'

export default {
	name: 'AlternateTextVideo',
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
@import '../../style/variables.scss';
	.introduction{
		.grid{
			@include lg {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
	    		grid-gap: 20px;
			}
			@include sm {
				display: grid;
				grid-template-columns: 1fr 1fr;
	    		grid-gap: 30px;
			}
			grid-template-columns: 1fr;

			&.video [data-oembed-provider="YouTube"]{
				position: relative;
				padding-bottom: 56.25%;
				height: 0;
				iframe{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
    		&.links{
    			.grid-item{
    				border: 1px solid rgba(206, 210, 210, 0.4);
    				border-radius: 4px;
    				padding: 30px;
    				margin-top: 30px;

    				p,h3{margin: 0;}

    				a{
    					text-decoration: underline;
    					color: $black-primary;
    				}

    				h3{
    					font-size: 1.1em;
    					margin-bottom: 15px;
    				}
    				p{
    					font-size: 0.9em;
    				}
    			}
    		}
		}
	}
</style>
