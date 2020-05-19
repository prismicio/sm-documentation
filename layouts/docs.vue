<template>
	<div>
		<MainMenu />
		<Body variant="body--white">
			<div class="docs">
				<nav>
					<DocsMenu />
				</nav>
				<main>
					<nuxt />
				</main>
			</div>
		</Body>
		<FooterMenu />
	</div>
</template>

<script>
import MainMenu from '@/components/menus/MainMenu'
import FooterMenu from '@/components/menus/FooterMenu'
import Body from '@/components/Body'
import DocsMenu from '@/components/menus/DocsMenu'

export default {
	components: {
		MainMenu,
		FooterMenu,
		Body,
		DocsMenu
	}
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';

.docs {
	display: grid;
	grid-template-columns: [container-start] minmax(0, 1fr) [container-end];
	@include lg {
		padding-top: 70px;
		padding-bottom: 70px;
		grid-template-areas: 'nav content';
		grid-template-columns: 200px minmax(200px, 1fr);
		grid-gap: 40px;
	}
}
nav {
	display: none;
	padding-bottom: 44px;
	@include lg {
		display: inline-block;
		grid-area: nav;
		margin-left: 0.5rem;
		border-right: 1px solid $grey-transparent;
	}
}
main {
	grid-column: container;
	padding: 44px 0 44px 0;
	@include lg {
		grid-area: content;
		padding: 5px 0 0 0;
	}
}
*,
*:before,
*:after {
	-webkit-box-sizing: inherit;
	-moz-box-sizing: inherit;
	box-sizing: inherit;
	margin: 0;
}
</style>
