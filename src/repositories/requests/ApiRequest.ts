import {getToken} from "../../components/StorageHandler";

export enum HTTPMethods{
    GET= "GET",
    POST = "POST",

}

export class ApiRequest {
    url:string;
    requestBody:RequestInit = {}
    constructor(url:string, method :string,bodyJson?:string) {
        this.url = url
        this.requestBody.method = method

        this.requestBody.headers = {
            Authorization: "Bearer " + getToken()
        }
        if(bodyJson !== undefined && method === HTTPMethods.POST){
            this.requestBody.body = bodyJson
            this.requestBody.headers = {
                Authorization: "Bearer " + getToken(),
                'Content-Type': 'application/json'
            }
        }
    }
}
