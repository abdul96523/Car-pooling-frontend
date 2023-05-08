import { HttpPostNoAuth } from "./HttpMethodsDeclaration"

const authURL="https://carpoolingwebapi.azurewebsites.net"

const signUp=(credentials:any)=>{
    return HttpPostNoAuth(`${authURL}/signUp`,credentials)
}

const logIn=(credentials:any)=>{
    return HttpPostNoAuth(`${authURL}/login`,credentials)
}

export {signUp,logIn}