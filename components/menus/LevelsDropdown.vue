<template>
  <div class="nav">
    <div v-for="menuitem in docsItems" :key="menuitem.id" class="multi-level">
      <div v-if="menuitem.slice_type === '1st_level' && menuitem.primary.nav_link.isBroken === false">
        <ul>
            <prismic-link :field="menuitem.primary.nav_link">
                <li>
                    <label class="top-level-link">{{ menuitem.primary.link_text }}</label>
                </li>
            </prismic-link>
        </ul>
      </div>
      <div v-else-if="menuitem.slice_type === '1st_level' && menuitem.primary.nav_link.isBroken !== false" class="item">
        <input type="checkbox" :id="menuitem.primary.link_text"/>
        <label :for="menuitem.primary.link_text" class="top-level-dropdown"><img class="arrow" src="~/static/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>{{ menuitem.primary.link_text }}</label>
        
        <ul>
            <div v-for="item in menuitem.children" :key="item.primary.link_text">
                <prismic-link :field="item.primary.nav_link" v-if="item.slice_type === '2nd_level' && item.primary.nav_link.isBroken === false">
                    <li>
                        <label class="second-level-link">{{ item.primary.link_text }}</label>
                    </li>
                </prismic-link>
                <li v-else-if="item.slice_type === '2nd_level' && item.primary.nav_link.isBroken !== false">
                    <div>
                        <input type="checkbox" :id="menuitem.primary.link_text.concat(item.primary.link_text)"/>
                        <label :for="menuitem.primary.link_text.concat(item.primary.link_text)" class="second-level-dropdown">
                            <img class="arrow" src="~/static/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>{{item.primary.link_text}}
                        </label>
                        <ul class="third-level-group">
                            <prismic-link v-for="subitem in item.items" :key="subitem.third_level_link_text" :field="subitem.third_level_link">
                                <li class="sub-item">
                                    <label class="third-level-link">{{subitem.third_level_link_text}}</label>
                                </li>
                            </prismic-link>
                        </ul>
                    </div>
                </li>
            </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'DocsMenu',
    computed: {
        docsItems: function(){
            const myArray = this.$store.state.menus.docsmenu.body.reduce((acc, slice, i) => {
            if (slice.slice_type !== '1st_level') {
                return acc
            }
            const currentSlices = this.$store.state.menus.docsmenu.body.slice(i + 1)
            const latest2nd = currentSlices.findIndex((e, index) => {
                if (e.slice_type === '2nd_level' && (!currentSlices[index + 1] || currentSlices[index + 1].slice_type !== '2nd_level')) {
                return true
                }
                return false
            })
            const children = latest2nd > -1 ? currentSlices.slice(0, latest2nd + 1) : []
            return [...acc, { ...slice, children }]
            }, [])
            return myArray
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
/*Func*/

.item ul, .nav input[type="checkbox"] {
    display: none;
}
.item input:checked ~ ul {
    display: block;
}

/*Arrow*/
.arrow {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%) rotate(270deg);
    width: 10px;
    transition: 0.2s ease;
    color: $black-secondary;
}

.item input:checked + label .arrow {
    transform: translateY(-50%) rotate(360deg);
}

/*Styles*/

ul {
    padding: 0;
}

li {
    list-style: none;
}

label {
    width: 100%;
    display: block;
    z-index: 3;
    position: relative;
    line-height: 50px;
    &:hover {
		cursor: pointer;
	}
}

.top-level-link {
    padding-left: 5px;
    border-bottom: 1px solid rgba(206, 210, 210, 0.4);
    &:hover {
        background: #f8f8f8;
	}
}
.top-level-dropdown {
    padding-left: 5px;
    border-bottom: 1px solid rgba(206, 210, 210, 0.4);
    &:hover {
        background: #f8f8f8;
	}
}
.second-level-link {
    font-size: .9em;
    padding-left: 5px;
    border-left: 5px solid #f8f8f8;
    background: #f8f8f8;
    &:hover {
        border-left: 5px solid #e9e9e9;
        background: #e9e9e9;
	}
}
.second-level-dropdown {
    font-size: .9em;
    padding-left: 5px;
    border-left: 5px solid #f8f8f8;
    background: #f8f8f8;
    &:hover {
        border-left: 5px solid #e9e9e9;
        background: #e9e9e9;
	}
}
.third-level-group {
    padding: 5px 0 5px 0;
    background: #e9e9e9;
}
.third-level-link {
    font-size: .8em;
    line-height: 20px;
    padding: 10px 0 10px 5px;
    border-left: 5px solid #e9e9e9;
    background: #e9e9e9;
    &:hover {
        border-left: 5px solid #5163ba;
	}
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
</style>
