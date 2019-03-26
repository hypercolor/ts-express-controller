import { Request, Response } from 'express'
import { Keygen } from 'hc-utilities'

require('express-csv')

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
  time: string
  data?: object
  error?: string
  breadcrumb?: string
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

export interface IControllerFrameworkConfig {
  instrumentAllRequests: boolean
  instrumentAllErrors: boolean
  instrument500Errors: boolean
  instrumentErrorRequestBodies: boolean
  instrumentErrorRequestBodiesRouteBlacklist: Array<string>
  environmentDescriptor: string
  packageConfig: {
    packageName: string
    packageDescription: string
    packageVersion: string
  }
}

export interface IControllerFrameworkConfigParams {
  instrumentAllRequests?: boolean
  instrumentAllErrors?: boolean
  instrument500Errors?: boolean
  instrumentErrorRequestBodies?: boolean
  instrumentErrorRequestBodiesRouteBlacklist?: Array<string>
  environmentDescriptor?: string
  packageConfig?: {
    packageName: string
    packageDescription: string
    packageVersion: string
  }
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
  private static frameworkConfig: IControllerFrameworkConfig = {
    instrumentAllRequests: false,
    instrumentAllErrors: false,
    instrument500Errors: true,
    instrumentErrorRequestBodies: false,
    instrumentErrorRequestBodiesRouteBlacklist: [],
    environmentDescriptor: 'env',
    packageConfig: {
      packageName: 'Default Package Name',
      packageDescription: 'Default Package Description',
      packageVersion: 'Default Package Version',
    },
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

  public static configure(config: IControllerFrameworkConfigParams) {
    Object.assign(this.frameworkConfig, config)
  }

  public static getConfiguration(): IControllerFrameworkConfig {
    return this.frameworkConfig
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
        (code === HTTP_CODE_SERVER_ERROR && this.frameworkConfig.instrument500Errors) ||
        this.frameworkConfig.instrumentAllErrors
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

        if (
          req.body &&
          this.frameworkConfig.instrumentErrorRequestBodies &&
          this.frameworkConfig.instrumentErrorRequestBodiesRouteBlacklist.indexOf(req.url) === -1
        ) {
          console.log('Request body for error was: ' + JSON.stringify(req.body, null, 2))
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
    const response: IResponseEnvelope = {
      code,
      success,
      time: new Date().toISOString(),
      server: {
        name: this.frameworkConfig.packageConfig.packageName,
        description: this.frameworkConfig.packageConfig.packageDescription,
        env: this.frameworkConfig.environmentDescriptor,
        version: this.frameworkConfig.packageConfig.packageVersion,
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
      response.breadcrumb = Keygen.uid(6).toUpperCase()
    }
    if (meta) {
      response.meta = meta
    }
    if (message) {
      response.message = message
    }
    return response
  }

  public zipFile() {
    return (req: Request, res: Response) => {
      try {
        this.runRequest(req, res)
          .then((zipResult: any) => {
            if (!zipResult.data || zipResult.fileName) {
              Controller.errResponse(req, res, this.constructor.name)({
                code: 500,
                error: 'ZIP route result must include data and fileName',
              })
            } else {
              res.set('Content-Type', 'application/zip')
              res.set('Content-Disposition', 'attachment; filename=' + zipResult.fileName)
              res.set('Content-Length', zipResult.data.length)
              res.end(zipResult.data, 'binary')
            }
          })
          .catch(err => {
            this.handleError(req, res, err)
          })
      } catch (err) {
        this.handleError(req, res, err)
      }
    }
  }

  public csvFile() {
    return (req: Request, res: Response) => {
      try {
        this.runRequest(req, res)
          .then(result => {
            if (result.constructor !== Array) {
              Controller.errResponse(req, res, this.constructor.name)({
                code: 500,
                error: 'CSV route emitted non-array result: ' + result.constructor.name,
              })
            } else {
              ;(res as any).csv(result)
            }
          })
          .catch(err => {
            this.handleError(req, res, err)
          })
      } catch (handlerError) {
        this.handleError(req, res, handlerError)
      }
    }
  }

  public jsonAPI() {
    return (req: Request, res: Response) => {
      const start = new Date()
      try {
        this.runRequest(req, res)
          .then(handlerResult => {
            handlerResult = handlerResult || {}
            const payload =
              handlerResult.code !== undefined
                ? handlerResult
                : {
                    code: this.successCode,
                    data: handlerResult,
                  }

            if (Controller.frameworkConfig.instrumentAllRequests) {
              console.log(
                req.method +
                  ' ' +
                  req.url +
                  ' ' +
                  (new Date().getTime() - start.getTime()).toFixed(2) +
                  ' ms, status=' +
                  payload.code
              )
            }

            Controller.okResponse(req, res, this.constructor.name)(payload)
          })
          .catch(err => {
            this.handleError(req, res, err)
          })
      } catch (handlerError) {
        this.handleError(req, res, handlerError)
      }
    }
  }

  protected abstract async handleRequest(params: any, req: Request, res: Response): Promise<any>

  private async runRequest(req: Request, res: Response) {
    const params = await this.parseParams(req)
    return await this.handleRequest(params, req, res)
  }

  private handleError(req: Request, res: Response, handlerError: any) {
    handlerError = handlerError || {}
    const code = handlerError.code || this.failureCode
    const error = handlerError.error || handlerError.response || handlerError.message || handlerError
    console.log('Error ' + code + ' during request: ' + JSON.stringify(error) + ', ')
    if (handlerError.stack) {
      console.log('stack: ' + handlerError.stack)
    }
    Controller.errResponse(req, res, this.constructor.name)({ code, error, stack: handlerError.stack })
  }

  private parseParams(req: Request): Promise<IParamsObject> {
    const parameters: IParamsObject = {}
    for (let paramIdx = 0; paramIdx < this.requiredQueryParams.length; paramIdx++) {
      const requiredParam = this.requiredQueryParams[paramIdx]
      const foundParam: any = req.query[requiredParam]
      if (foundParam === undefined) {
        return Promise.reject({
          code: HTTP_CODE_INPUT_ERROR,
          error: 'Required query parameter not found in request url: ' + requiredParam,
        })
      } else {
        parameters[requiredParam] = foundParam
      }
    }
    for (let paramIdx = 0; paramIdx < this.requiredRouteParams.length; paramIdx++) {
      const requiredParam = this.requiredRouteParams[paramIdx]
      const foundParam = req.params[requiredParam]
      if (foundParam === undefined) {
        return Promise.reject({
          code: HTTP_CODE_SERVER_ERROR,
          error: 'Required route parameter not mapped for request: ' + requiredParam,
        })
      } else {
        parameters[requiredParam] = foundParam
      }
    }
    for (let paramIdx = 0; paramIdx < this.requiredBodyParams.length; paramIdx++) {
      const requiredParam = this.requiredBodyParams[paramIdx]
      const foundParam = req.body[requiredParam]
      if (foundParam === undefined) {
        return Promise.reject({
          code: HTTP_CODE_SERVER_ERROR,
          error: 'Required body parameter not included with request: ' + requiredParam,
        })
      } else {
        parameters[requiredParam] = foundParam
      }
    }

    return Promise.resolve(parameters)
  }
}
