export default date => {
  moment.locale(config.locale)
  return moment(date).format('MMM, DD ddd, YYYY')
}
