/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/createElement.js":
/*!******************************!*\
  !*** ./lib/createElement.js ***!
  \******************************/
/*! exports provided: createElement, Wrapper, Text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony import */ var _gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture */ \"./lib/gesture.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nfunction createElement(Cls, attributes) {\n  // console.log(arguments)\n  // debugger\n  var o;\n\n  if (typeof Cls == \"string\") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    //o[name] = attributes[name]; // 用property\n    o.setAttribute(name, attributes[name]); //用attribute\n  } //console.log(children)\n\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n        //o.children.push(child);\n        if (typeof child == \"string\") child = new Text(child);\n\n        if (Array.isArray(child)) {\n          visit(child); // 递归\n\n          continue;\n        }\n\n        if (typeof child === \"function\") {\n          console.log(\"child is Function type: \", child);\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    //console.log(\"config\", config);\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      //console.log(\"Parent::setAttribute\", name, value)\n      this.root.setAttribute(name, value);\n\n      if (name === \"enableGesture\") {\n        Object(_gesture__WEBPACK_IMPORTED_MODULE_0__[\"enableGesture\"])(this.root);\n      }\n\n      if (name.match(/^on([\\s\\S]+)$/)) {\n        // onStart -> 'start' 绑定指定事件函数\n        var eventName = RegExp.$1.replace(/^\\S/, function (s) {\n          return s.toLowerCase();\n        });\n        this.root.addEventListener(eventName, value);\n      }\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this.root.getAttribute(name);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          if (typeof child === \"string\") child = new Text(child);\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // children\n      console.log(\"Wrapper::appendChild\", child); //this.root.appendChild(child);\n      //child.mountTo(this.root);\n\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"class\",\n    set: function set(v) {\n      // property\n      console.log(\"Wrapper::class\", v); //在 o[name] = attributes[name] 时触发\n    }\n  }, {\n    key: \"id\",\n    set: function set(v) {\n      console.log(\"Wrapper::id\", v);\n    }\n  }, {\n    key: \"classList\",\n    get: function get() {\n      return this.root.classList;\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }, {\n    key: \"innerText\",\n    set: function set(text) {\n      return this.root.innerText = text;\n    }\n  }]);\n\n  return Wrapper;\n}();\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n\n//# sourceURL=webpack:///./lib/createElement.js?");

/***/ }),

/***/ "./lib/gesture.js":
/*!************************!*\
  !*** ./lib/gesture.js ***!
  \************************/
/*! exports provided: enableGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableGesture\", function() { return enableGesture; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction enableGesture(element) {\n  var contexts = Object.create(null);\n  var MOUSE_SYMBOL = Symbol(\"mouse\"); // 因为触屏touch也会同时触发mousedown事件，所以要加条件。\n  // document.ontouchstart在触屏设备中存在，值默认为null；在非触屏不存在，值为undefined。\n  // 因此可以由此排除掉当触屏时仍然监听mouse的情况。\n\n  if (!(\"ontouchstart\" in document)) {\n    // 触屏不执行\n    element.addEventListener(\"mousedown\", function (event) {\n      contexts[MOUSE_SYMBOL] = Object.create(null);\n      start(event, contexts[MOUSE_SYMBOL]);\n\n      var mousemove = function mousemove(event) {\n        move(event, contexts[MOUSE_SYMBOL]);\n      };\n\n      var mouseend = function mouseend(event) {\n        end(event, contexts[MOUSE_SYMBOL]);\n        document.removeEventListener(\"mousemove\", mousemove);\n        document.removeEventListener(\"mouseup\", mouseend);\n      };\n\n      document.addEventListener(\"mousemove\", mousemove);\n      document.addEventListener(\"mouseup\", mouseend);\n    });\n  } // touch事件不需要在document上监听，因为天然具有目标锁定的特性\n\n\n  element.addEventListener(\"touchstart\", function (event) {\n    // touchEvent.changeTouches是一个多触控点的类数组集合\n    var _iterator = _createForOfIteratorHelper(event.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        // touch.idetifier是触控的识别符，在touch事件各阶段标识每个触控点。\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  });\n  element.addEventListener(\"touchmove\", function (event) {\n    var _iterator2 = _createForOfIteratorHelper(event.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  });\n  element.addEventListener(\"touchend\", function (event) {\n    var _iterator3 = _createForOfIteratorHelper(event.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  });\n  element.addEventListener(\"touchcancel\", function (event) {\n    // 通常在系统弹窗打断时触发\n    var _iterator4 = _createForOfIteratorHelper(event.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        cancel(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  }); // 需要建立一个context来记录mouse、touch移动时的起始坐标及状态。\n\n  var start = function start(point, context) {\n    element.dispatchEvent(new CustomEvent(\"start\", {\n      detail: {\n        startX: point.startX,\n        startY: point.startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      }\n    }));\n    context.startX = point.clientX, context.startY = point.clientY;\n    context.moves = [];\n    context.isTap = true;\n    context.isPan = false;\n    context.isPress = false;\n    context.timeoutHandler = setTimeout(function () {\n      if (context.isPan) //pan的优先级最高，是pan了后就不会再变成press\n        return;\n      context.isTap = false;\n      context.isPan = false;\n      context.isPress = true;\n      element.dispatchEvent(new CustomEvent(\"pressstart\", {}));\n    }, 500);\n  };\n\n  var move = function move(point, context) {\n    var dx = point.clientX - context.startX,\n        dy = point.clientY - context.startY;\n\n    if (!context.isPan && Math.pow(dx, 2) + Math.pow(dy, 2) > 100) {\n      // 移动超过距离判定为pan\n      if (context.isPress) element.dispatchEvent(new CustomEvent(\"presscancel\", {}));\n      context.isTap = false;\n      context.isPan = true;\n      context.isPress = false;\n      element.dispatchEvent(new CustomEvent(\"panstart\", {\n        detail: {\n          startX: context.startX,\n          // 因为这时已经移动了，所以要从真正的起点开始算，也就是context储存的\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      }));\n    }\n\n    if (context.isPan) {\n      // 移动过程中点坐标与时间戳集合\n      context.moves.push({\n        dx: dx,\n        dy: dy,\n        t: Date.now()\n      }); // 过滤剩下300ms的点\n\n      context.moves = context.moves.filter(function (record) {\n        return Date.now() - record.t < 300;\n      });\n      var event = new CustomEvent(\"pan\", {\n        detail: {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      });\n      element.dispatchEvent(event);\n    } //console.log(\"move\", dx, dy)\n\n  };\n\n  var end = function end(point, context) {\n    if (context.isTap) {\n      //console.log(\"tap\")\n      element.dispatchEvent(new CustomEvent(\"tap\", {}));\n    }\n\n    if (context.isPan) {\n      // 300ms前的第一个点与当前点的距离和时间计算出最后300ms移动速率，\n      // 如果超过一定速度就把pan改判定为flick\n      var dx = point.clientX - context.startX,\n          dy = point.clientY - context.startY;\n      var record = context.moves[0]; // 300ms前的第一个点\n\n      var speed = Math.sqrt(Math.pow(record.dx - dx, 2) + Math.pow(record.dy - dy, 2)) / (Date.now() - record.t); //console.log(speed);\n\n      var isFlick = speed > 2.5;\n\n      if (isFlick) {\n        element.dispatchEvent(new CustomEvent(\"flick\", {\n          detail: {\n            startX: context.startX,\n            startY: context.startY,\n            clientX: point.clientX,\n            clientY: point.clientY,\n            speed: speed //\n\n          }\n        }));\n      } //console.log(context.moves)\n\n\n      element.dispatchEvent(new CustomEvent(\"panend\", {\n        detail: {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY,\n          speed: speed,\n          // 速度\n          isFlick: isFlick\n        }\n      }));\n    }\n\n    if (context.isPress) {\n      console.log(\"press\");\n    }\n\n    clearTimeout(context.timeoutHandler);\n  };\n\n  var cancel = function cancel(point, context) {\n    clearTimeout(context.timeoutHandler);\n    element.dispatchEvent(new CustomEvent(\"cancel\", {}));\n  };\n}\n\n//# sourceURL=webpack:///./lib/gesture.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createElement */ \"./lib/createElement.js\");\n\nvar component = Object(_lib_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", null, \"Hello World!\");\ncomponent.mountTo(document.body);\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });