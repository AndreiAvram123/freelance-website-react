import {getToken, isDefaultToken} from "../components/StorageHandler";
import jwtDecode from "jwt-decode";

type decodedToken ={
    userID : number
}

export function signOut(){
    localStorage.clear()
    window.location.href = "/"
}

export function isUserLoggedIn():boolean{
    return !isDefaultToken()
}

export function getUserID():number{
    if(isDefaultToken()){
        return 0
    }
    let token = getToken()
    let decoded = jwtDecode(token) as decodedToken
    return decoded.userID

}