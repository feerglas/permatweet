export const transactionTagKeys = {
  permatweetIntent: 'Permatweet-Intent',
  appVersion: 'App-Version',
  appName: 'App-Name',
  contentType: 'Content-Type',
  authors: 'Authors',
  tweetId: 'Tweet-Id',
  tweetSavedDate: 'Tweet-Saved-Date',
  tweetCreatedDate: 'Tweet-Created-Date',
  tweetAuthorId: 'Tweet-Author-Id',
  tweetAuthorName: 'Tweet-Author-Name',
  tweetContentPreview: 'Tweet-Content-Preview'
}

const transactionTags = {}
transactionTags[transactionTagKeys.permatweetIntent] = 'saved-tweet'
transactionTags[transactionTagKeys.appVersion] = '0.0.1'
transactionTags[transactionTagKeys.appName] = 'permatweet'
transactionTags[transactionTagKeys.contentType] = 'text/html'
transactionTags[transactionTagKeys.authors] = 'Yves Tscherry, Michael Zumstein'
transactionTags[transactionTagKeys.tweetId] = ''
transactionTags[transactionTagKeys.tweetSavedDate] = ''
transactionTags[transactionTagKeys.tweetCreatedDate] = ''
transactionTags[transactionTagKeys.tweetAuthorId] = ''
transactionTags[transactionTagKeys.tweetAuthorName] = ''
transactionTags[transactionTagKeys.tweetContentPreview] = ''

export const config = {
  transaction: {
    tags: transactionTags,
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
    logging: false
  },
  arweaveNet: 'https://arweave.net',
  blockExplorer: 'https://viewblock.io/arweave/tx'
}
