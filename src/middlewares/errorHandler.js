import { HTTPResponse } from "../httpResponse.js";

const httpResponse = new HTTPResponse()

export const errorHandler = (error, req, res, next) => {

    return httpResponse.NotFound(res, error.message)

}