import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {URL_PUBLIC_ENCRYPTION_KEY} from "../utils/ApiConstants";
import {makeAPICall} from "./NetworkExecutor";

export type PublicEncryptionKeyResponse ={
     key :string
}
export async function fetchPublicEncryptionKey(){
   let request = new ApiRequest(URL_PUBLIC_ENCRYPTION_KEY, HTTPMethods.GET)
    return makeAPICall<PublicEncryptionKeyResponse>(request)
}