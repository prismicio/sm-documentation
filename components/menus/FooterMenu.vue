<template>
	<div :class="`footerMenu ${theme}`">
		<Container class="foot-container" justify="space-between">
			<div>
				<div class="logo">
					<prismic-image v-if="theme == 'light' && menu.logo_black" :field="menu.logo_black" />
					<prismic-image v-if="theme == 'dark' && menu.logo" :field="menu.logo" />
					<span>{{ menu.title_tag }}</span>
				</div>
				<span class="adress">{{ menu.address }}</span>
			</div>

			<nav>
				<ul v-for="(column, index) in menu.body" :key="'column-' + index">
					<li class="prominent">
						{{ column.primary.prominent_link_label }}
					</li>
					<li class="secondary" v-for="menuLink in column.items" :key="menuLink.id">
						<prismic-link :field="menuLink.secondary_link">{{ menuLink.secondary_link_label }}</prismic-link>
					</li>
				</ul>
			</nav>
		</Container>
	</div>
</template>

<script>
import Container from '@/components/Container'

export default {
	name: 'MainMenu',
	components: {
		Container
	},
	props: {
		theme: {
			type: String,
			required: true,
      validator: function (value) {
        return ['dark', 'light'].indexOf(value) !== -1
      }
    }
	},
	computed: {
		menu() {
			return this.$store.state.menus.foot
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/_variables.scss';

a {
	display: contents;
	text-decoration: none;
	&:visited {
		color: $black-primary;
	}
}

.footerMenu {

	&.dark {
		color: #FFFFFF;
		background-color: $black-primary;
		border-top: 1px solid $grey-primary;
		a {
			color: $grey-secondary;
			&:visited {
				color: #FFFFFF;
			}
			&:hover {
				color: #FFFFFF;
			}
		}
	}

	&.light {
		background-color: #ffffff;
		border-top: 1px solid #d3d2d2;
		a {
			color: $black-primary;
			&:visited {
				color: $black-primary;
			}
			&:hover {
				color: $black-secondary;
			}
		}
	}
	padding: 30px 0 100px 0;
	min-height: 80px;

	.adress{
		display: block;
		font-size: 14px;
		opacity: 0.5;
	}
	.foot-container {
		display: block;
		@include md {
			display: flex;
		}
	}
	.logo {
		display: inline-flex;
		align-items: center;
		img{
			width: 22px;
			margin-right: 5px;
		}
		b {
			font-size: 20px;
			padding: 0 5px;
		}
	}
	nav{
		ul {
			float: left;
			padding: 0;
			font-size: 14px;
			margin-left: 150px;
			li {
				display: block;
				padding-top: 15px;
				@include md {
					margin-left: 10px;
				}
				&.prominent{
					font-weight: 600;
					opacity: 0.5;
				}
				&.secondary{}
			}
		}
		@include md {
			ul{
				margin-left: 50px;
			}
		}
		@include sm {
			border-top: 1px solid #333;
			margin-top: 20px;
			ul{
				float: none;
				margin-left: 0px;
			}
		}
	}
	a {
		display: contents;
		text-decoration: none;
	}
}
</style>
