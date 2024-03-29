export enum HttpStatusCodeEnum {
  ok = 200,
  created = 201,
  accepted = 202,
  noContent = 204,
  found = 302,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  requestTimeout = 408,
  unprocessableEntity = 422,
  serverError = 500,
  badGateway = 502,
  gatewayTimeout = 504,
}
