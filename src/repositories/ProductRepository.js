export function fetchRecentProducts(){
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token")
        let url = "https://rest-kotlin.herokuapp.com/products/recent"
        fetch(url, {
                headers : {
                    Authorization: "Bearer " + token
                }
            }
        ).then(function (response) {
            return response.text()
        }).then(data=>{
            resolve(JSON.parse(data))
        }).catch(error=> {
            console.log(error)
        })
    })

}

export function createProduct(productName,productPrice){
    let token = localStorage.getItem("token")
    let url = "https://rest-kotlin.herokuapp.com/products/create"
    fetch(url,{
        method : "POST",
        headers : {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({productName: productName , price : productPrice})
    }).catch(error=>{
        console.log(error)
    })
}
