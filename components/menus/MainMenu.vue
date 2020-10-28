<template>
	<div class="mainMenu">
		<Container justify="space-between">
			<nav id="menu">
				<div class="logo">
					<nuxt-link to="/">
						<prismic-image v-if="menu.logo" :field="menu.logo" />
					</nuxt-link>
					<nuxt-link to="/">
						<span>
							<b>Slicemachine</b> by Prismic
						</span>
					</nuxt-link>
				</div>
				<ul class="horizontal-nav">
					<li v-for="menuLink in menu.menu_item" :key="menuLink.id">
						<prismic-link :field="menuLink.link">{{ menuLink.link_label }}</prismic-link>
					</li>
					<li>
						<a href="https://github.com/prismicio/slice-machine">
							<img class="gh-logo" src="https://images.prismic.io/slice-machine/871c06d5-6254-4367-815c-cbf99de6ac29_github-icon-png-29.jpg?auto=compress,format">
						</a>
					</li>
				</ul>
				<Burger></Burger>
			</nav>
		</Container>
		<Sidebar>
			<div class="sidebar-logo">
				<nuxt-link to="/">
					<span class="logo-span">
						<prismic-image v-if="menu.logo" :field="menu.logo" />
						<b>Slicemachine</b> by Prismic
					</span>
				</nuxt-link>
				<Burger class="side-burger"></Burger>
			</div>
			<LevelsDropdown />
		</Sidebar>
	</div>
</template>

<script>
import { store, mutations } from '@/store/popoutmenu.js'

import Burger from '@/components/menus/Burger.vue'
import Sidebar from '@/components/menus/Sidebar.vue'
import Container from '@/components/Container'
import LevelsDropdown from '@/components/menus/LevelsDropdown'

export default {
	name: 'MainMenu',
	components: {
		Container,
		Burger,
		Sidebar,
		LevelsDropdown
	},
	data() {
		return {
			open: false
		}
	},
	mounted() {
		this.activeRouteToggle()
	},
	computed: {
		menu() {
			return this.$store.state.menus.main
		},
		side() {
			return this.$store.state.menus.side
		},
		isBurgerActive() {
			return store.isNavOpen
		}
	},
	methods: {
		accordionToggle() {
			this.open = !this.open
		},
		activeRouteToggle() {
			if (this.$route.path.includes('documentation')) {
				this.open = !this.open
			} else if (this.$route.path.includes('components')) {
				this.open = !this.open
			}
		},
		toggle() {
			mutations.toggleNav()
		}
	}
}
</script>

<style lang="scss">
@import '../../style/variables.scss';

.mainMenu {
	background: $black-primary;
	height: 30px;
	padding: 20px 0;
	min-height: 80px;
	z-index: 100;
    position: relative;
	#menu {
		display: contents;
	}
	.logo {
		display: inline-flex;
		align-items: center;
		img{
			position: relative;
    		top: 3px;
		}
		b {
			padding-left: 5px;
			font-size: 16px;
		}
		a {
			color: #fff!important;
			font-size: 13px;
			span{
				font-weight: normal;
			}
		}
	}
	.horizontal-nav {
		display: none;
		font-size: 14px;
		align-items: center;
		@include xl {
			display: inline-flex;
		}
		li {
			display: inline-block;
			margin-left: 20px;
			a {
				text-decoration: none;
				color: #fff;
				opacity: 0.6;
				transition: opacity 0.1s ease;
				&.nuxt-link-exact-active, &:hover {
					opacity: 1;
					font-weight: normal;
				}
			}
			.gh-logo {
				width: 20px;
				margin-top: 7px;
			}
		}
	}
	.sidebar-logo {
		display: flex;
		background: #171717;
		align-items: center;
		justify-content: space-between;
		padding: 25px 16px;
		width: 100%;
		#burger{
			.burger-bar{
				background-color: #fff;
			}
		}
		.logo-span {
			display: flex;
			align-items: center;
		}
		b {
			padding: 0 5px;
			font-size: 16px;
		}
		a {
			color: #fff;
			font-size: 13px;
			@include lg {
				font-size: 16px;
			}
		}
	}
	a {
		text-decoration: none;
		color: $black-primary;
	}

	@include xl {
		#burger {
			display: none;
		}
	}
}
</style>
