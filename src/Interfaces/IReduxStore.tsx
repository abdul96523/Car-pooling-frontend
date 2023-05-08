export interface storeObj
{
    userDetails:{
        jwtToken:string,
        userId:number,
        userName:string
    },
    locationsList:{name:string,id:number}[]
}