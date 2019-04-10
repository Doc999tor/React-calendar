export default (p, t) => {
  Object.keys(config.translations.tags).forEach(i => {
    p = p.replace(new RegExp(config.translations.tags[i], 'gm'), t ? '$$$' + i + '$$$' : config.tags_list[i].value)
  })
  return p
}
