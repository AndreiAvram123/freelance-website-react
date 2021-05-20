import {getTokenFromStorage} from "../../components/StorageHandler";
import {string} from "prop-types";

export enum HTTPMethods{
    GET= "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE"

}
export type CustomHeader ={
    key:string,
    value:string
}

export class ApiRequest {
    url:string;
    requestBody:RequestInit = {}

    constructor(url:string,
                method :string,
                bodyJson?:string) {
        this.url = url
        this.requestBody.method = method

        let headers:Headers = new Headers()

        headers.append("Content-Type","application/json")

        let token = getTokenFromStorage()
        if(token != null){
            headers.append("Authorization"  ,"Bearer " + getTokenFromStorage())
        }
        this.requestBody.headers = headers

        if(bodyJson !== undefined){
            this.requestBody.body = bodyJson
        }
    }
    addCustomHeader(header:CustomHeader){
        let newHeaders:Headers = new Headers(
            this.requestBody.headers)
        newHeaders.append(header.key,header.value)
        this.requestBody.headers = newHeaders
    }
}
