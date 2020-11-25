
export type ProductModel = {
    id:number,
    name:string,
    price:number,
    image:string
}

export type ResultProduct ={
    data : ProductModel[]
    error : string
}


export function fetchRecentProducts() : Promise<ResultProduct>{
    return new Promise<ResultProduct>((resolve, reject) => {
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
            let jsonData = JSON.parse(data) as ProductModel[]
             resolve({data : jsonData, error : ""})
        }).catch(error=> {
           reject({data : [], error: error.toString()})
        })
    })

}

export function createProduct(productName :string,productPrice:number){
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
