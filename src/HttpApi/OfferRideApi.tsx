import { IgetMatchedRides, IofferRideDetails } from "../Interfaces/IOfferRide"
import { HttpGet, HttpPost } from "./HttpMethodsDeclaration"

const offerRideURL = "https://carpoolingwebapi.azurewebsites.net/api/OfferRide"

const getMatchedRides = async (matchDetails: IgetMatchedRides, jwtToken: string) => {
    // return await axios.post(`${offerRideURL}/MatchedResults`, {
    //     source: matchDetails.source,
    //     destination: matchDetails.destination,
    //     date: matchDetails.date,
    //     time: matchDetails.time
    // }, {
    //     headers: { "Authorization": `Bearer ${jwtToken}` }
    // })
    return HttpPost(`${offerRideURL}/MatchedRides`, {source: matchDetails.source,
        destination: matchDetails.destination,
        date: matchDetails.date,
        time:matchDetails.time}, jwtToken)
}

const offerRide = (offerObject: IofferRideDetails, jwtToken: string) => {
    return HttpPost(offerRideURL, offerObject, jwtToken)
}

const getOfferRideDetails = (jwtToken: string) => {
    return HttpGet(`${offerRideURL}/history`, jwtToken)
}

export { getMatchedRides, offerRide, getOfferRideDetails }