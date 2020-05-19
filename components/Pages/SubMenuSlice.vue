<template>
  <ul>
    <li v-for="menuItem in slice.items" :key="menuItem.id">
			<prismic-link :field="menuItem.link_to_menu_item">{{ menuItem.link_label }}</prismic-link>
    </li>
  </ul>
</template>

<script>
export default {
	name: 'SubMenuSlice',
	props: {
		slice: {
			type: Object,
			required: true
		}
	}
}
</script>
