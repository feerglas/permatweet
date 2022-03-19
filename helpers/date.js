export const formatDate = (inputDate, locale) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  return inputDate.toLocaleDateString(locale, options)
}
