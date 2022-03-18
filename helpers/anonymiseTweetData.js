import { ellipsisMiddle } from './ellipsis'

export default (data) => {
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

  return data
}
