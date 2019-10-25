export default date => {
  moment.locale(config.locale)
  if (moment(date) < moment()) {
    return config.translations.was_ago + moment(date).fromNow()
  }
  return moment(date).fromNow()
}
