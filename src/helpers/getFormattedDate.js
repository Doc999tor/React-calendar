const format = 'YYYY-MM-DD'

const getFormattedDate = (s, action, days = 1) => (action ? moment(s)[action](days, 'days') : moment(s)).format(format)
export default getFormattedDate
