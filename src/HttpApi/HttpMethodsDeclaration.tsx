import axios from "axios";

const HttpGet = async (url: string, jwtToken: string) => {
    return await axios.get(url, {
        headers: { "Authorization": `Bearer ${jwtToken}` }
    })
}

const HttpPost = async (url: string, object: any, jwtToken: string) => {
    return await axios.post(url, object, {
        headers: { "Authorization": `Bearer ${jwtToken}` }
    })
}

const HttpGetNoAuth = async (url: string) => {
    return await axios.get(url)
}

const HttpPostNoAuth = async (url: string, credentials: any) => {
    return await axios.post(url, credentials, {
        signal: AbortSignal.timeout(15000) //Aborts request after 5 seconds
     })
}

export { HttpGet, HttpPost, HttpGetNoAuth, HttpPostNoAuth }