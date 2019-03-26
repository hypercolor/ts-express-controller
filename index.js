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
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Controller */ "./src/Controller.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return _src_Controller__WEBPACK_IMPORTED_MODULE_0__["Controller"]; });




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
/* harmony import */ var hc_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hc-utilities */ "hc-utilities");
/* harmony import */ var hc_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hc_utilities__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

__webpack_require__(/*! express-csv */ "express-csv");
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
var Controller = /** @class */ (function () {
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
    Controller.configure = function (config) {
        Object.assign(this.frameworkConfig, config);
    };
    Controller.getConfiguration = function () {
        return this.frameworkConfig;
    };
    /**
     * errResponse
     *
     * @param req
     * @param res
     * @param title
     * @returns {(params:any)=>undefined}
     */
    Controller.errResponse = function (req, res, title) {
        var _this = this;
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
            if ((code === HTTP_CODE_SERVER_ERROR && _this.frameworkConfig.instrument500Errors) ||
                _this.frameworkConfig.instrumentAllErrors) {
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
                if (req.body &&
                    _this.frameworkConfig.instrumentErrorRequestBodies &&
                    _this.frameworkConfig.instrumentErrorRequestBodiesRouteBlacklist.indexOf(req.url) === -1) {
                    console.log('Request body for error was: ' + JSON.stringify(req.body, null, 2));
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
        var response = {
            code: code,
            success: success,
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
            response.breadcrumb = hc_utilities__WEBPACK_IMPORTED_MODULE_0__["Keygen"].uid(6).toUpperCase();
        }
        if (meta) {
            response.meta = meta;
        }
        if (message) {
            response.message = message;
        }
        return response;
    };
    Controller.prototype.zipFile = function () {
        var _this = this;
        return function (req, res) {
            try {
                _this.runRequest(req, res)
                    .then(function (zipResult) {
                    if (!zipResult.data || !zipResult.fileName) {
                        Controller.errResponse(req, res, _this.constructor.name)({
                            code: 500,
                            error: 'ZIP route result must include data and fileName',
                        });
                    }
                    else {
                        res.set('Content-Type', 'application/zip');
                        res.set('Content-Disposition', 'attachment; filename=' + zipResult.fileName);
                        res.set('Content-Length', zipResult.data.length);
                        res.end(zipResult.data, 'binary');
                    }
                })
                    .catch(function (err) {
                    _this.handleError(req, res, err);
                });
            }
            catch (err) {
                _this.handleError(req, res, err);
            }
        };
    };
    Controller.prototype.csvFile = function () {
        var _this = this;
        return function (req, res) {
            try {
                _this.runRequest(req, res)
                    .then(function (result) {
                    if (result.constructor !== Array) {
                        Controller.errResponse(req, res, _this.constructor.name)({
                            code: 500,
                            error: 'CSV route emitted non-array result: ' + result.constructor.name,
                        });
                    }
                    else {
                        res.csv(result);
                    }
                })
                    .catch(function (err) {
                    _this.handleError(req, res, err);
                });
            }
            catch (handlerError) {
                _this.handleError(req, res, handlerError);
            }
        };
    };
    Controller.prototype.jsonAPI = function () {
        var _this = this;
        return function (req, res) {
            var start = new Date();
            try {
                _this.runRequest(req, res)
                    .then(function (handlerResult) {
                    handlerResult = handlerResult || {};
                    var payload = handlerResult.code !== undefined
                        ? handlerResult
                        : {
                            code: _this.successCode,
                            data: handlerResult,
                        };
                    if (Controller.frameworkConfig.instrumentAllRequests) {
                        console.log(req.method +
                            ' ' +
                            req.url +
                            ' ' +
                            (new Date().getTime() - start.getTime()).toFixed(2) +
                            ' ms, status=' +
                            payload.code);
                    }
                    Controller.okResponse(req, res, _this.constructor.name)(payload);
                })
                    .catch(function (err) {
                    _this.handleError(req, res, err);
                });
            }
            catch (handlerError) {
                _this.handleError(req, res, handlerError);
            }
        };
    };
    Controller.prototype.runRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parseParams(req)];
                    case 1:
                        params = _a.sent();
                        return [4 /*yield*/, this.handleRequest(params, req, res)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Controller.prototype.handleError = function (req, res, handlerError) {
        handlerError = handlerError || {};
        var code = handlerError.code || this.failureCode;
        var error = handlerError.error || handlerError.response || handlerError.message || handlerError;
        console.log('Error ' + code + ' during request: ' + JSON.stringify(error) + ', ');
        if (handlerError.stack) {
            console.log('stack: ' + handlerError.stack);
        }
        Controller.errResponse(req, res, this.constructor.name)({ code: code, error: error, stack: handlerError.stack });
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
                    error: 'Required body parameter not included with request: ' + requiredParam,
                });
            }
            else {
                parameters[requiredParam] = foundParam;
            }
        }
        return Promise.resolve(parameters);
    };
    Controller.frameworkConfig = {
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
    };
    return Controller;
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

/***/ "express-csv":
/*!******************************!*\
  !*** external "express-csv" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-csv");

/***/ }),

/***/ "hc-utilities":
/*!*******************************!*\
  !*** external "hc-utilities" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hc-utilities");

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map