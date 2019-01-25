// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../bluebird
//   ../express

import * as Bluebird from 'bluebird';
import { Request, Response } from 'express';

export interface IServerDetails {
        name: string;
        description: string;
        env: string;
        version: string;
}
export interface IRequestDetails {
        url: string;
        method: string;
        route: string;
}
export interface IResponseEnvelope {
        code: number;
        success: boolean;
        server: IServerDetails;
        request: IRequestDetails;
        time: string;
        data?: object;
        error?: string;
        breadcrumb?: string;
        stack?: string;
        meta?: any;
        message?: string;
}
export interface IErrorParams {
        code: number;
        error?: string | object | Error;
        stack?: string;
        message?: string;
}
export interface IOkParams {
        code: number;
        data?: object;
        message?: string;
}
export interface IRouteConfig {
        queryParams?: Array<string>;
        routeParams?: Array<string>;
        bodyParams?: Array<string>;
        okCode?: number;
        failCode?: number;
}
export interface IParamsObject {
        [key: string]: any;
}
/**
    * Constructor
    *
    * @class BaseRoute
    */
export abstract class Controller {
        protected requiredQueryParams: Array<string>;
        protected requiredRouteParams: Array<string>;
        protected requiredBodyParams: Array<string>;
        protected successCode: number;
        protected failureCode: number;
        /**
            * Constructor
            *
            * @class BaseRoute
            * @constructor
            */
        constructor(config?: IRouteConfig);
        /**
            * errResponse
            *
            * @param req
            * @param res
            * @param title
            * @returns {(params:any)=>undefined}
            */
        static errResponse(req: Request, res: Response, title: string): (params: IErrorParams) => void;
        /**
            * okResponse
            *
            * @param req
            * @param res
            * @param title
            * @returns {(params:any)=>undefined}
            */
        static okResponse(req: Request, res: Response, title: string): (params: IOkParams) => void;
        csvFile(): (req: Request, res: Response) => void;
        jsonAPI(): (req: Request, res: Response) => void;
        protected abstract handleRequest(params: any, req: Request, res: Response): Promise<any> | Bluebird<any>;
}

export class ControllerConfig {
    static packageConfig: {
        packageName: string;
        packageDescription: string;
        packageVersion: string;
    };
}

