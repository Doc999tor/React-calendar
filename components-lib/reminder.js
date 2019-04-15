export default (c, u) => c !== '0' && c !== 0 ? moment().add(c, u).format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss')
