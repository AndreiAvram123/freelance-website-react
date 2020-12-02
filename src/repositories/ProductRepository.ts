import {resizeImage} from "../utils/ImageUtils";
import {URL_FETCH_PRODUCT, URL_UPDATE_PRODUCT} from "../utils/ApiConstants";
import {strict} from "assert";
import {ProductCreationModel} from "./ProductModels";

export type ProductModel = {
    productID:number,
    name:string,
    price:number,
    images:Array<ProductImage>
}

export type Category ={
    id:number,
    name: string,
    description:string
}
export type ProductImage = {
    imageURl:string
}

export type ResultProducts ={
    data : ProductModel[]
    error : string
}
export type ResultProduct ={
    data : ProductModel,
    error :string

}

export type ResultCategories ={
    data : Array<Category>,
    error:string
}

export type UpdateProductRequest = {
    name :string,
    price :number
}
export type SimpleResult ={
    error:string
}

export async function updateProduct(productID :number, request:UpdateProductRequest){
    return new Promise<ResultProduct>(((resolve, reject) => {
        let token = localStorage.getItem("token");
        let url = URL_UPDATE_PRODUCT + productID + "/update"
        fetch(url,{
                method : "PUT",
                headers : {
                    Authorization: "Bearer " + token,
                    "Content-type" : "application/json; charset=UTF-8"

                },
                body: JSON.stringify(request)
        }).then(function (response){
            return response.text()
        }).then(data=>{
            let response = JSON.parse(data) as ResultProduct
            let result = {data : response.data, error : response.error}
            resolve(result)
        }).catch(error =>{
            let response = {
                data : undefined,
                error : error.toString()
            }
            reject(response)
        })
    }))
}


export async function fetchProduct(id:number){
    return new Promise<ResultProduct>((resolve, reject) => {
        let token = localStorage.getItem("token");
        let url = URL_FETCH_PRODUCT + id
        fetch(url,{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then(function (response){return  response.text()})
            .then(data =>{
                let response = JSON.parse(data) as ResultProduct
                let result = {data: response.data, error : response.error}
                resolve(result)
            }).catch(error =>{
            let response = {
                data : undefined,
                error : error.toString()
            }
            reject(response)
        })
    })
}

export function fetchSearchSuggestions(query:string){
    return new Promise<ResultProducts>(((resolve, reject) => {
         let token = localStorage.getItem("token");
         let url = "https://rest-kotlin.herokuapp.com/products/search/" + query
        fetch(url,{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then(function (response){return  response.text()})
            .then(data =>{
                let jsonData = JSON.parse(data) as ProductModel[]
                let response = {data : jsonData, error: ""}
                resolve(response)
            }).catch(error =>{
                let response = {
                    data : [],
                    error : error.toString()
                }
                reject(response)
        })
    }))

}


export function fetchProducts(category:string) : Promise<ResultProducts>{
    return new Promise<ResultProducts>((resolve, reject) => {
        let token = localStorage.getItem("token")
        let url = "https://rest-kotlin.herokuapp.com/products?category=" + category
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

export async function createProduct(model:ProductCreationModel){
        let token = localStorage.getItem("token")
        let url = "https://rest-kotlin.herokuapp.com/products/create"
        let imagesData = new Array<string>()
        for(let i =0;i<model.images.length;i++){
            const base64data =  await resizeImage(model.images[0],400,400)
            imagesData.push(base64data)
        }
        const response  = await fetch(url,{
            method : "POST",
            headers : {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json'
            },
            //todo
            //direct serialization
            body : JSON.stringify({productName: model.productName , price : model.price, images: imagesData, categoryID : model.categoryID})
        })
         if(response.status !== 200){
             throw new Error("Error")
         }
         return ""

}
export async function fetchCategories(){
    return new Promise<ResultCategories>((resolve, reject) => {
        let token = localStorage.getItem("token")
        let url = "https://rest-kotlin.herokuapp.com/categories"
        fetch(url,{
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(function (response){
            if(response.status === 404){
                let result :ResultCategories = {
                    data : [],
                    error : "Not found"
                }
                reject(result)
            }
            return response.text()
        }).then(data=>{
            let jsonData = JSON.parse(data) as Category[]
           let result :ResultCategories ={
                data: jsonData,
                error: ""
           }
           resolve(result)
        }).catch(error=>{
            let result :ResultCategories = {
                data : [],
                error : error.toString()
            }
            reject(result)
        })
    })

}
