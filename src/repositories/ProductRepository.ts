import {resizeImage} from "../utils/ImageUtils";
import {
    URL_CREATE_PRODUCT,
    URL_DELETE_PRODUCT,
    URL_FETCH_CATEGORIES,
    URL_FETCH_PRODUCT,
    URL_FETCH_PRODUCTS,
    URL_FETCH_RECENT_PRODUCTS,
    URL_FETCH_SUGGESTIONS,
    URL_UPDATE_PRODUCT,
    URL_UPDATE_STOCK
} from "../utils/ApiConstants";

import {ProductCreationModel} from "./ProductModels";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {makeAPICall} from "./NetworkExecutor";

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
    image:ProductImage
}
export type ProductImage = {
    imageURl:string
}


export type UpdateProductRequest = {
    name :string,
    price :number,
    categoryID:number
}


interface UpdateStockModel{
    newStock:number
}

export async function increaseStock(productID:number,stock:number){
    let url =  URL_UPDATE_STOCK(productID)
    let request:UpdateStockModel = {
        newStock : stock
    }
   return  await makeAPICall(new ApiRequest(url,HTTPMethods.PATCH,JSON.stringify(request)))
}

export async function updateProduct(productID :number, request:UpdateProductRequest){
    let url = URL_UPDATE_PRODUCT + productID
    return await makeAPICall<ProductModel>(new ApiRequest(url,HTTPMethods.PATCH,JSON.stringify(request)))
}


export async function fetchProductsByPage(page:number){
    return  await makeAPICall<ProductModel[]>(new ApiRequest(URL_FETCH_RECENT_PRODUCTS(page),HTTPMethods.GET))
}

export async function fetchProduct(id:number){
    return  await makeAPICall<ProductModel>(new ApiRequest(URL_FETCH_PRODUCT + id, HTTPMethods.GET))
}

export async function fetchSearchSuggestions(query:string){
    let url = URL_FETCH_SUGGESTIONS + query
    return  await makeAPICall<ProductModel[]>(new ApiRequest(url,HTTPMethods.GET))
}


export async function fetchProducts(category:string) {
    let url = URL_FETCH_PRODUCTS + "?category="+category
    return  await makeAPICall<ProductModel[]>(new ApiRequest(url,HTTPMethods.GET))
}

export async function createProduct(model:ProductCreationModel, images:FileList){
    for(let i =0;i<images.length;i++){
        const base64data =  await resizeImage(images[0])
        model.images.push(base64data)
    }
    return await makeAPICall(new ApiRequest(URL_CREATE_PRODUCT, HTTPMethods.POST, JSON.stringify(model)))

}
export async function fetchCategories(){
    return await makeAPICall<Category[]>(new ApiRequest(URL_FETCH_CATEGORIES,HTTPMethods.GET))
}

export async function pushDeleteProduct(productID:number){
    return await makeAPICall(new ApiRequest(URL_DELETE_PRODUCT(productID), HTTPMethods.DELETE))
}
