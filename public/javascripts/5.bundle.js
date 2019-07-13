(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/async/asyncify.js":
/*!****************************************!*\
  !*** ./node_modules/async/asyncify.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = asyncify;\n\nvar _initialParams = __webpack_require__(/*! ./internal/initialParams */ \"./node_modules/async/internal/initialParams.js\");\n\nvar _initialParams2 = _interopRequireDefault(_initialParams);\n\nvar _setImmediate = __webpack_require__(/*! ./internal/setImmediate */ \"./node_modules/async/internal/setImmediate.js\");\n\nvar _setImmediate2 = _interopRequireDefault(_setImmediate);\n\nvar _wrapAsync = __webpack_require__(/*! ./internal/wrapAsync */ \"./node_modules/async/internal/wrapAsync.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Take a sync function and make it async, passing its return value to a\n * callback. This is useful for plugging sync functions into a waterfall,\n * series, or other async functions. Any arguments passed to the generated\n * function will be passed to the wrapped function (except for the final\n * callback argument). Errors thrown will be passed to the callback.\n *\n * If the function passed to `asyncify` returns a Promise, that promises's\n * resolved/rejected state will be used to call the callback, rather than simply\n * the synchronous return value.\n *\n * This also means you can asyncify ES2017 `async` functions.\n *\n * @name asyncify\n * @static\n * @memberOf module:Utils\n * @method\n * @alias wrapSync\n * @category Util\n * @param {Function} func - The synchronous function, or Promise-returning\n * function to convert to an {@link AsyncFunction}.\n * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be\n * invoked with `(args..., callback)`.\n * @example\n *\n * // passing a regular synchronous function\n * async.waterfall([\n *     async.apply(fs.readFile, filename, \"utf8\"),\n *     async.asyncify(JSON.parse),\n *     function (data, next) {\n *         // data is the result of parsing the text.\n *         // If there was a parsing error, it would have been caught.\n *     }\n * ], callback);\n *\n * // passing a function returning a promise\n * async.waterfall([\n *     async.apply(fs.readFile, filename, \"utf8\"),\n *     async.asyncify(function (contents) {\n *         return db.model.create(contents);\n *     }),\n *     function (model, next) {\n *         // `model` is the instantiated model object.\n *         // If there was an error, this function would be skipped.\n *     }\n * ], callback);\n *\n * // es2017 example, though `asyncify` is not needed if your JS environment\n * // supports async functions out of the box\n * var q = async.queue(async.asyncify(async function(file) {\n *     var intermediateStep = await processFile(file);\n *     return await somePromise(intermediateStep)\n * }));\n *\n * q.push(files);\n */\nfunction asyncify(func) {\n    if ((0, _wrapAsync.isAsync)(func)) {\n        return function (...args /*, callback*/) {\n            const callback = args.pop();\n            const promise = func.apply(this, args);\n            return handlePromise(promise, callback);\n        };\n    }\n\n    return (0, _initialParams2.default)(function (args, callback) {\n        var result;\n        try {\n            result = func.apply(this, args);\n        } catch (e) {\n            return callback(e);\n        }\n        // if result is Promise object\n        if (result && typeof result.then === 'function') {\n            return handlePromise(result, callback);\n        } else {\n            callback(null, result);\n        }\n    });\n}\n\nfunction handlePromise(promise, callback) {\n    return promise.then(value => {\n        invokeCallback(callback, null, value);\n    }, err => {\n        invokeCallback(callback, err && err.message ? err : new Error(err));\n    });\n}\n\nfunction invokeCallback(callback, error, value) {\n    try {\n        callback(error, value);\n    } catch (err) {\n        (0, _setImmediate2.default)(e => {\n            throw e;\n        }, err);\n    }\n}\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack:///./node_modules/async/asyncify.js?");

/***/ }),

/***/ "./node_modules/async/internal/awaitify.js":
/*!*************************************************!*\
  !*** ./node_modules/async/internal/awaitify.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = awaitify;\n// conditionally promisify a function.\n// only return a promise if a callback is omitted\nfunction awaitify(asyncFn, arity = asyncFn.length) {\n    if (!arity) throw new Error('arity is undefined');\n    function awaitable(...args) {\n        if (typeof args[arity - 1] === 'function') {\n            return asyncFn.apply(this, args);\n        }\n\n        return new Promise((resolve, reject) => {\n            args[arity - 1] = (err, ...cbArgs) => {\n                if (err) return reject(err);\n                resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);\n            };\n            asyncFn.apply(this, args);\n        });\n    }\n\n    Object.defineProperty(awaitable, 'name', {\n        value: `awaitable(${asyncFn.name})`\n    });\n\n    return awaitable;\n}\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack:///./node_modules/async/internal/awaitify.js?");

/***/ }),

/***/ "./node_modules/async/internal/initialParams.js":
/*!******************************************************!*\
  !*** ./node_modules/async/internal/initialParams.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function (fn) {\n    return function (...args /*, callback*/) {\n        var callback = args.pop();\n        return fn.call(this, args, callback);\n    };\n};\n\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/async/internal/initialParams.js?");

/***/ }),

/***/ "./node_modules/async/internal/once.js":
/*!*********************************************!*\
  !*** ./node_modules/async/internal/once.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = once;\nfunction once(fn) {\n    function wrapper(...args) {\n        if (fn === null) return;\n        var callFn = fn;\n        fn = null;\n        callFn.apply(this, args);\n    }\n    Object.assign(wrapper, fn);\n    return wrapper;\n}\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/async/internal/once.js?");

/***/ }),

/***/ "./node_modules/async/internal/onlyOnce.js":
/*!*************************************************!*\
  !*** ./node_modules/async/internal/onlyOnce.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = onlyOnce;\nfunction onlyOnce(fn) {\n    return function (...args) {\n        if (fn === null) throw new Error(\"Callback was already called.\");\n        var callFn = fn;\n        fn = null;\n        callFn.apply(this, args);\n    };\n}\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/async/internal/onlyOnce.js?");

/***/ }),

/***/ "./node_modules/async/internal/setImmediate.js":
/*!*****************************************************!*\
  !*** ./node_modules/async/internal/setImmediate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(setImmediate, process) {\n/* istanbul ignore file */\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.fallback = fallback;\nexports.wrap = wrap;\nvar hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === 'function' && setImmediate;\nvar hasNextTick = exports.hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';\n\nfunction fallback(fn) {\n    setTimeout(fn, 0);\n}\n\nfunction wrap(defer) {\n    return (fn, ...args) => defer(() => fn(...args));\n}\n\nvar _defer;\n\nif (hasSetImmediate) {\n    _defer = setImmediate;\n} else if (hasNextTick) {\n    _defer = process.nextTick;\n} else {\n    _defer = fallback;\n}\n\nexports.default = wrap(_defer);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../timers-browserify/main.js */ \"./node_modules/timers-browserify/main.js\").setImmediate, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/async/internal/setImmediate.js?");

/***/ }),

/***/ "./node_modules/async/internal/wrapAsync.js":
/*!**************************************************!*\
  !*** ./node_modules/async/internal/wrapAsync.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.isAsyncIterable = exports.isAsyncGenerator = exports.isAsync = undefined;\n\nvar _asyncify = __webpack_require__(/*! ../asyncify */ \"./node_modules/async/asyncify.js\");\n\nvar _asyncify2 = _interopRequireDefault(_asyncify);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction isAsync(fn) {\n    return fn[Symbol.toStringTag] === 'AsyncFunction';\n}\n\nfunction isAsyncGenerator(fn) {\n    return fn[Symbol.toStringTag] === 'AsyncGenerator';\n}\n\nfunction isAsyncIterable(obj) {\n    return typeof obj[Symbol.asyncIterator] === 'function';\n}\n\nfunction wrapAsync(asyncFn) {\n    if (typeof asyncFn !== 'function') throw new Error('expected a function');\n    return isAsync(asyncFn) ? (0, _asyncify2.default)(asyncFn) : asyncFn;\n}\n\nexports.default = wrapAsync;\nexports.isAsync = isAsync;\nexports.isAsyncGenerator = isAsyncGenerator;\nexports.isAsyncIterable = isAsyncIterable;\n\n//# sourceURL=webpack:///./node_modules/async/internal/wrapAsync.js?");

/***/ }),

/***/ "./node_modules/async/waterfall.js":
/*!*****************************************!*\
  !*** ./node_modules/async/waterfall.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _once = __webpack_require__(/*! ./internal/once */ \"./node_modules/async/internal/once.js\");\n\nvar _once2 = _interopRequireDefault(_once);\n\nvar _onlyOnce = __webpack_require__(/*! ./internal/onlyOnce */ \"./node_modules/async/internal/onlyOnce.js\");\n\nvar _onlyOnce2 = _interopRequireDefault(_onlyOnce);\n\nvar _wrapAsync = __webpack_require__(/*! ./internal/wrapAsync */ \"./node_modules/async/internal/wrapAsync.js\");\n\nvar _wrapAsync2 = _interopRequireDefault(_wrapAsync);\n\nvar _awaitify = __webpack_require__(/*! ./internal/awaitify */ \"./node_modules/async/internal/awaitify.js\");\n\nvar _awaitify2 = _interopRequireDefault(_awaitify);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Runs the `tasks` array of functions in series, each passing their results to\n * the next in the array. However, if any of the `tasks` pass an error to their\n * own callback, the next function is not executed, and the main `callback` is\n * immediately called with the error.\n *\n * @name waterfall\n * @static\n * @memberOf module:ControlFlow\n * @method\n * @category Control Flow\n * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}\n * to run.\n * Each function should complete with any number of `result` values.\n * The `result` values will be passed as arguments, in order, to the next task.\n * @param {Function} [callback] - An optional callback to run once all the\n * functions have completed. This will be passed the results of the last task's\n * callback. Invoked with (err, [results]).\n * @returns undefined\n * @example\n *\n * async.waterfall([\n *     function(callback) {\n *         callback(null, 'one', 'two');\n *     },\n *     function(arg1, arg2, callback) {\n *         // arg1 now equals 'one' and arg2 now equals 'two'\n *         callback(null, 'three');\n *     },\n *     function(arg1, callback) {\n *         // arg1 now equals 'three'\n *         callback(null, 'done');\n *     }\n * ], function (err, result) {\n *     // result now equals 'done'\n * });\n *\n * // Or, with named functions:\n * async.waterfall([\n *     myFirstFunction,\n *     mySecondFunction,\n *     myLastFunction,\n * ], function (err, result) {\n *     // result now equals 'done'\n * });\n * function myFirstFunction(callback) {\n *     callback(null, 'one', 'two');\n * }\n * function mySecondFunction(arg1, arg2, callback) {\n *     // arg1 now equals 'one' and arg2 now equals 'two'\n *     callback(null, 'three');\n * }\n * function myLastFunction(arg1, callback) {\n *     // arg1 now equals 'three'\n *     callback(null, 'done');\n * }\n */\nfunction waterfall(tasks, callback) {\n    callback = (0, _once2.default)(callback);\n    if (!Array.isArray(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));\n    if (!tasks.length) return callback();\n    var taskIndex = 0;\n\n    function nextTask(args) {\n        var task = (0, _wrapAsync2.default)(tasks[taskIndex++]);\n        task(...args, (0, _onlyOnce2.default)(next));\n    }\n\n    function next(err, ...args) {\n        if (err === false) return;\n        if (err || taskIndex === tasks.length) {\n            return callback(err, ...args);\n        }\n        nextTask(args);\n    }\n\n    nextTask([]);\n}\n\nexports.default = (0, _awaitify2.default)(waterfall);\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack:///./node_modules/async/waterfall.js?");

/***/ })

}]);