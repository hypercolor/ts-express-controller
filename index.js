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
/*! exports provided: Controller, ControllerConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Controller */ "./src/Controller.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return _src_Controller__WEBPACK_IMPORTED_MODULE_0__["Controller"]; });

/* harmony import */ var _src_ControllerConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/ControllerConfig */ "./src/ControllerConfig.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControllerConfig", function() { return _src_ControllerConfig__WEBPACK_IMPORTED_MODULE_1__["ControllerConfig"]; });






/***/ }),

/***/ "./src/Controller.ts":
/*!***************************!*\
  !*** ./src/Controller.ts ***!
  \***************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var _ControllerConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ControllerConfig */ "./src/ControllerConfig.ts");
/* harmony import */ var csv_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! csv-stringify */ "csv-stringify");
/* harmony import */ var csv_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(csv_stringify__WEBPACK_IMPORTED_MODULE_1__);



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
var Controller = (function () {
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    function Controller(config) {
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
    Controller.errResponse = function (req, res, title) {
        return function (params) {
            var code = HTTP_CODE_SERVER_ERROR;
            var meta;
            if (params.code && isNumeric(params.code) && params.code < HTTP_CODE_MAX) {
                code = params.code;
            }
            else {
                meta = 'Error code: ' + params.code;
            }
            var response = Controller.responseEnvelope(req, title, code, false, undefined, params.error || params, params.stack, meta, params.message);
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
    Controller.okResponse = function (req, res, title) {
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
                .json(Controller.responseEnvelope(req, title, params.code, true, params.data, null, undefined, null, params.message));
        };
    };
    Controller.responseEnvelope = function (req, routeTitle, code, success, data, error, stack, meta, message) {
        var envDescriptor = process.env.ENVIRONMENT_DESCRIPTOR || 'unknown';
        var response = {
            code: code,
            success: success,
            server: {
                name: _ControllerConfig__WEBPACK_IMPORTED_MODULE_0__["ControllerConfig"].packageConfig.packageName,
                description: _ControllerConfig__WEBPACK_IMPORTED_MODULE_0__["ControllerConfig"].packageConfig.packageDescription,
                env: envDescriptor,
                version: _ControllerConfig__WEBPACK_IMPORTED_MODULE_0__["ControllerConfig"].packageConfig.packageVersion,
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
    Controller.prototype.csvFile = function () {
        var _this = this;
        return function (req, res) {
            _this.parseParams(req)
                .then(function (parameters) {
                return _this.handleRequest(parameters, req, res);
            })
                .then(function (result) {
                res.setHeader('Content-disposition', 'attachment; filename=data.csv');
                res.writeHead(200, {
                    'Content-Type': 'text/csv'
                });
                csv_stringify__WEBPACK_IMPORTED_MODULE_1__(result, function (csv, err) {
                    if (err) {
                        Controller.errResponse(req, res, _this.constructor.name)({ code: 500, error: err });
                    }
                    else {
                        res.send(csv);
                    }
                });
            })
                .catch(function (handlerError) {
                handlerError = handlerError || {};
                var code = handlerError.code || _this.failureCode;
                var error = handlerError.error || handlerError.response || handlerError.message || handlerError;
                console.log('Error ' + code + ' during request: ' + JSON.stringify(error) + ', ');
                if (handlerError.stack) {
                    console.log('stack: ' + handlerError.stack);
                }
                Controller.errResponse(req, res, _this.constructor.name)({ code: code, error: error, stack: handlerError.stack });
            });
        };
    };
    Controller.prototype.jsonAPI = function () {
        var _this = this;
        return function (req, res) {
            _this.parseParams(req)
                .then(function (parameters) {
                return _this.handleRequest(parameters, req, res);
            })
                .then(function (handlerResult) {
                handlerResult = handlerResult || {};
                var payload = handlerResult.code !== undefined
                    ? handlerResult
                    : {
                        code: _this.successCode,
                        data: handlerResult,
                    };
                Controller.okResponse(req, res, _this.constructor.name)(payload);
            })
                .catch(function (handlerError) {
                handlerError = handlerError || {};
                var code = handlerError.code || _this.failureCode;
                var error = handlerError.error || handlerError.response || handlerError.message || handlerError;
                console.log('Error ' + code + ' during request: ' + JSON.stringify(error) + ', ');
                if (handlerError.stack) {
                    console.log('stack: ' + handlerError.stack);
                }
                Controller.errResponse(req, res, _this.constructor.name)({ code: code, error: error, stack: handlerError.stack });
            });
        };
    };
    Controller.prototype.parseParams = function (req) {
        var parameters = {};
        for (var paramIdx = 0; paramIdx < this.requiredQueryParams.length; paramIdx++) {
            var requiredParam = this.requiredQueryParams[paramIdx];
            var foundParam = req.query[requiredParam];
            if (foundParam === undefined) {
                return Promise.reject({
                    code: HTTP_CODE_INPUT_ERROR,
                    error: 'Required query parameter not found in request url: ' + requiredParam,
                });
            }
            else {
                parameters[requiredParam] = foundParam;
            }
        }
        for (var paramIdx = 0; paramIdx < this.requiredRouteParams.length; paramIdx++) {
            var requiredParam = this.requiredRouteParams[paramIdx];
            var foundParam = req.params[requiredParam];
            if (foundParam === undefined) {
                return Promise.reject({
                    code: HTTP_CODE_SERVER_ERROR,
                    error: 'Required route parameter not mapped for request: ' + requiredParam,
                });
            }
            else {
                parameters[requiredParam] = foundParam;
            }
        }
        for (var paramIdx = 0; paramIdx < this.requiredBodyParams.length; paramIdx++) {
            var requiredParam = this.requiredBodyParams[paramIdx];
            var foundParam = req.body[requiredParam];
            if (foundParam === undefined) {
                return Promise.reject({
                    code: HTTP_CODE_SERVER_ERROR,
                    error: 'Required route parameter not mapped for request: ' + requiredParam,
                });
            }
            else {
                parameters[requiredParam] = foundParam;
            }
        }
        return Promise.resolve(parameters);
    };
    return Controller;
}());



/***/ }),

/***/ "./src/ControllerConfig.ts":
/*!*********************************!*\
  !*** ./src/ControllerConfig.ts ***!
  \*********************************/
/*! exports provided: ControllerConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControllerConfig", function() { return ControllerConfig; });

var ControllerConfig = (function () {
    function ControllerConfig() {
    }
    ControllerConfig.packageConfig = {
        packageName: 'Default Package Name',
        packageDescription: 'Default Package Description',
        packageVersion: 'Default Package Version',
    };
    return ControllerConfig;
}());



/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.ts */"./index.ts");


/***/ }),

/***/ "csv-stringify":
/*!********************************!*\
  !*** external "csv-stringify" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("csv-stringify");

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map