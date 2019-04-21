const format = 'YYYY-MM-DD'

const getFormattedDate = (s, action, range = 'days', number = 1) => (action ? moment(s)[action](number, range) : moment(s)).format(format)
export default getFormattedDate
