<template>
    <section class="container">
        <h2 class="title">Table of Contents</h2>
        <ul>
            <section v-for="(slice, index) in slices" :key="`slice-${index}`">
                <div v-if="slice.slice_type === 'title'">
                    <div v-for="(element, index) in slice.primary.title" :key="`element-${index}`">
                        <div v-if="element.type === 'heading2'">
                            <li class="headingSection">
                                <a :href="`#${element.text.replace(/\W+/g, '-').toLowerCase()}`">
                                    {{ element.text }}
                                </a>
                            </li>
                        </div>
                    </div>
                </div>
            </section>
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
.title {
  margin-top: 50px;
  border-bottom: 2px solid #DADADA;
  margin-bottom: 25px;
}
</style>