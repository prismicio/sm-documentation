<template>
	<div>
		<div class="announcement-callout">💚 We're working on the future of our Vue kit and Vue 3 support! Vue.js enthusiast? Come <a href="https://github.com/prismicio/prismic-vue/issues/45" target="_blank" rel="noopener">share your suggestions</a> with us! 📣</div>
		<MainMenu />
		<nuxt />
		<FooterMenu theme="dark" />
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

<style>
html {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
}
.announcement-callout{
	background: #202020;
	color: white;
	width: 100%;
	padding: 12px 0;
	min-height: 50px;
	font-size: 14px;
	line-height: 24px;
	text-align: center;
}
.announcement-callout a{
	color: #FFDBA2;
	text-decoration: none;
}
.announcement-callout a:hover{
	text-decoration: underline;
}
</style>
