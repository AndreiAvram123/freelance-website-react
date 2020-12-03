import {getToken} from "../../components/StorageHandler";

export class ApiRequest {
    url:string;
    requestBody:RequestInit = {}
    constructor(url:string, method :string) {
        this.url = url
        this.requestBody.method = method
        this.requestBody.headers = {
            Authorization: "Bearer " + getToken()
        }
    }
}

export enum HTTPMethods{
    GET= "GET",
    POST = "POST",

}
