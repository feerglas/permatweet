import ogProperties from './ogProperties'
import { formatDate } from './date'
import anonymiseTweetData from './anonymiseTweetData'

export default (_data, isForDocument) => {
  const today = formatDate(new Date(), 'en-EN')

  // anonymise data
  const data = anonymiseTweetData(_data)

  const _ogProperties = ogProperties.map((item) => {
    return `<meta property="${item.property}" content="${item.content}">`
  }).join('')

  const prepend = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    ${_ogProperties}
    <link rel="icon" type="image/x-icon" href="https://arweave.net/PwLnzYGJqtBpJA68xqVGBHb_CzVGTVht4vmMHPo001A">
    <script type="text/javascript">
      window.permatweet = {};
      window.permatweet.rawData = ${JSON.stringify(data)};
    </script>
    </head>
  <body>
`

  const append = '</body></html>'

  const template = `
<article class='permatweet' style='max-width: 33rem; --permatweet-box-shadow-color: rgba(57,255,20,1); font-family: system, -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif; box-shadow: .75rem -0.5rem 2rem -.9rem var(--permatweet-box-shadow-color); border: calc(1rem/9) solid #777; border-radius: 0.5rem; margin-block-start: 3rem; margin-block-end: 3rem; padding: 1rem;'>
  <h1 class='permatweet__content' style='padding-block-end: 0.85rem;'>
    <!-- We need to create links/anchor tags if there are links within the tweet -->
    ${data.data.text}
  </h1>
  <div class='permatweet__meta' style='font-size: 0.85rem; color: #000;'>
    <span>Tweet author: ${data.data.author_id}</span> <span>aka</span> <span>${data.includes.users[0].username}</span>
    <span>
      <span> | Tweet created: <time datetime="${formatDate(new Date(data.data.created_at), 'en-EN')}">${formatDate(new Date(data.data.created_at), 'en-EN')}</time></span>
      <span> | Tweet permanently saved: <time datetime="${today}">${today}</time></span>
    </span>
  </div>
  <div class='permatweet__metrics' style='font-size: 0.85rem; color: #000; margin-block-start: 0.425rem;'>
    ${data.data.public_metrics.like_count} likes | ${data.data.public_metrics.quote_count} quotes | ${data.data.public_metrics.reply_count} replies | ${data.data.public_metrics.retweet_count} retweets
  </div>
</article>
`

  if (isForDocument) {
    return `
${prepend}
${template}
${append}
`
  }

  return template
}
