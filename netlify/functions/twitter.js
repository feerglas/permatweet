/**
 * Sample request url for this function.
 *
 * Remote:
 * https://permatweet.netlify.app/.netlify/functions/twitter?id=1502265834328240145
 *
 * Local (after starting netlify dev):
 * http://localhost:8888/.netlify/functions/twitter?id=1502265834328240145
 */

const fetch = require('node-fetch')
const { TWITTER_API_BAERER } = process.env
const config = {
  apiUrl: 'https://api.twitter.com/2/tweets',
  params: {
    expansions: [
      'attachments.poll_ids',
      'attachments.media_keys',
      'author_id',
      'entities.mentions.username',
      'geo.place_id',
      'in_reply_to_user_id',
      'referenced_tweets.id',
      'referenced_tweets.id.author_id'
    ],
    pollFields: [
      'duration_minutes',
      'end_datetime',
      'id',
      'options',
      'voting_status'
    ],
    mediaFields: [
      'duration_ms',
      'height',
      'media_key',
      'preview_image_url',
      'type',
      'url',
      'width',
      'public_metrics'
    ],
    placeFields: [
      'contained_within',
      'country',
      'country_code',
      'full_name',
      'geo',
      'id',
      'name',
      'place_type'
    ],
    tweetFields: [
      'attachments',
      'author_id',
      'context_annotations',
      'conversation_id',
      'created_at',
      'entities',
      'geo',
      'id',
      'in_reply_to_user_id',
      'lang',
      'public_metrics',
      'possibly_sensitive',
      'referenced_tweets',
      'source',
      'text',
      'withheld'
    ],
    userFields: [
      'created_at',
      'description',
      'entities',
      'id',
      'location',
      'name',
      'pinned_tweet_id',
      'profile_image_url',
      'protected',
      'public_metrics',
      'url',
      'username',
      'verified',
      'withheld'
    ]
  }
}

const getRequestUrl = (id) => {
  const params = [
    `expansions=${config.params.expansions.join(',')}`,
    `poll.fields=${config.params.pollFields.join(',')}`,
    `media.fields=${config.params.mediaFields.join(',')}`,
    `place.fields=${config.params.placeFields.join(',')}`,
    `tweet.fields=${config.params.tweetFields.join(',')}`,
    `user.fields=${config.params.userFields.join(',')}`
  ].join('&')

  return `${config.apiUrl}/${id}?${params}`
}

exports.handler = async (event, context) => {
  try {
    // only handle get requests
    if (event.httpMethod !== 'GET') {
      throw (new Error('... we only accept GET requests'))
    }

    // make sure we get an id parameter
    const tweetId = event.queryStringParameters.id || false
    if (!tweetId) {
      throw (new Error('id parameter is required'))
    }

    // fetch from api
    const data = await fetch(getRequestUrl(tweetId), {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TWITTER_API_BAERER}`
      }
    })

    // parse result
    const result = await data.json()

    // make sure we did not get any errors
    if (Object.keys(result).includes('errors')) {
      throw (new Error(result.errors[0].detail))
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (error) {
    const message = 'Failed fetching twitter data: ' + error

    console.log(message)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: message })
    }
  }
}
