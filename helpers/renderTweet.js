export default (data, isForDocument) => {
  const prepend = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script id="permatweetRawData">
      window.permatweet.rawData = ${JSON.stringify(data)}
    </script>
  </head>

  <body>
`

  const append = '</body></html>'

  const template = `
  <article style="border: 1px solid #ccc; border-radius: 0.5rem; margin-block-start: 7em; margin-block-end: 7em; padding: 1rem; transform: skew(-3deg, 9deg); box-shadow: 1.25rem -0.5rem 2rem -0.7rem rgba(255,0,183,0.83)">
    <h1>
      <!-- We need to create links/anchor tags if there are links within the tweet -->
      ${data.data.text}
    </h1>
    <p>
      <span>Tweet author: ${data.data.author_id}</span> <span>aka</span> <span>${data.includes.users[0].username}</span>
    </p>
    <p>
      Tweet created: <time :datetime="${data.data.created_at}">${data.data.created_at}</time>, Tweet permanently saved: <time datetime="">CURRENT DATE/TIME</time>
    </p>
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
