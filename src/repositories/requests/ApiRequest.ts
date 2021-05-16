import {getTokenFromStorage} from "../../components/StorageHandler";

export enum HTTPMethods{
    GET= "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE"

}

export class ApiRequest {
    url:string;
    requestBody:RequestInit = {}

    constructor(url:string, method :string,bodyJson?:string) {
        this.url = url
        this.requestBody.method = method

        let headers:HeadersInit = {
            "Content-Type": "application/json"
        }

        let token = getTokenFromStorage()
        if(token != null){
            headers.Authorization  = "Bearer " + getTokenFromStorage()
        }

        if(bodyJson !== undefined){
            this.requestBody.body = bodyJson
        }
    }
}
