import {resizeImage} from "../utils/ImageUtils";
import {
    URL_FETCH_CATEGORIES,
    URL_FETCH_PRODUCT,
    URL_FETCH_PRODUCTS,
    URL_FETCH_SUGGESTIONS,
    URL_UPDATE_PRODUCT
} from "../utils/ApiConstants";
import {ProductCreationModel} from "./ProductModels";
import {getToken} from "../components/StorageHandler";
import makeCall from "./CallRunner";
import {url} from "inspector";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";

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
        let token = getToken();
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
        let token =  getToken()
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

export async function fetchSearchSuggestions(query:string){
    let url = URL_FETCH_SUGGESTIONS + query
    const response = await makeCall(new ApiRequest(url,HTTPMethods.GET))
    return response  as ProductModel[]
}


export async function fetchProducts(category:string) {
    let url = URL_FETCH_PRODUCTS + "?category="+category
    let result = await makeCall(new ApiRequest(url,HTTPMethods.GET))
    return result as ProductModel[]
}

export async function createProduct(model:ProductCreationModel){
        let token = getToken()
        let url = "https://rest-kotlin.herokuapp.com/products/create"
        let imagesData = new Array<string>()
        for(let i =0;i<model.images.length;i++){
            const base64data =  await resizeImage(model.images[0])
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
        let json = await makeCall(new ApiRequest(URL_FETCH_CATEGORIES,HTTPMethods.GET))
        return  json as Category[]
}
