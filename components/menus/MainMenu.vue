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
						<gh-btns-star slug="prismicio/slice-machine" class="gh-button-star"></gh-btns-star>
					</li>
					<li>
						<gh-btns-fork slug="prismicio/slice-machine" class="gh-button-fork"></gh-btns-fork>
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
			<ul class="sidebar-panel-nav">
				<div v-for="menuLink in menu.menu_item" :key="menuLink.id">
					<li v-if="menuLink.link_label === 'Slices Library'" class="top-level" @click.prevent="toggle">
						<prismic-link :field="menuLink.link">{{ menuLink.link_label }}</prismic-link>
					</li>
					<li
						v-else-if="menuLink.link_label === 'Documentation'"
						class="top-level"
						@click="accordionToggle()"
					>
						<a>
							<span>{{ menuLink.link_label }}</span>
							<span class="accordion-item-trigger-icon" :class="{ isOpen: open }"></span>
						</a>
						<transition name="slide-fade">
							<ul v-show="open" class="second-level">
								<li v-for="sideLink in side.menu_item" :key="sideLink.id">
									<prismic-link :field="sideLink.link">{{ sideLink.link_label }}</prismic-link>
								</li>
								<!-- <li class="menu-sub-title">
									<b>Slice Components</b>
								</li>
								<li v-for="listItem in lst" :key="listItem.displayName" @click.prevent="toggle">
									<nuxt-link :to="`/components/${listItem.displayName}`">{{ listItem.meta.title }}</nuxt-link>
								</li> -->
							</ul>
						</transition>
					</li>
					<li v-else class="top-level" @click.prevent="toggle">
						<prismic-link :field="menuLink.link">{{ menuLink.link_label }}</prismic-link>
					</li>
				</div>
			</ul>
		</Sidebar>
	</div>
</template>

<script>
import { store, mutations } from '@/store/popoutmenu.js'

import Burger from '@/components/menus/Burger.vue'
import Sidebar from '@/components/menus/Sidebar.vue'
import Container from '@/components/Container'


export default {
	name: 'MainMenu',
	components: {
		Container,
		Burger,
		Sidebar
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
				opacity: 0.5;
				transition: opacity 0.1s ease;
				&.nuxt-link-exact-active, &:hover {
					opacity: 1;
					font-weight: normal;
				}
			}
			.gh-button {
				opacity: 1;
				color: $black-primary !important;
				border-radius: 0.25em;
				cursor: pointer;
				display: inline-block;
				font-family: $base-font-primary;
				font-size: 12px;
				font-weight: 600;
				line-height: 20px;
				padding: 3px 10px;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
				color: #24292e;
		    	background-color: #eff3f6;
		    	background-image: -moz-linear-gradient(top, #fafbfc, #eff3f6 90%);
		    	background-image: linear-gradient(180deg, #fafbfc, #eff3f6 90%);
		    	filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFFAFBFC', endColorstr='#FFEEF2F5');
		    	border-color: #cdcfd1;
		    	border-color: rgba(27,31,35,.2);
		    	&:hover{
		    		font-weight: 600;
		    	}
				&-star {
					border-radius: 0.25em;
					color: $black-primary;
					&:hover {
						background-color: $grey-secondary;
					}
				}
				&-fork {
					background-color: $black-primary;
					border-radius: 0.25em;
					&:hover {
						background-color: $black-secondary;
					}
				}
				.octicon {
					display: inline-block;
					vertical-align: text-top;
					fill: currentColor;
				}
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
	.sidebar-panel-nav {
		padding: 0;
		.top-level {
			border-bottom: 1px solid $grey-transparent;
			a {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1.4em;
				font-weight: bold;
				cursor: pointer;
			}
			.second-level {
				padding: 1em;
				border-top: 1px solid $grey-transparent;
				background-color: $grey-secondary;
				li {
					padding: 0;
					a {
						padding: 0.7em 1.4em;
						font-weight: normal;
					}
				}
				.menu-sub-title {
					padding: 1.4em;
				}
			}
		}
		li {
			list-style-type: none;
		}
		.accordion-item-trigger-icon {
			$size: 8px;
			width: $size;
			height: $size;
			margin-right: 7px;
			border-right: 2px solid #363636;
			border-bottom: 2px solid #363636;
			transform: translateY(-$size / 4) rotate(45deg);
			transition: transform 0.2s ease;
			&.isOpen {
				transform: translateY($size / 4) rotate(225deg);
			}
		}
		.slide-fade-enter-active,
		.slide-fade-leave-active {
			transition: all 0.3s ease;
		}
		.slide-fade-enter,
		.slide-fade-leave-to {
			opacity: 0;
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
