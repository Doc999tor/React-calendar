const mainRequestService = (u, o) => {
  if (!o.headers) o.headers = {}
  if (!o.method) o.method = 'GET'
  o.headers['X-Requested-With'] = 'XMLHttpRequest'
  o.credentials = 'include'
  return fetch(u, o).then(r => {
    if (r.status === 401) {
      window.location.href = window.location.origin + config.urls.login
    } else if (r.status === 503) {
      return new Promise(resolve => setTimeout(() => resolve(mainRequestService(u, o)), r.headers.get('Retry-After')))
    } else {
      return r
    }
  })
}

export default mainRequestService
