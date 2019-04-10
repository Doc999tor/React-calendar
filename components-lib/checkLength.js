export default p => {
  let maxChar = config.MAX_UNICODE_FIRST_PAGE
  let length = p && p.length
  let isUnicode = false
  let tagsLength = 0
  let smsCount = 0
  let isOk = false
  const calc = (a, b) => {
    if (l > 0 && l < a + 1) { maxChar = a; smsCount = 1 } else
    if (l > a) { smsCount = Math.ceil((l - a) / b) + 1; maxChar = a + (b * (smsCount - 1)) }
  }
  Object.keys(config.translations.tags).forEach(i => {
    p = p.replace(new RegExp(config.translations.tags[i], 'gm'), () => { tagsLength += config.tags_list[i].average_length; return '' })
  })
  let l = length + tagsLength
  for (let i = 0; i < length; i++) !isUnicode && p.charCodeAt(i) > 127 && p[i] !== '€' && (isUnicode = true)
  if (isUnicode) calc(config.MAX_UNICODE_FIRST_PAGE, config.MAX_UNICODE_NEXT_PAGES)
  else calc(config.MAX_ASCII_PAGE, config.MAX_ASCII_NEXT_PAGES)
  if (smsCount > config.max_sms_pages) isOk = true
  return {str: maxChar - l + '/' + smsCount, isOk: isOk}
}
