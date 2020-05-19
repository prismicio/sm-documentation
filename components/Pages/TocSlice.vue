<template>
    <section class="table-of-content">
        <h5>On this page</h5>
        <ul>
            <li v-for="(slice, index) in slices" :key="`slice-${index}`">
                <div v-if="slice.slice_type === 'title'">
                    <div v-for="(element, index) in slice.primary.title" :key="`element-${index}`">
                        <div v-if="element.type === 'heading2'">
                            <div class="headingSection">
                                <a :href="`#${element.text.replace(/\W+/g, '-').toLowerCase()}`">
                                    {{ element.text }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'toc-slice',
    props: {
		slices: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
.table-of-content{
    position: sticky;
    top: 30px;
    padding: 0;
}
h5{
    margin: 0;
    text-transform: uppercase;
    font-size: 13px;
    opacity: 0.8;
}
ul{
    list-style-type: none;
    margin: 0!important;
    padding: 0!important;
    font-size: 14px!important;
}
a {
    color: #0f0f0f;
    text-decoration: none;
    opacity: 0.8;
}
a:hover{
    opacity: 1;
}
</style>

<style lang="scss">
@import '../../style/variables.scss';
    .table-of-content{
        display: none;
        @include lg {
            display: block;
        }
    }
</style>