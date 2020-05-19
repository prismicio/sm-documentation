<template>
    <section class="table-of-content">
        <h5>On this page</h5>
        <ul>
            <li v-for="([anchor, text], index) in sections" :key="`section-${index}`">
                <div class="headingSection">
                    <a :href="`#${anchor}`">
                        {{ text }}
                    </a>
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
    },
    computed: {
        sections: function () {
            const buildAnchor = (text) => text.replace(/\W+/g, '-').toLowerCase()
            return this.slices
                .map((slice) => {
                    if(!(slice.slice_type === 'title' && slice.primary.title)) return;
                    const heading = slice.primary.title.find(elem => elem.type === 'heading2');
                    if(heading) return [buildAnchor(heading.text), heading.text];
                })
                .filter(e => !!e)
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
