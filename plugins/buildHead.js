import Vue from 'vue'

export default (context) => {
  const buildHead = (doc) => {
    if (doc) {
      const socialCardData = doc.data.social_cards
        ? getSocialCardData(doc.data.social_cards)
        : []

      return {
        title: context.$prismic.asText(doc.data.meta_title),
        meta: [
          { hid: 'description', name: 'description', content: context.$prismic.asText(doc.data.meta_description) },
          ...socialCardData
        ]
      }
    }
  }

  const getSocialCardData = (socialCards) => {
    const socialCardsData = socialCards.map((slice) => {
      switch (slice.slice_type) {
        case 'general_card':
          return getGeneralCardData(slice)
        case 'twitter_card':
          return getTwitterCardData(slice)
        default:
          return null
      }
    })

    return [].concat.apply([], socialCardsData).filter(el => el != null)
  }

  const getGeneralCardData = slice => (
    [
      { property: 'og:title', content: context.$prismic.asText(slice.primary.title) },
      { property: 'og:site_name', content: 'Vue Example' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: slice.primary.image.url },
      { property: 'og:description', content: context.$prismic.asText(slice.primary.description) }
    ]
  )

  const getTwitterCardData = (slice) => {
    const twitterCards = {
      'Standard Summary Card': {
        card: 'summary',
        imageUrl: slice.primary.image.url
      },
      'Summary Card with Large Image': {
        card: 'summary_large_image',
        imageUrl: slice.primary.image.large_image.url
      }
    }

    const twitterCard = twitterCards[slice.primary.card_type]

    return [
      { name: 'twitter:card', content: twitterCard.card },
      { name: 'twitter:title', content: context.$prismic.asText(slice.primary.title) },
      { name: 'twitter:description', content: context.$prismic.asText(slice.primary.description) },
      { name: 'twitter:image', content: twitterCard.imageUrl }
    ]
  }

  Vue.prototype.$buildHead = buildHead
  context.$buildHead = buildHead
}
