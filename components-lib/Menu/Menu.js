import './Menu.css'

const Menu = () => {
  var topbarMore = document.querySelector('.more_wrap')
  var menuModal = document.getElementById('menu_modal')
  let menuListener = e => {
    if (e.target === document.querySelector('.menu-logo') || e.target.parentNode === document.querySelector('.menu-logo')) {
      return false
    }
    if (menuModal.classList.contains('show')) {
      menuModal.classList.add('hide')
      setTimeout(()=>{menuModal.classList.remove('show', 'hide')}, 1500) 
      document.body.classList.remove('no-scroll')
    }
  }
  let topbarListener = () => {
    menuModal.classList.remove('hide')
    menuModal.classList.add('show')
    document.body.classList.add('no-scroll')
    document.body.style.pointerEvents = 'none'
    setTimeout(()=>{document.body.style.pointerEvents = ''}, 1500) 
  }

  // we need a listener after returning
  setTimeout(() => {
    topbarMore && topbarMore.addEventListener('click', topbarListener)
    topbarMore && menuModal && menuModal.addEventListener('click', menuListener)
  }, 100)
  if (!topbarMore) {
    topbarMore && topbarMore.removeEventListener('click', topbarListener)
    menuModal && menuModal.removeEventListener('click', menuListener)
  }

  let menu = `<div id='menu_modal' style="direction: ${config.data.isRTL ? 'rtl' : 'ltr'}">
  <div class='menu_wrap'>
    <div class='list-wrap'>
      <div class='menu'>
        <div class='menu-logo'>
          <div class='logo'>
            <img class='business_logo' src=${config.user.business_logo} />
          </div>
          <p class='business_name'>${config.user.business_name}</p>
          <p class='business_address'>
            <img class='business_address_img' src=${config.urls.menu_icons}map-pin.svg />
            ${config.user.business_address}
          </p>
        </div>
        <nav class='menu-list'>${config.menu.map((item, key) => {
          return (`<li class='list-item' key=${key}>
              <a class='item-link' href=${item.link}>
              <img class='menu-img' src=${config.urls.menu_icons + item.icon} alt=${item.text} />
              ${config.translations.menu[item.text]}
              </a></li>`
          )
        })}
        </nav>
      </div>
    </div>
  </div>
</div>`

  return (menu.replace(/,/g, ''))
}

export default Menu
