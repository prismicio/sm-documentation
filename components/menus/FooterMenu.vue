<template>
	<div :class="`footerMenu ${theme}`">
		<Container class="foor-container" justify="space-between">
			<div class="logo">
				<nuxt-link to="/">
					<prismic-image v-if="theme == 'light' && menu.logo_black" :field="menu.logo_black" />
					<prismic-image v-if="theme == 'dark' && menu.logo" :field="menu.logo" />
				</nuxt-link>
				<nuxt-link to="/">
					<span>
					{{ menu.title_tag }}
					</span>
				</nuxt-link>
			</div>
			<nuxt-link to="/">
				<span>
				{{ menu.address }}
				</span>
			</nuxt-link>
			<nav>
				<ul v-for="(column, index) in menu.body" :key="'column-' + index">
					<li class="prominent">
						<prismic-link :field="column.primary.prominent_link">{{ column.primary.prominent_link_label }}</prismic-link>
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

	padding: 30px 0;
	min-height: 80px;
	.foor-container {
		display: block;
		@include md {
			display: flex;
		}
	}
	.logo {
		display: inline-flex;
		align-items: center;
		b {
			font-size: 20px;
			padding: 0 5px;
		}
	}
	ul {
		display: grid;
		padding: 0;
		font-size: 14px;
		@include md {
			display: inline-flex;
		}
	}
	li {
		display: inline-block;
		padding-top: 15px;
		@include md {
			margin-left: 10px;
		}
	}
	a {
		display: contents;
		text-decoration: none;
	}
}
</style>
