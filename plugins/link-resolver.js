/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }
  if (doc.type === 'home') {
    return `/`
  }
  if (doc.type === 'component_library') {
    return `/component-library`
  }
  if (doc.uid === 'contributing') {
    return '/wip'
  }
  if (doc.uid === 'about') {
    return `/${doc.uid}`
  }
  if (doc.uid === 'documentation') {
    return `/${doc.uid}`
  }
  if (doc.tags.includes('tutorials')) {
    return `/documentation/${doc.uid}`
  }
  if (doc.tags.includes('deeplearning')) {
    return `/documentation/${doc.uid}`
  }
  return '/not-found'
}
