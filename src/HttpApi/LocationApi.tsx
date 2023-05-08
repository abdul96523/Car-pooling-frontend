import { HttpGetNoAuth } from "./HttpMethodsDeclaration"

const locationURL = "https://carpoolingwebapi.azurewebsites.net/api/Location"

const getLocations = () => {
    return HttpGetNoAuth(`${locationURL}/list`)
}

export {getLocations}