const base64toKB = (base64: String) => {
  // Convierte la cadena base64 en un array de bytes
  const bytes = atob(base64.split(',')[1]);
  // Calcula el tamaño en kilobytes
  const kb = bytes.length / 1024;
  // Devuelve el tamaño en kilobytes como un número redondeado a 2 decimales
  return Number.parseFloat(kb).toFixed(2);
}

const resizeImage = (src: any, width = 480, quality = 0.9) => {
  let img = new Image()
  img.src = src.base64
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const allowedImages = ['image/jpeg', 'image/jpg', 'image/png']
      const isValidImage = allowedImages.filter(allowed => allowed === src.type).length

      if(!isValidImage) reject('Invalid Format')
      
      let canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      // Set Canvas Height And Width According to Image Size And Scale
      const isLandscape = img.width > img.height
      const canvasWidth = isLandscape ? width : (width * img.width) / img.height
      const canvasHeigth = isLandscape ? (img.height * width) / img.width : width

      canvas.setAttribute("width", canvasWidth.toString())
      canvas.setAttribute("height", canvasHeigth.toString())

      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }

      const base64Image = canvas.toDataURL('image/jpeg', quality);
      const imageSize = base64toKB(src.base64);

      const response = {
        type: src.type,
        name: src.name,
        base64: base64Image,
        size: imageSize,
      };

      console.log('response: ', response);

      resolve(response);

      // resolve({
      //   type: 'image/jpeg',
      //   src: canvas.toDataURL('image/jpeg', quality),
      //   weight: src.length,
      // })
      // resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = reject
  })
}

export default resizeImage