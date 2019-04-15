if (config.locale !== 'en') {
  const node = document.createElement('script')
  node.src = `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/locale/${config.locale}.js`
  document.body.appendChild(node)
}
