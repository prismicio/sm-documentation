<template>
	<div>
		<MainMenu />
		<nuxt />
		<FooterMenu />
	</div>
</template>

<script>
import MainMenu from '@/components/menus/MainMenu'
import FooterMenu from '@/components/menus/FooterMenu'
export default {
	components: {
		MainMenu,
		FooterMenu
	}
}
</script>