const title = 'Csdoker\'s Blog'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
