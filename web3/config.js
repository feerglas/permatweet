export default {
  transaction: {
    tags: {
      'permatweet-intent': 'saved-tweet',
      'app-version': '0.0.1',
      'app-name': 'permatweet',
      'Content-Type': 'text/html',
      authors: [
        'Yves Tscherry',
        'Michael Zumstein'
      ],
      tweetId: ''
    },
    minAmountOfConfirmations: 3
  },
  requests: {
    retryDelay: 4000
  },
  arweave: {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
    logging: true
  }
}
