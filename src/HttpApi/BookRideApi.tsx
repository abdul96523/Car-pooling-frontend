import { IBookRideObject } from "../Interfaces/IBookRide"
import { HttpGet, HttpPost } from "./HttpMethodsDeclaration"

const bookRideURL = "https://carpoolingwebapi.azurewebsites.net/api/BookRide"

const bookRide = (bookedRideObject: IBookRideObject, jwtToken: string) => {
  return HttpPost(bookRideURL,bookedRideObject,jwtToken)
}

const getBookRideDetials = (jwtToken: string) => {
  return HttpGet(`${bookRideURL}/history`,jwtToken)
}

export { bookRide, getBookRideDetials }