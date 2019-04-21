const format = 'YYYY-MM-DD'

const getFormattedDate = (s, action, months, days = 1) => (action ? moment(s)[action](days, months) : moment(s)).format(format)
export default getFormattedDate
