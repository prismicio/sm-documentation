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
  if (doc.uid === 'documentation') {
    return `/${doc.uid}`
  }
  if (doc.tags.includes('docs-sub-page')) {
    if (!doc.data) {
      return `/documentation/${doc.uid}`
    } else {
      return (doc.data.parent ? `/documentation/${doc.data.parent.uid}/${doc.uid}` : `/documentation/${doc.uid}`)
    }
  }
  return null
}
