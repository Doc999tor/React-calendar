const mainRequestService = (u, o) => {
  if (!o.headers) o.headers = {}
  if (!o.method) o.method = 'GET'
  o.headers['X-Requested-With'] = 'XMLHttpRequest'
  o.credentials = 'include'
  return fetch(u, o).then(r => {
    if (r.status === 401 || window.isTEST401) {
      window.isTEST401 = false
      window.location.href = config.urls.login
      return
    }
    return r.status === 503
      ? new Promise(resolve => setTimeout(() => resolve(mainRequestService(u, o)), r.headers.get('Retry-After')))
      : r
  })
}

export default mainRequestService
