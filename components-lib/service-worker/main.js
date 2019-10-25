import './components/home/home.jsx'
import './main.styl'

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js')
  // navigator.serviceWorker.ready always resolve
  navigator.serviceWorker.ready.then(registration => {
    console.log('Service worker successfully registered on scope', registration.scope)
  })
})

// Code to handle install prompt on desktop
let deferredPrompt
const callPrompt = document.body
// user is not yet using desktop version -> prompt
if (!window.matchMedia('(display-mode: standalone)').matches) {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
    callPrompt.addEventListener('click', e => {
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
        deferredPrompt = null
      })
    })
  })
}
$(document).ready(() => {
  config.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
})
