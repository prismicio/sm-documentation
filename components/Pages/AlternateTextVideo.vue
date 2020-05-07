<template>
	<div class="introduction">
		<prismic-rich-text :field="slice.primary.title" />

		<div class="grid video">
			<div><prismic-rich-text :field="slice.primary.desc" /></div>
			<div><video :src="slice.primary.video.url" controls /></div>
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
	.introduction{
		.grid{
			display: grid;
			grid-template-columns: 1fr 1fr;
    		grid-gap: 30px;

    		&.links{
    			.grid-item{
    				border: 1px solid rgba(206, 210, 210, 0.4);
    				border-radius: 4px;
    				padding: 30px;
    				margin-top: 30px;

    				p,h3{margin: 0;}

    				a{
    					text-decoration: none;
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
