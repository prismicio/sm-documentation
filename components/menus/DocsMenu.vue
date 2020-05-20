<template>
		<ul>
			<li v-for="docItem in docsItems" :key="docItem.field.id">
				<prismic-link :field="docItem.field">{{ docItem.label }}</prismic-link>
				<ul class="sub" v-if="docItem.subItems.length > 0">
					<li v-for="subItem in docItem.subItems" :key="subItem.field.id">
						<prismic-link :field="subItem.field">{{ subItem.label }}</prismic-link>
					</li>
				</ul>
			</li>
		</ul>
</template>

<script>
export default {
	name: 'DocsMenu',
	computed: {
		docsItems: function () {
			return (this.$store.state.menus.docs.menu_item || []).map(docEntry => {
				const subItems = (() => {
					if(!(docEntry.link.data && docEntry.link.data.body)) return;

					return docEntry.link.data.body.reduce((acc, slice) => {
						const sliceSubItems = slice.items.map(menuItem => {
							return {
								field: menuItem.link_to_menu_item,
								label: menuItem.link_label
							};
						});
						return [...acc, ...sliceSubItems];
					}, []);
				})();

				return {
					field: docEntry.link,
					label: docEntry.link_label,
					subItems
				};
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

ul {
	position: sticky;
    top: 30px;
	padding: 0;
}
li {
	list-style-type: none;
	padding: 8px 0;
}
.menu-sub-title {
	padding: 28px 0 24px 0;
}
a {
	text-decoration: none;
	color: $black-primary;
	&:active {
		color: $black-secondary;
	}
	&:hover {
		color: $black-secondary;
	}
}
.sub {
	border-left: 1px solid rgba(206, 210, 210, 0.4);
	margin: 10px 0 0;
	padding: 0 10px;
	font-size: 14px;
	li{
		padding: 6px 0;
		a {
			font-size: 0.9em;
			color: $black-secondary;
			&:active {
				color: $grey-primary;
			}
			&:hover {
				color: $grey-primary;
			}
		}
	}
}
</style>
