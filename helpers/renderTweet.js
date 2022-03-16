import { formatDate } from './date'
import { ellipsisMiddle } from './ellipsis'

export default (data, isForDocument) => {
  const today = formatDate(new Date())

  // anonymise tweet data
  data.data.author_id = ellipsisMiddle(data.data.author_id)
  delete data.data.entities

  // anonymise user data
  data.includes.users.forEach((user) => {
    user.id = ellipsisMiddle(user.id)
    user.username = ellipsisMiddle(user.username)
    user.name = ellipsisMiddle(user.name)
    user.description = ellipsisMiddle(user.description)
    delete user.profile_image_url
    delete user.entities
  })

  console.log(data)

  const prepend = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
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
      <span> | Tweet created: <time datetime="${formatDate(new Date(data.data.created_at))}">${formatDate(new Date(data.data.created_at))}</time></span>
      <span> | Tweet permanently saved: <time datetime="${today}">${today}</time></span>
    </span>
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
