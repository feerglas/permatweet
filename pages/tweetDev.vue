<template>
  <div v-html="tweetHtml" />
</template>

<script>
import renderTweet from '../helpers/renderTweet'

const sampleTweetJson = {
  data: {
    possibly_sensitive: false,
    text: 'Die Bahn- und Busbetriebe testen derzeit neue Modelle. Vergessen gehen dabei jene Menschen, die kein Smartphone haben. (Abo) https://t.co/vSO2Ym2jBW',
    id: '1493472643785310212',
    public_metrics: {
      retweet_count: 0,
      reply_count: 0,
      like_count: 1,
      quote_count: 0
    },
    created_at: '2022-02-15T06:30:00.000Z',
    lang: 'de',
    entities: {
      urls: [
        {
          start: 125,
          end: 148,
          url: 'https://t.co/vSO2Ym2jBW',
          expanded_url:
            'https://www.tagesanzeiger.ch/das-gute-alte-bahnbillett-stirbt-aus-840937266895?utm_source=twitter&utm_medium=social-ed&utm_campaign=SZ_ed_9_eng_som_ch_xx_PRM_SZ_2022-feb&utm_content=link',
          display_url: 'tagesanzeiger.ch/das-gute-alte-zeit',
          images: [
            {
              url: 'https://pbs.twimg.com/news_img/1492972286311284738/yPLvFl8P?format=jpg&name=orig',
              width: 1200,
              height: 779
            },
            {
              url: 'https://pbs.twimg.com/news_img/1492972286311284738/yPLvFl8P?format=jpg&name=150x150',
              width: 150,
              height: 150
            }
          ],
          status: 200,
          title:
            'Digitale Revolution im ÖV Das gute alte Bahnbillett stirbt aus',
          description:
            'Sondertarife fÃ¼r Teilzeitarbeitende und fÃ¼r Flexible: Die Bahn- und Busbetriebe testen derzeit neue Modelle. Vergessen gehen dabei jene Menschen, die kein Smartphone haben.',
          unwound_url:
            'https://www.tagesanzeiger.ch/das-gute-alte-bahnbillett-stirbt-aus-840937266895?utm_source=twitter&utm_medium=social-ed&utm_campaign=SZ_ed_9_eng_som_ch_xx_PRM_SZ_2022-feb&utm_content=link'
        }
      ]
    },
    source: 'TweetDeck',
    conversation_id: '1493472643785310212',
    author_id: '43069596'
  },
  includes: {
    users: [
      {
        protected: false,
        name: 'SonntagsZeitung',
        location: 'ZÃ¼rich',
        verified: true,
        description:
          'Hier twittert die Social-Media-Redaktion die besten Storys des Wochenendes.',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/887618890783744001/fGB4Zr7d_normal.jpg',
        url: 'https://t.co/RWwVT3BmCq',
        username: 'sonntagszeitung',
        public_metrics: {
          followers_count: 56273,
          following_count: 35,
          tweet_count: 12364,
          listed_count: 419
        },
        created_at: '2009-05-28T07:50:58.000Z',
        id: '43069596',
        entities: {
          url: {
            urls: [
              {
                start: 0,
                end: 23,
                url: 'https://t.co/RWwVT3BmCq',
                expanded_url: 'http://www.sonntagszeitung.ch',
                display_url: 'sonntagszeitung.ch'
              }
            ]
          }
        }
      }
    ]
  }
}

export default {
  name: 'TweetDev',
  data () {
    return {
      tweetHtml: ''
    }
  },
  mounted () {
    this.tweetHtml = renderTweet(sampleTweetJson, false)
  }
}

</script>
