export default (c, u) => c !== '0' && c !== 0 ? moment.utc().add(c, u).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : undefined
