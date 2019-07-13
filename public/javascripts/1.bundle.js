(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./app/common/ViewBook.jsx":
/*!*********************************!*\
  !*** ./app/common/ViewBook.jsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ViewBook; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context.jsx */ \"./app/context.jsx\");\n/* harmony import */ var _handleBookData_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handleBookData.jsx */ \"./app/common/handleBookData.jsx\");\n/* harmony import */ var _ViewBookButtons_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewBookButtons.jsx */ \"./app/common/ViewBookButtons.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar Fragment = react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment;\n\n\n\n\nvar ViewBook =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(ViewBook, _React$Component);\n\n  function ViewBook(props) {\n    var _this;\n\n    _classCallCheck(this, ViewBook);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewBook).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_this), \"updateView\", function () {\n      _this.setState({\n        display: 'loading'\n      });\n\n      Object(_handleBookData_jsx__WEBPACK_IMPORTED_MODULE_2__[\"getBookData\"])(_this.abortController.signal, _this.props.bookId, function (err, data) {\n        if (err === 404 || !data) {\n          return _this.setState({\n            display: 'not found'\n          });\n        } else if (err === 401) {\n          return _this.context.setAppContext('authenticated', false);\n        }\n\n        var ownedState = true;\n\n        if (!data.userData) {\n          var ownedState = false;\n        }\n\n        _this.setState({\n          display: 'found',\n          data: data,\n          owned: ownedState\n        });\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"addChangeDeleteCallback\", function (err, data, ownedState) {\n      if (err) {\n        if (err == 401) {\n          return _this.context.setAppContext('authenticated', false);\n        }\n\n        if (err == 500 || err == 400) {\n          return _this.setState({\n            display: 'error'\n          });\n        }\n\n        return _this.setState({\n          display: 'not found'\n        });\n      }\n\n      _this.setState(function (state) {\n        var newData = state.data;\n        newData.userData = data;\n        console.log(newData);\n        return {\n          data: newData,\n          owned: ownedState,\n          blockButtons: false\n        };\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"addBook\", function (status) {\n      var id = _this.state.data.bookData.text_id;\n      Object(_handleBookData_jsx__WEBPACK_IMPORTED_MODULE_2__[\"addToList\"])(id, status, function (err, data) {\n        _this.addChangeDeleteCallback(err, data, true);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"changeBook\", function (status) {\n      var id = _this.state.data.bookData.text_id;\n      Object(_handleBookData_jsx__WEBPACK_IMPORTED_MODULE_2__[\"changeInList\"])(id, status, function (err, data) {\n        _this.addChangeDeleteCallback(err, data, true);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"removeBook\", function () {\n      var id = _this.state.data.bookData.text_id;\n      Object(_handleBookData_jsx__WEBPACK_IMPORTED_MODULE_2__[\"deleteFromList\"])(id, function (err, data) {\n        _this.addChangeDeleteCallback(err, data, false);\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"turnOffButton\", function () {\n      _this.setState({\n        blockButtons: true\n      });\n    });\n\n    _this.state = {\n      display: 'loading',\n      // 'found' / 'not found' / loading / 'error'\n      data: null,\n      owned: false,\n      blockButtons: false\n    };\n    _this.abortController = new AbortController();\n    return _this;\n  }\n\n  _createClass(ViewBook, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.updateView();\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      this.abortController.abort();\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      if (prevProps.bookId !== this.props.bookId) {\n        this.updateView();\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      if (this.state.display === 'found') {\n        var bookData = this.state.data.bookData;\n        var userData = this.state.data.userData;\n        var metadata = bookData.metadata;\n        var thumbnail = \"http://www.gutenberg.org/cache/epub/\".concat(bookData.text_id, \"/pg\").concat(bookData.text_id, \".cover.medium.jpg\");\n        var link = \"http://www.gutenberg.org/ebooks/\".concat(bookData.text_id);\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"viewBookContainer\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n          href: link,\n          target: \"_blank\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n          className: \"viewBookHeader\"\n        }, metadata.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"viewBookThumbnail\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n          src: thumbnail,\n          alt: \"\"\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, metadata.title), function () {\n          if (userData) {\n            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, userData.status);\n          }\n        }())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ViewBookButtons_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n          owned: this.state.owned,\n          userData: userData,\n          addBook: this.addBook,\n          changeBook: this.changeBook,\n          removeBook: this.removeBook,\n          turnOffButton: this.turnOffButton,\n          blockButtons: this.state.blockButtons\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"viewBookInfo\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"b\", null, \"Language:\"), \" \", metadata.language), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"b\", null, \"Author:\"), \" \", metadata.author), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"b\", null, \"Subject:\")), function () {\n          if (metadata.subject) return metadata.subject.map(function (subject, i) {\n            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n              key: i\n            }, subject);\n          });\n        }())));\n      } else if (this.state.display === 'loading') {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"viewBookLoading\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Getting book data...\"));\n      } else if (this.state.display === 'not found') {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"viewBookLoading viewBookNotFound\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Can't find a book with that id :(\"));\n      } else if (this.state.display === 'error') {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"viewBookLoading viewBookError\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"This app just tripped on a rock and fall off a cliff :(\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Hit F5 button to revive it.\"));\n      }\n    }\n  }]);\n\n  return ViewBook;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n_defineProperty(ViewBook, \"contextType\", _context_jsx__WEBPACK_IMPORTED_MODULE_1__[\"AppContext\"]);\n\n\n\n//# sourceURL=webpack:///./app/common/ViewBook.jsx?");

/***/ }),

/***/ "./app/common/ViewBookButtons.jsx":
/*!****************************************!*\
  !*** ./app/common/ViewBookButtons.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ViewBookButtons; });\n/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/throttle */ \"./node_modules/lodash/throttle.js\");\n/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar Fragment = react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment;\n\nvar ViewBookButtons =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(ViewBookButtons, _React$Component);\n\n  function ViewBookButtons(props) {\n    var _this;\n\n    _classCallCheck(this, ViewBookButtons);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ViewBookButtons).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_this), \"handleInput\", function (e) {\n      _this.setState({\n        input: e.target.value\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"buttonPress\", function (e) {\n      var type = e.target.dataset.type;\n\n      _this.props.turnOffButton();\n\n      if (type == 'add') {\n        _this.props.addBook(_this.state.input);\n      } else if (type == 'change') {\n        _this.props.changeBook(_this.state.input);\n      } else if (type == 'remove') {\n        _this.props.removeBook();\n      }\n    });\n\n    _this.state = {\n      input: ''\n    };\n    _this.buttonPressThrottled = lodash_throttle__WEBPACK_IMPORTED_MODULE_0___default()(_this.buttonPress, 500);\n    return _this;\n  }\n\n  _createClass(ViewBookButtons, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      if (!this.props.userData) {\n        this.setState({\n          input: 'plan-to-read'\n        });\n      } else {\n        this.setState({\n          input: this.props.userData.status\n        });\n      }\n    } // componentWillUnmount() {\n    //   this.buttonPressThrottled.cancel()\n    // }\n\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      if (!this.props.blockButtons) {\n        var options = ['reading', 'plan-to-read', 'finished'];\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n          className: \"viewBookButtons\"\n        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"label\", {\n          htmlFor: \"viewBookStatusSelect\"\n        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"select\", {\n          name: \"status\",\n          value: this.state.input,\n          onChange: this.handleInput,\n          id: \"viewBookStatusSelect\"\n        }, options.map(function (value, i) {\n          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"option\", {\n            value: value,\n            key: i\n          }, value);\n        })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"span\", null, \"v\"))), function () {\n          if (!_this2.props.userData) return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n            \"data-type\": \"add\",\n            onClick: _this2.buttonPressThrottled\n          }, \"Add to list\");else return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n            \"data-type\": \"change\",\n            onClick: _this2.buttonPressThrottled\n          }, \"Change\"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n            \"data-type\": \"remove\",\n            onClick: _this2.buttonPressThrottled\n          }, \"Remove\"));\n        }());\n      } else {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n          className: \"viewBookButtons\"\n        }, \"...\");\n      }\n    }\n  }]);\n\n  return ViewBookButtons;\n}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);\n\n\n\n//# sourceURL=webpack:///./app/common/ViewBookButtons.jsx?");

/***/ }),

/***/ "./app/common/handleBookData.jsx":
/*!***************************************!*\
  !*** ./app/common/handleBookData.jsx ***!
  \***************************************/
/*! exports provided: getBookData, addToList, changeInList, deleteFromList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBookData\", function() { return getBookData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addToList\", function() { return addToList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeInList\", function() { return changeInList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteFromList\", function() { return deleteFromList; });\nfunction getBookData(signal, id, callback) {\n  fetchBookAPI(signal, id, function (err, bookData) {\n    if (err) return callback(err, null);\n    fetchUserData(signal, id, function (err, userData) {\n      // if (err) return callback(err, null);\n      var data = {\n        bookData: bookData,\n        userData: userData\n      };\n      return callback(null, data);\n    });\n  });\n}\n\nfunction fetchBookAPI(signal, id, callback) {\n  var response = fetch(\"https://gutenberg.justamouse.com/texts/\".concat(id), {\n    signal: signal\n  });\n  response.then(function (res) {\n    if (!res.ok) {\n      return Promise.reject(res.status);\n    }\n\n    return res.json();\n  }).then(function (data) {\n    if (!data.metadata.title) {\n      return Promise.reject(404);\n    } else {\n      callback(null, data);\n    }\n  })[\"catch\"](function (reason) {\n    callback(reason, null);\n  });\n}\n\nfunction fetchUserData(signal, id, callback) {\n  var response = fetch(\"/api/booklist/\".concat(id), {\n    credentials: 'same-origin',\n    signal: signal\n  });\n  response.then(function (res) {\n    if (!res.ok) {\n      return Promise.reject(res.status);\n    } else {\n      return res.json();\n    }\n  }).then(function (data) {\n    callback(null, data);\n  })[\"catch\"](function (reason) {\n    callback(reason, null);\n  });\n}\n\nfunction addChangeDelete(method, bookId, status, callback) {\n  var init = {\n    method: method,\n    credentials: 'same-origin'\n  };\n\n  if (method != 'DELETE') {\n    init.headers = {\n      'Content-Type': 'application/json'\n    };\n    init.body = JSON.stringify({\n      status: status\n    });\n  }\n\n  var url = \"/api/booklist/\".concat(bookId);\n  var response = fetch(url, init);\n  response.then(function (res) {\n    if (!res.ok) {\n      return Promise.reject(res.status);\n    }\n\n    return res.json();\n  }).then(function (data) {\n    return callback(null, data);\n  })[\"catch\"](function (rej) {\n    return callback(rej, null);\n  });\n}\n\nfunction addToList(bookId, status, callback) {\n  addChangeDelete('POST', bookId, status, callback);\n}\n\nfunction changeInList(bookId, status, callback) {\n  addChangeDelete('PUT', bookId, status, callback);\n}\n\nfunction deleteFromList(bookId, callback) {\n  addChangeDelete('DELETE', bookId, null, callback);\n}\n\n\n\n//# sourceURL=webpack:///./app/common/handleBookData.jsx?");

/***/ })

}]);