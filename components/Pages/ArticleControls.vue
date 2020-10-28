<template>
	<Row>
		<div class="controls">
			<prismic-link
				v-for="(item, index) in slice.items"
				:key="'item-' + index"
				:field="item.link"
				:class="{next: item.link_direction, previous: !item.link_direction}"
			>
				<div class="buttons">
					<p v-if="item.link_direction">Next</p>
					<p v-else-if="!item.link_direction">Previous</p>
					<label>{{ item.link_label }}</label>
				</div>
			</prismic-link>
		</div>
	</Row>
</template>

<script>
import Row from '@/components/Row'

export default {
	name: 'ArticleControls',
	components: {
		Row
	},
	props: {
		slice: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>

.controls {
	display: block;
	width: 100%;
}

.previous {
	text-align: right;
	text-decoration: none;
	float: left;
	label {
		cursor: pointer;
		&::before {
			content: '\21E0';
			padding-right: 3px;
		}
	}
}
.next {
	text-decoration: none;
	text-align: left;
	float: right;
	margin-left: auto;
	label {
		cursor: pointer;
		&::after {
			content: '\21E2';
			padding-left: 3px;
		}
	}
}

.buttons {
	box-sizing: border-box;
	background: #f2f2f2;
	border: 1px solid rgba(107,108,126,.1);
	padding: 5px 15px;
	border-radius: 4px;
	overflow: hidden;
	color: #3f3f3f;
	p {
		margin: 0;
	}
	&:hover {
		background: rgba(79,107,255,.075);
    border: 1px solid #4f6bff;
    box-shadow: 0 0 4px rgba(79,107,255,.6);
    color: #4f6bff;
		cursor: pointer;
	}
}
</style>
