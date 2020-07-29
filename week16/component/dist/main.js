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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel.view":
/*!***********************!*\
  !*** ./carousel.view ***!
  \***********************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n\n\nclass Carousel{ //TODO: extends Base Class\n    setAttribute(name, value){ // attribute\n        this[name] = value;\n    }\n    render(){\n        return Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {\"type\":\"startTag\",\"tagName\":\"div\"}, \"\\r\\n        \",Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"img\", {\"type\":\"startTag\",\"tagName\":\"img\",\"isSelfClosing\":true}, ),\"\\r\\n        \",Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"p\", {\"type\":\"startTag\",\"tagName\":\"p\"}, ),\"\\r\\n    \");\n    }\n    mountTo(parent){\n        this.render().mountTo(parent);\n    }\n}\n        \n\n//# sourceURL=webpack:///./carousel.view?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Wrapper, Text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction createElement(Cls, attributes) {\n  // console.log(arguments)\n  // debugger\n  var o;\n\n  if (typeof Cls == \"string\") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    //o[name] = attributes[name]; // 用property\n    o.setAttribute(name, attributes[name]); //用attribute\n  } //console.log(children)\n\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n        //o.children.push(child);\n        if (typeof child == \"string\") child = new Text(child);\n\n        if (Array.isArray(child)) {\n          visit(child); // 递归\n\n          continue;\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    //console.log(\"config\", config);\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      //console.log(\"Parent::setAttribute\", name, value)\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          if (typeof child === \"string\") child = new Text(child);\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // children\n      console.log(\"Wrapper::appendChild\", child); //this.root.appendChild(child);\n      //child.mountTo(this.root);\n\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"class\",\n    set: function set(v) {\n      // property\n      console.log(\"Wrapper::class\", v); //在 o[name] = attributes[name] 时触发\n    }\n  }, {\n    key: \"id\",\n    set: function set(v) {\n      console.log(\"Wrapper::id\", v);\n    }\n  }, {\n    key: \"classList\",\n    get: function get() {\n      return this.root.classList;\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n/* harmony import */ var _carousel_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.view */ \"./carousel.view\");\n\n\n/*\r\nclass Carousel{\r\n    constructor(config){\r\n        this.children = [];\r\n        this.attributes = new Map();\r\n        this.properties = new Map();\r\n    }\r\n\r\n    setAttribute(name, value){ // attribute\r\n        this[name] = value;\r\n    }\r\n\r\n    render(){\r\n        let children = this.data.map(url => {\r\n            let element = <img src={url}/>;\r\n            element.addEventListener(\"dragstart\", event => event.preventDefault());\r\n            return element; \r\n        });\r\n\r\n        let root = <div class=\"carousel\">\r\n            { children }\r\n        </div>;\r\n\r\n        let position = 0;\r\n        let nextPic = () => {\r\n            let nextPosition = (position + 1) % this.data.length; // 取余运算\r\n            \r\n            let current = children[position];\r\n            let next = children[nextPosition];\r\n            children.forEach(ele => {\r\n                ele.classList.remove(\"current\");\r\n                ele.classList.remove(\"next\");\r\n            })\r\n            current.style.transition = next.style.transition = \"ease 0s\";\r\n            current.style.transform = `translateX(${- 100 * position}%)`;\r\n            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`; \r\n\r\n            setTimeout(function(){\r\n                current.style.transition = next.style.transition = \"\";\r\n\r\n                current.style.transform = `translateX(${- 100 - 100 * position}%)`;\r\n                current.classList.add('current');\r\n                next.style.transform = `translateX(${- 100 * nextPosition}%)`;\r\n                next.classList.add('next');\r\n\r\n                position = nextPosition;\r\n            }, 16)\r\n\r\n            setTimeout(nextPic, 3000);\r\n        }\r\n        //setTimeout(nextPic, 3000);\r\n\r\n        root.addEventListener(\"mousedown\", event => {\r\n            let nextPosition = (position + 1) % this.data.length; \r\n            let lastPosition = (position - 1 + this.data.length) % this.data.length;\r\n\r\n            let current = children[position];\r\n            let next = children[nextPosition];\r\n            let last = children[lastPosition];\r\n\r\n            current.style.transition =  next.style.transition = last.style.transition = \"ease 0s\";\r\n            let startX = event.clientX, startY = event.clientY;\r\n\r\n            let move = event => {\r\n                //console.log(event.clientX - startX, event.clientY - startY)\r\n                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`\r\n                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`\r\n                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`\r\n            }\r\n            let up = event => {\r\n\r\n                let offset = 0;\r\n                if(event.clientX - startX > 250){\r\n                    offset = 1;\r\n                }else if(event.clientX - startX < -250){\r\n                    offset = -1;\r\n                }\r\n\r\n                current.style.transition =  next.style.transition = last.style.transition = \"\";\r\n\r\n                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`\r\n                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`\r\n                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`\r\n\r\n                position = (position - offset + this.data.length) % this.data.length;\r\n\r\n                document.removeEventListener(\"mousemove\", move);\r\n                document.removeEventListener(\"mouseup\", up);\r\n            }\r\n            document.addEventListener(\"mousemove\", move);\r\n            document.addEventListener(\"mouseup\", up);\r\n        })\r\n        return root;\r\n    }\r\n\r\n    mountTo(parent){\r\n        this.render().mountTo(parent);\r\n    }\r\n}\r\n*/\n\nvar component = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(_carousel_view__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], {\n  data: [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]\n}); //component.title = \"I'm a property title\";\n\ncomponent.mountTo(document.body);\nconsole.log(component); //component.id = \"b\"\n//component.setAttribute(\"id\", \"b\");\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });