const Twitter = require('twitter-v2')
const { TWITTER_API_BAERER } = process.env

const handleError = (error) => {
  const message = 'Failed fetching twitter data: ' + error

  console.log(message)

  return {
    statusCode: 500,
    body: JSON.stringify({ error: message })
  }
}

exports.handler = async (event) => {
  try {
    const tweetId = event.queryStringParameters.id || false

    if (!tweetId) {
      return handleError('id parameter is required')
    }

    const client = new Twitter({
      bearer_token: TWITTER_API_BAERER
    })

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
