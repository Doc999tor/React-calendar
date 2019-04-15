export default date => {
  moment.locale(config.locale)
  if (moment(date) < moment()) {
    return config.translations.was_ago + moment(date).endOf('day').fromNow()
  }
  return moment(date).endOf('day').fromNow()
}
