(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! exports provided: HCRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_HCRoute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/HCRoute */ "./src/HCRoute.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HCRoute", function() { return _src_HCRoute__WEBPACK_IMPORTED_MODULE_0__["HCRoute"]; });





/***/ }),

/***/ "./src/HCRoute.ts":
/*!************************!*\
  !*** ./src/HCRoute.ts ***!
  \************************/
/*! exports provided: HCRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCRoute", function() { return HCRoute; });

// import {IAuthRequest} from '../auth/auth';
// import {IAuthRequest} from '../../util/auth';
// const Package = require('../../../package.json');
var isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
var HTTP_CODE_MAX = 600;
var HTTP_CODE_SERVER_ERROR = 500;
var HTTP_CODE_INPUT_ERROR = 400;
var HTTP_CODE_OK = 200;
/**
 * Constructor
 *
 * @class BaseRoute
 */
var HCRoute = (function () {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    function HCRoute(config) {
        this.successCode = HTTP_CODE_OK;
        this.failureCode = HTTP_CODE_SERVER_ERROR;
        config = config || {};
        this.requiredQueryParams = config.queryParams || [];
        this.requiredRouteParams = config.routeParams || [];
        this.requiredBodyParams = config.bodyParams || [];
        this.successCode = config.okCode || HTTP_CODE_OK;
        this.failureCode = config.failCode || HTTP_CODE_SERVER_ERROR;
    }
    /**
     * errResponse
     *
     * @param req
     * @param res
     * @param title
     * @returns {(params:any)=>undefined}
     */
    HCRoute.errResponse = function (req, res, title) {
        return function (params) {
            var code = HTTP_CODE_SERVER_ERROR;
            var meta;
            if (params.code && isNumeric(params.code) && params.code < HTTP_CODE_MAX) {
                code = params.code;
            }
            else {
                meta = 'Error code: ' + params.code;
            }
            var response = HCRoute.responseEnvelope(req, title, code, false, undefined, params.error || params, params.stack, meta, params.message);
            if ((code === HTTP_CODE_SERVER_ERROR && process.env.INSTRUMENT_ERRORS_500 === 'true') ||
                process.env.INSTRUMENT_ERRORS_ALL === 'true') {
                console.log(code + ' error: ' + JSON.stringify(response, null, 2));
                if (response.stack !== undefined) {
                    console.log('Stack: ' + response.stack.replace(/\\n/g, '\n'));
                }
                if (params.error !== undefined && params.error.constructor === Error) {
                    var error = params.error;
                    if (error.stack !== undefined) {
                        console.log('Stack: ' + error.stack.replace(/\\n/g, '\n'));
                    }
                }
            }
            res.status(code).json(response);
        };
    };
    /**
     * okResponse
     *
     * @param req
     * @param res
     * @param title
     * @returns {(params:any)=>undefined}
     */
    HCRoute.okResponse = function (req, res, title) {
        return function (params) {
            /*
             if (params.code !== undefined && params.data !== undefined){
             res.success(responseEnvelope(req,params.code,1,params.data,null));
             } else {
             res.success(responseEnvelope(req,200,1,params,null));
             }
             */
            res
                .status(params.code || HTTP_CODE_OK)
                .json(HCRoute.responseEnvelope(req, title, params.code, true, params.data, null, undefined, null, params.message));
        };
    };
    HCRoute.responseEnvelope = function (req, routeTitle, code, success, data, error, stack, meta, message) {
        var envDescriptor = process.env.ENVIRONMENT_DESCRIPTOR || 'unknown';
        var response = {
            code: code,
            success: success,
            server: {
                name: this.routeConfig.packageName,
                description: this.routeConfig.packageDescription,
                env: envDescriptor,
                version: this.routeConfig.packageVersion,
            },
            request: {
                url: req.originalUrl,
                method: req.method,
                route: routeTitle,
            },
        };
        if (data) {
            response.data = data;
        }
        if (error) {
            if (error.constructor === Error) {
                response.error = error.message;
                response.stack = error.stack;
            }
            else {
                response.error = error;
                response.stack = stack;
            }
        }
        if (meta) {
            response.meta = meta;
        }
        if (message) {
            response.message = message;
        }
        return response;
    };
    HCRoute.prototype.jsonAPI = function () {
        var _this = this;
        // const __this = this;
        return function (req, res) {
            var parameters = {};
            for (var paramIdx = 0; paramIdx < _this.requiredQueryParams.length; paramIdx++) {
                var requiredParam = _this.requiredQueryParams[paramIdx];
                var foundParam = req.query[requiredParam];
                if (foundParam === undefined) {
                    HCRoute.errResponse(req, res, _this.constructor.name)({
                        code: HTTP_CODE_INPUT_ERROR,
                        error: 'Required query parameter not found in request url: ' + requiredParam,
                    });
                    return;
                }
                else {
                    parameters[requiredParam] = foundParam;
                }
            }
            for (var paramIdx = 0; paramIdx < _this.requiredRouteParams.length; paramIdx++) {
                var requiredParam = _this.requiredRouteParams[paramIdx];
                var foundParam = req.params[requiredParam];
                if (foundParam === undefined) {
                    HCRoute.errResponse(req, res, _this.constructor.name)({
                        code: HTTP_CODE_SERVER_ERROR,
                        error: 'Required route parameter not mapped for request: ' + requiredParam,
                    });
                    return;
                }
                else {
                    parameters[requiredParam] = foundParam;
                }
            }
            for (var paramIdx = 0; paramIdx < _this.requiredBodyParams.length; paramIdx++) {
                var requiredParam = _this.requiredBodyParams[paramIdx];
                var foundParam = req.body[requiredParam];
                if (foundParam === undefined) {
                    HCRoute.errResponse(req, res, _this.constructor.name)({
                        code: HTTP_CODE_INPUT_ERROR,
                        error: 'Required body parameter not found in request body: ' + requiredParam,
                    });
                    return;
                }
                else {
                    parameters[requiredParam] = foundParam;
                }
            }
            var call = _this.handleRequest(parameters, req, res);
            call
                .then(function (handlerResult) {
                handlerResult = handlerResult || {};
                var payload = handlerResult.code !== undefined
                    ? handlerResult
                    : {
                        code: _this.successCode,
                        data: handlerResult,
                    };
                HCRoute.okResponse(req, res, _this.constructor.name)(payload);
            })
                .catch(function (handlerError) {
                handlerError = handlerError || {};
                var code = handlerError.code || _this.failureCode;
                var error = handlerError.error || handlerError.response || handlerError.message || handlerError;
                console.log('Error ' + code + ' during request: ' + JSON.stringify(error) + ', ');
                if (handlerError.stack) {
                    console.log('stack: ' + handlerError.stack);
                }
                HCRoute.errResponse(req, res, _this.constructor.name)({ code: code, error: error, stack: handlerError.stack });
            });
        };
    };
    HCRoute.routeConfig = {
        packageName: 'Package Name',
        packageDescription: 'Package Description',
        packageVersion: 'Package Version',
    };
    return HCRoute;
}());



/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.ts */"./index.ts");


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map