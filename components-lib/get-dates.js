export const getEndOf = d => moment(d).endOf('month').get('date')
export const getD = (d, u) => moment(d).get(u)
