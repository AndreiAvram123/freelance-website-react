import {Result} from "../Result";

export enum RegisterResponse{
    USERNAME_TAKEN = "Username already exists",
    EMAIL_TAKEN = "Email already exists"
}


export function fetchToken(username:string,password:string){
    return new Promise((resolve, reject) => {
        let url = "https://rest-kotlin.herokuapp.com/login"
        let bodyJson = JSON.stringify({username: username, password: password})
        return fetch(url, {
            method: 'POST',
            body: bodyJson,
            mode: "cors"
        }).then(function (response) {
            if(response.status === 403) {
                reject("Unauthorized")
            }else{
                let token = response.headers.get("Authorization")
                if(token !=null){
                    localStorage.setItem("token", token)
                    resolve(token)
                }

            }
        }).catch(error=>{
            reject(error)
        })
    })
}

export function register(username:string,email:string,password:string){
    return new Promise(((resolve, reject) => {
        let url = "https://rest-kotlin.herokuapp.com/register"
        let bodyJson = JSON.stringify({username: email, email: email ,password: password})
        return fetch(url,{
            method : "POST",
            body: bodyJson,
            headers : {
                'Content-Type': 'application/json'
            },
        }).then(function (response) {
            return response.text()
        }).then(data =>{
            let jsonBody = JSON.parse(data)
            if(jsonBody.hasOwnProperty("error")){
                reject(jsonBody.error)
            }else{
                resolve(data)
            }
          }).catch(error=>{
            reject("Unknown error")
        })
    }))
}