import * as Bluebird from 'bluebird'
import { Request, Response } from 'express'
// import {IAuthRequest} from '../auth/auth';
// import {IAuthRequest} from '../../util/auth';

// const Package = require('../../../package.json');

const isNumeric = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export interface IServerDetails {
  name: string
  description: string
  env: string
  version: string
}

export interface IRequestDetails {
  url: string
  method: string
  route: string
}

// export interface IResponse extends Response {
//   unusedKey?: string
// }

export interface IResponseEnvelope {
  code: number
  success: boolean
  server: IServerDetails
  request: IRequestDetails
  data?: object
  error?: string
  stack?: string
  meta?: any
  message?: string
}

export interface IErrorParams {
  code: number
  error?: string | object | Error
  stack?: string
  message?: string
}

export interface IOkParams {
  code: number
  data?: object
  message?: string
}

export interface IRouteConfig {
  queryParams?: Array<string>
  routeParams?: Array<string>
  bodyParams?: Array<string>
  okCode?: number
  failCode?: number
}

export interface IParamsObject {
  [key: string]: any
}

const HTTP_CODE_MAX = 600
const HTTP_CODE_SERVER_ERROR = 500
const HTTP_CODE_INPUT_ERROR = 400
const HTTP_CODE_OK = 200

/**
 * Constructor
 *
 * @class BaseRoute
 */
export abstract class Controller {
  public static packageConfig = {
    packageName: 'Default Package Name',
    packageDescription: 'Default Package Description',
    packageVersion: 'Default Package Version',
  }

  protected requiredQueryParams: Array<string>
  protected requiredRouteParams: Array<string>
  protected requiredBodyParams: Array<string>
  protected successCode = HTTP_CODE_OK
  protected failureCode = HTTP_CODE_SERVER_ERROR

  /**
   * Constructor
   *
   * @class BaseRoute
   * @constructor
   */
  constructor(config?: IRouteConfig) {
    config = config || {}
    this.requiredQueryParams = config.queryParams || []
    this.requiredRouteParams = config.routeParams || []
    this.requiredBodyParams = config.bodyParams || []
    this.successCode = config.okCode || HTTP_CODE_OK
    this.failureCode = config.failCode || HTTP_CODE_SERVER_ERROR
  }
  /**
   * errResponse
   *
   * @param req
   * @param res
   * @param title
   * @returns {(params:any)=>undefined}
   */
  public static errResponse(req: Request, res: Response, title: string) {
    return (params: IErrorParams) => {
      let code = HTTP_CODE_SERVER_ERROR
      let meta
      if (params.code && isNumeric(params.code) && params.code < HTTP_CODE_MAX) {
        code = params.code
      } else {
        meta = 'Error code: ' + params.code
      }

      const response = Controller.responseEnvelope(
        req,
        title,
        code,
        false,
        undefined,
        params.error || params,
        params.stack,
        meta,
        params.message
      )

      if (
        (code === HTTP_CODE_SERVER_ERROR && process.env.INSTRUMENT_ERRORS_500 === 'true') ||
        process.env.INSTRUMENT_ERRORS_ALL === 'true'
      ) {
        console.log(code + ' error: ' + JSON.stringify(response, null, 2))

        if (response.stack !== undefined) {
          console.log('Stack: ' + response.stack.replace(/\\n/g, '\n'))
        }

        if (params.error !== undefined && params.error.constructor === Error) {
          const error = params.error as Error
          if (error.stack !== undefined) {
            console.log('Stack: ' + error.stack.replace(/\\n/g, '\n'))
          }
        }
      }

      res.status(code).json(response)
    }
  }

  /**
   * okResponse
   *
   * @param req
   * @param res
   * @param title
   * @returns {(params:any)=>undefined}
   */
  public static okResponse(req: Request, res: Response, title: string) {
    return (params: IOkParams) => {
      /*
       if (params.code !== undefined && params.data !== undefined){
       res.success(responseEnvelope(req,params.code,1,params.data,null));
       } else {
       res.success(responseEnvelope(req,200,1,params,null));
       }
       */

      res
        .status(params.code || HTTP_CODE_OK)
        .json(
          Controller.responseEnvelope(req, title, params.code, true, params.data, null, undefined, null, params.message)
        )
    }
  }

  private static responseEnvelope(
    req: Request,
    routeTitle: string,
    code: number,
    success: boolean,
    data?: object,
    error?: any,
    stack?: string,
    meta?: any,
    message?: string
  ) {
    const envDescriptor = process.env.ENVIRONMENT_DESCRIPTOR || 'unknown'
    const response: IResponseEnvelope = {
      code,
      success,
      server: {
        name: this.packageConfig.packageName,
        description: this.packageConfig.packageDescription,
        env: envDescriptor,
        version: this.packageConfig.packageVersion,
      },
      request: {
        url: req.originalUrl,
        method: req.method,
        route: routeTitle,
      },
    }
    if (data) {
      response.data = data
    }
    if (error) {
      if (error.constructor === Error) {
        response.error = error.message
        response.stack = error.stack
      } else {
        response.error = error
        response.stack = stack
      }
    }
    if (meta) {
      response.meta = meta
    }
    if (message) {
      response.message = message
    }
    return response
  }

  public jsonAPI() {
    // const __this = this;
    return (req: Request, res: Response) => {
      const parameters: IParamsObject = {}
      for (let paramIdx = 0; paramIdx < this.requiredQueryParams.length; paramIdx++) {
        const requiredParam = this.requiredQueryParams[paramIdx]
        const foundParam: any = req.query[requiredParam]
        if (foundParam === undefined) {
          Controller.errResponse(req, res, this.constructor.name)({
            code: HTTP_CODE_INPUT_ERROR,
            error: 'Required query parameter not found in request url: ' + requiredParam,
          })
          return
        } else {
          parameters[requiredParam] = foundParam
        }
      }
      for (let paramIdx = 0; paramIdx < this.requiredRouteParams.length; paramIdx++) {
        const requiredParam = this.requiredRouteParams[paramIdx]
        const foundParam = req.params[requiredParam]
        if (foundParam === undefined) {
          Controller.errResponse(req, res, this.constructor.name)({
            code: HTTP_CODE_SERVER_ERROR,
            error: 'Required route parameter not mapped for request: ' + requiredParam,
          })
          return
        } else {
          parameters[requiredParam] = foundParam
        }
      }
      for (let paramIdx = 0; paramIdx < this.requiredBodyParams.length; paramIdx++) {
        const requiredParam = this.requiredBodyParams[paramIdx]
        const foundParam = req.body[requiredParam]
        if (foundParam === undefined) {
          Controller.errResponse(req, res, this.constructor.name)({
            code: HTTP_CODE_INPUT_ERROR,
            error: 'Required body parameter not found in request body: ' + requiredParam,
          })
          return
        } else {
          parameters[requiredParam] = foundParam
        }
      }

      const call = this.handleRequest(parameters, req, res) as Promise<any>

      call
        .then(handlerResult => {
          handlerResult = handlerResult || {}
          const payload =
            handlerResult.code !== undefined
              ? handlerResult
              : {
                  code: this.successCode,
                  data: handlerResult,
                }
          Controller.okResponse(req, res, this.constructor.name)(payload)
        })
        .catch((handlerError: any) => {
          handlerError = handlerError || {}
          const code = handlerError.code || this.failureCode
          const error = handlerError.error || handlerError.response || handlerError.message || handlerError
          console.log('Error ' + code + ' during request: ' + JSON.stringify(error) + ', ')
          if (handlerError.stack) {
            console.log('stack: ' + handlerError.stack)
          }
          Controller.errResponse(req, res, this.constructor.name)({ code, error, stack: handlerError.stack })
        })
    }
  }

  protected abstract handleRequest(params: any, req: Request, res: Response): Promise<any> | Bluebird<any>
}
