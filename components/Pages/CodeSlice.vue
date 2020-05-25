<template>
	<div class="code-wrapper">
		<vue-code-highlight>{{codeText}}</vue-code-highlight>
		<button class="copy"
			type="button"
			v-clipboard:copy="codeText"
			v-clipboard:success="onCopy">
			{{buttonValue}}
		</button>
	</div>
</template>

<script>
import { RichText } from 'prismic-dom';
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { component as VueCodeHighlight } from 'vue-code-highlight';
import Body from '@/components/Body'

Vue.use(VueClipboard)

const ButtonValue = {
	Copy: 'copy',
	Copied: 'copied!'
}

export default {
	name: 'CodeSlice',
	data () {
		return {
			index: null,
			buttonValue: ButtonValue.Copy
		}
	},
	components: {
		Body,
		VueCodeHighlight
	},
	computed: {
		codeText: function() {
			return RichText.asText(this.slice.primary.snippet);
		}
	},
	methods: {
		toggleButton() {
			if(this.buttonValue === ButtonValue.Copy) {
				this.buttonValue = ButtonValue.Copied;
			} else {
				this.buttonValue = ButtonValue.Copy;
			}
		},
		onCopy: function (e) {
			this.toggleButton();
			setTimeout(() => {
				this.toggleButton();
			}, 3000);
    }
	},
	props: {
		slice: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss">
.code-wrapper {
	position: relative;
	.copy {
		position: absolute;
	    top: 10px;
	    padding: 7px 10px;
	    background: #ffffff1f;
	    border-radius: 2px;
	    border: none;
	    color: #ffffff;
	    right: 10px;
	    z-index: 1;
	}
}
/*
SOLARIZED HEX
--------- -------
base03    #002b36
base02    #073642
base01    #586e75
base00    #657b83
base0     #839496
base1     #93a1a1
base2     #eee8d5
base3     #fdf6e3
yellow    #b58900
orange    #cb4b16
red       #dc322f
magenta   #d33682
violet    #6c71c4
blue      #268bd2
cyan      #2aa198
green     #859900
*/

@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

code[class*="language-"],
pre[class*="language-"] {
	color: #fff; /* base00 */
	font-family: 'Source Code Pro', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	font-size: 14px;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;

	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
	background: #073642; /* base02 */
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
	background: #073642; /* base02 */
}

/* Code blocks */
pre[class*="language-"] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
	border-radius: 0.3em;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background-color: #23262b; /* base3 */
}

/* Inline code */
:not(pre) > code[class*="language-"] {
	padding: .1em;
	border-radius: .3em;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #777777; /* base1 */
}

.token.punctuation {
	color: #88c6be; /* base01 */
}

.namespace {
	opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
	color: #fc929e; /* blue */
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.url,
.token.inserted {
	color: #8dc891; /* cyan */
}

.token.entity {
	color: #657b83; /* base00 */
	background: #eee8d5; /* base2 */
}

.token.atrule,
.token.attr-value,
.token.keyword {
	color: #c5a5c5; /* green */
}

.token.function,
.token.class-name {
	color: #fac863; /* yellow */
}

.token.regex,
.token.important,
.token.variable {
	color: #cb4b16; /* orange */
}

.token.important,
.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}
</style>
