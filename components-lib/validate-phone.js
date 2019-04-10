export default phone => {
  const r = /^[0-9-+*#]+$/
  return r.test(phone)
}
