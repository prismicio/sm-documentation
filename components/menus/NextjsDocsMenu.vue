<template>
		<ul>
			<li>
				<label class="dropdown">
					<div class="dd-button">
						<img src="../../static/next-logo.svg"/> 
						Next.js
					</div>
					<input type="checkbox" class="dd-input" id="test">
					<ul class="dd-menu">
						<li>
							<nuxt-link to="/documentation/nuxt"><img src="../../static/nuxt-logo.svg"/> Nuxt.js</nuxt-link>
						</li>
					</ul>
				</label>
			</li>
			<li v-for="docItem in docsItems" :key="docItem.field.id">
				<prismic-link :field="docItem.field">{{ docItem.label }}</prismic-link>
				<ul class="sub" v-if="docItem.subItems && docItem.subItems.length > 0">
					<li v-for="subItem in docItem.subItems" :key="subItem.field.id">
						<prismic-link :field="subItem.field">{{ subItem.label }}</prismic-link>
					</li>
				</ul>
			</li>
		</ul>
</template>

<script>
export default {
	name: 'NextjsDocsMenu',
	computed: {
		docsItems: function () {
			return (this.$store.state.menus.next_docs.menu_item || []).map(docEntry => {
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

/* Dropdown */

.dropdown {
  display: inline-block;
  position: relative;
}

.dd-button {
  display: inline-block;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px 30px 10px 20px;
  background-color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}

.dd-button:after {
  content: '';
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
}

.dd-button:hover {
  background-color: #eeeeee;
}


.dd-input {
  display: none;
}

.dd-menu {
  position: absolute;
  top: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
  margin: 2px 0 0 0;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
  background-color: #ffffff;
  list-style-type: none;
}

.dd-input + .dd-menu {
  display: none;
} 

.dd-input:checked + .dd-menu {
  display: block;
} 

.dd-menu li {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
}

.dd-menu li:hover {
  background-color: #f6f6f6;
}

.dd-menu li a {
  display: block;
  margin: -10px -20px;
  padding: 10px 20px;
}
img {
	width: 25px;
}
</style>
