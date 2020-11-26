let canvas = document.createElement("canvas");

export async function resizeImage(file:File, newWidth:number, newHeight:number){
    return new Promise<string>((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            if (typeof fileReader.result === "string") {
                resizeImageWithCanvas(fileReader.result);
            }
        });
        //check if the file has been chose
        if (file) {
            fileReader.readAsDataURL(file);
        }


        function resizeImageWithCanvas(imageData:string) {
            const img = new Image();
            img.src = imageData;
            img.onload = () => {
                canvas.width = newWidth;
                canvas.height = newHeight;
                const context = canvas.getContext("2d");
                context?.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve (canvas.toDataURL("image/jpeg").split(",")[1])
            }
        }

    })
}