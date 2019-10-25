import { default as getOrientation } from 'project-components/getOrientation.js'
export default (photo, bar) => {
  let img = new Image()
  getOrientation(photo, or => {
    let reader = new FileReader()
    reader.readAsDataURL(photo)
    reader.onload = () => { img.src = reader.result }
    img.onload = () => {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let w = img.width
      let h = img.height
      if (w > config.data.max_side || h > config.data.max_side) {
        if (w > h) {
          if (w > config.data.max_side) {
            h = (h * config.data.max_side) / w
            w = config.data.max_side
          }
        } else {
          if (h > config.data.max_side) {
            w = (w * config.data.max_side) / h
            h = config.data.max_side
          }
        }
      }
      if (or > 4 && or < 9) {
        canvas.width = h
        canvas.height = w
      } else {
        canvas.width = w
        canvas.height = h
      }
      switch (or) {
      case 2: ctx.transform(-1, 0, 0, 1, w, 0); break
      case 3: ctx.transform(-1, 0, 0, -1, w, h); break
      case 4: ctx.transform(1, 0, 0, -1, 0, h); break
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
      case 6: ctx.transform(0, 1, -1, 0, h, 0); break
      case 7: ctx.transform(0, -1, -1, 0, h, w); break
      case 8: ctx.transform(0, -1, 1, 0, 0, w); break
      default: break
      }
      ctx.drawImage(img, 0, 0, w, h)
      let dataURL = canvas.toDataURL('image/jpeg', 0.8)
      bar(dataURL)
    }
  })
}
