import {resizeImage} from "../utils/ImageUtils";
import {
    URL_CREATE_PRODUCT, URL_DELETE_PRODUCT,
    URL_FETCH_CATEGORIES,
    URL_FETCH_PRODUCT,
    URL_FETCH_PRODUCTS, URL_FETCH_RECENT_PRODUCTS,
    URL_FETCH_SUGGESTIONS,
    URL_UPDATE_PRODUCT, URL_UPDATE_STOCK
} from "../utils/ApiConstants";

import {ProductCreationModel} from "./ProductModels";
import makeCall from "./CallRunner";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";

export type ProductModel = {
    productID:number,
    name:string,
    price:number,
    description:string,
    images:Array<ProductImage>
    stock :number,
    category:Category
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
    price :number,
    categoryID:number
}
export type SimpleResult ={
    error:string
}

interface UpdateStockModel{
    newStock:number
}

export async function increaseStock(productID:number,stock:number){
    let url =  URL_UPDATE_STOCK(productID)
    let request:UpdateStockModel = {
        newStock : stock
    }
   return  await makeCall(new ApiRequest(url,HTTPMethods.PATCH,JSON.stringify(request)))
}

export async function updateProduct(productID :number, request:UpdateProductRequest){
    let url = URL_UPDATE_PRODUCT + productID
    const response =  await makeCall(new ApiRequest(url,HTTPMethods.PATCH,JSON.stringify(request)))
    return response as ResultProduct
}


export async function fetchProductsByPage(page:number){
    const response = await makeCall(new ApiRequest(URL_FETCH_RECENT_PRODUCTS(page),HTTPMethods.GET))
    return response as ProductModel[]
}

export async function fetchProduct(id:number){
    const response = await makeCall(new ApiRequest(URL_FETCH_PRODUCT + id, HTTPMethods.GET))
    return response as ProductModel
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

export async function createProduct(model:ProductCreationModel, images:FileList){
    for(let i =0;i<images.length;i++){
        const base64data =  await resizeImage(images[0])
        model.images.push(base64data)
    }
    const response = await makeCall(new ApiRequest(URL_CREATE_PRODUCT,HTTPMethods.POST,JSON.stringify(model)))
    return response

}
export async function fetchCategories(){
    let json = await makeCall(new ApiRequest(URL_FETCH_CATEGORIES,HTTPMethods.GET))
    return  json as Category[]
}

export async function pushDeleteProduct(productID:number){
    const response = await  makeCall(new ApiRequest(URL_DELETE_PRODUCT(productID),HTTPMethods.DELETE))
    return response
}
