const Twitter = require('twitter-v2')
const { TWITTER_API_BAERER } = process.env

/**
 * Sample request url for this function.
 *
 * Remote:
 * https://permatweet.netlify.app/.netlify/functions/twitter?id=1502265834328240145
 *
 * Local (after starting netlify dev):
 * http://localhost:8888/.netlify/functions/twitter?id=1502265834328240145
 */

const handleError = (error) => {
  const message = 'Failed fetching twitter data: ' + error

  console.log(message)

  return {
    statusCode: 500,
    body: JSON.stringify({ error: message })
  }
}

exports.handler = async (event, context) => {
  try {
    // only handle get requests
    if (event.httpMethod !== 'GET') {
      return handleError('... we only accept GET requests')
    }

    // make sure we get an id parameter
    const tweetId = event.queryStringParameters.id || false
    if (!tweetId) {
      return handleError('id parameter is required')
    }

    // init twitter client
    const client = new Twitter({
      bearer_token: TWITTER_API_BAERER
    })

    // get tweets by id
    // API Reference: https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets
    const { data: tweet, errors } = await client.get('tweets', {
      ids: tweetId,
      tweet: {
        fields: [
          'created_at'
        ]
      }
    })

    if (errors) {
      return handleError('did not find any tweet...')
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ tweet })
    }
  } catch (error) {
    return handleError(error)
  }
}
