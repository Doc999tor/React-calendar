self.addEventListener('install', event => {
  console.log('install')
  try {
    console.log('typeof System in install', typeof System)
  } catch (e) {
    console.log('err', e)
  }
  console.log('caching')
})

// without fetch will not work
self.addEventListener('fetch', function (event) {})
