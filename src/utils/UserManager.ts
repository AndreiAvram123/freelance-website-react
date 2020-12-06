import {deleteToken, getToken, isDefaultToken} from "../components/StorageHandler";
import jwtDecode from "jwt-decode";

type DecodedToken ={
    userID : number
    userRole:string
    exp: number
}

enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

let decodedToken = jwtDecode(getToken()) as DecodedToken

if(isTokenExpired()){
    deleteToken()
    window.location.reload()
}


export function signOut(){
    localStorage.clear()
    window.location.href = "/"
}


function isTokenExpired ():Boolean{
     return decodedToken.exp > Date.now()
}

export function isUserAdmin(){
    return decodedToken.userRole === UserRole.ADMIN
}

export function isUserLoggedIn():boolean{
    return !isDefaultToken()
}



export function getUserID():number{
    if(isDefaultToken()){
        return 0
    }
    return decodedToken.userID
}