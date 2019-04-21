const format = 'YYYY-MM-DD'

const getFormattedMonth = (s, action, months = 1) => (action ? moment(s)[action](months, 'months') : moment(s)).format(format)
export default getFormattedMonth
