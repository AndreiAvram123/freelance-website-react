import crypto from "crypto";

export function encryptString(text :string, key:string):string{
    let encrypted = crypto.publicEncrypt({
            key: key,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        Buffer.from(text)
    )
    return encrypted.toString('base64');

}