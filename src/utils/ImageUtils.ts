

export async function resizeImage(file:File){
      return new Promise<string>((resolve, reject) => {
          let standardWidth =1000
          let image = new Image()
           image.src = URL.createObjectURL(file)
           image.onload = ()=> {
               let widthHeightAspectRatio = image.width / image.height
               let newHeight =  standardWidth/widthHeightAspectRatio
               let canvas = document.createElement('canvas');
               canvas.width = standardWidth;
               canvas.height = newHeight;
               let context = canvas.getContext('2d');

               context?.drawImage(image, 0, 0, standardWidth, newHeight);
               let base64data = canvas.toDataURL("image/jpeg").split(",")[1]
               resolve(base64data)
           }
      })
    }