export default {
  transaction: {
    tags: {
      'Permatweet-Intent': 'saved-tweet',
      'App-Version': '0.0.1',
      'App-Name': 'permatweet',
      'Content-Type': 'text/html',
      Authors: [
        'Yves Tscherry',
        'Michael Zumstein'
      ],
      'Tweet-Id': ''
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
  },
  arweaveNet: 'https://arweave.net'
}
