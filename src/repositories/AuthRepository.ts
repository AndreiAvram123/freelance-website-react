import {saveToken} from "../components/StorageHandler";
import {makeAPICall} from "./NetworkExecutor";
import {User} from "../entities/User";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {URL_LOGIN, URL_REGISTER} from "../utils/ApiConstants";

export enum RegisterResponse{
    USERNAME_TAKEN = "Username already exists",
    EMAIL_TAKEN = "Email already exists"
}

export enum AuthenticationResponse{
    INVALID_USERNAME_OR_PASSWORD = "Invalid username or password",
    UNKNOWN_ERROR = "Unknown error"
}

export function fetchToken(username:string,password:string){

    return new Promise((resolve, reject) => {

        let bodyJson = JSON.stringify({username: username, password: password})
        return fetch(URL_LOGIN, {
            method: 'POST',
            body: bodyJson,
            mode: "cors"
        }).then(function (response) {
            if(response.status === 403) {
               reject(AuthenticationResponse.INVALID_USERNAME_OR_PASSWORD)
            }else{
                let token = response.headers.get("Authorization")
                if(token !== null){
                     saveToken(token)
                     resolve(token)

                }
            }
        }).catch(error=>{
            reject(AuthenticationResponse.UNKNOWN_ERROR)
        })
    })
}

export function register(username:string,email:string,password:string){
    let request = new ApiRequest(URL_REGISTER,HTTPMethods.POST,JSON.stringify(
        {username: username, email: email ,password: password}))
    return makeAPICall<User>(request)
}