<template>
		<ul>
			<li>
				<div class="select-box">
					<div class="select-box__current" tabindex="1">
						<div class="select-box__value">
							<input class="select-box__input" type="radio" id="4" value="5" name="Ben" checked="checked"/>
							<p class="select-box__input-text"><img src="../../static/next-logo.svg"/> Next.js</p>
						</div><img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
					</div>
					<ul class="select-box__list">
							<nuxt-link to="/documentation/nuxt">
								<label class="select-box__option" aria-hidden="aria-hidden">
									<img src="../../static/nuxt-logo.svg"/> Nuxt.js
								</label>
							</nuxt-link>
					</ul>
				</div>
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
.select-box {
  position: relative;
  display: inline-block;
  width: 90%;
  margin: 0 auto;
  font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
  font-size: 18px;
  color: #60666d;
  
  &__current {
    position: relative;
    cursor: pointer;
    outline: none;
    
    &:focus {
      & + .select-box__list {
        opacity: 1;

        // We have to set "animation-name: none;" to make the list visible (read below how it works)

        animation-name: none;
        
        .select-box__option {
          cursor: pointer;
        }
      }
      
      .select-box__icon {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }
  
  &__icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 20px;
    opacity: 0.3;
    transition: 0.2s ease;
  }
  
  &__value {
    display: flex;
  }
  
  &__input {
    display: none;
    
    &:checked + .select-box__input-text {
      display: block;
    }
  }
  
  &__input-text {
    display: none;
    width: 100%;
    margin: 0;
    padding: 15px;
    background-color: #fff;
		border: 1px solid rgba(206, 210, 210, 0.4);
		border-radius: 5px;
		img {
			width: 25px;
			margin-bottom: -6px;
		}
  }
  
  &__list {
    position: absolute;
    width: 100%;
    padding: 0;
    list-style: none;
    opacity: 0;
		border: 1px solid rgba(206, 210, 210, 0.4);
		border-radius: 5px;
    
    // We need to use animation with delay.
    // Otherwise the click event will not have time to run on label, because this element disapears immediately when .select-box__current element loses the focus.
    // This delay will not be noticed because we set "opacity" to "0".
    // We also use "animation-fill-mode: forwards" to make the list stay hidden.
    
    animation-name: HideList;
    animation-duration: 0.5s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: step-start;
    box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
  }
  
  &__option {
    display: block;
    padding: 15px;
    background-color: #fff;
		border-radius: 5px;
    
    &:hover,
    &:focus {
      color: #546c84;
      background-color: #fbfbfb;
    }

		img {
			width: 25px;
			margin-bottom: -6px;
		}
  }
}

@keyframes HideList {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0);
  }
}
</style>
