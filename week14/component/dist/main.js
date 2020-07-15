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

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//require(\"./foo.js\")\n//import \"./foo\"\nfunction createElement(Cls, attributes) {\n  // console.log(arguments)\n  // debugger\n  var o;\n\n  if (typeof Cls == \"string\") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    //o[name] = attributes[name]; // 用property\n    o.setAttribute(name, attributes[name]); //用attribute\n  } //console.log(children)\n\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n    //o.children.push(child);\n    o.appendChild(child);\n  }\n\n  return o;\n}\n\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    //console.log(\"config\", config);\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      //console.log(\"Parent::setAttribute\", name, value)\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator = _createForOfIteratorHelper(this.children),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var child = _step.value;\n          if (typeof child === \"string\") child = new Text(child);\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // children\n      console.log(\"Parent::appendChild\", child); //this.root.appendChild(child);\n      //child.mountTo(this.root);\n\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"class\",\n    set: function set(v) {\n      // property\n      console.log(\"Parent::class\", v); //在 o[name] = attributes[name] 时触发\n    }\n  }, {\n    key: \"id\",\n    set: function set(v) {\n      console.log(\"Parent::id\", v);\n    }\n  }]);\n\n  return Wrapper;\n}();\n\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n/*\r\nclass MyComponent{\r\n    constructor(config){\r\n        //console.log(\"config\", config);\r\n        this.children = [];\r\n        this.attributes = new Map();\r\n        this.properties = new Map();\r\n    }\r\n\r\n    set class(v){ // property\r\n        console.log(\"Parent::class\", v); //在 o[name] = attributes[name] 时触发\r\n    }\r\n\r\n    set id(v){\r\n        console.log(\"Parent::id\", v);\r\n    }\r\n\r\n    setAttribute(name, value){ // attribute\r\n        this.attributes.set(name, value);\r\n    }\r\n\r\n    set title(value){\r\n        this.properties.set(\"title\", value);\r\n    }\r\n\r\n    render(){\r\n        //this.slot = <div></div>\r\n        return <article>\r\n            <h1>{this.attributes.get(\"title\")}</h1>\r\n            <h2>{this.properties.get(\"title\")}</h2>\r\n            <header>I'm a header</header>\r\n            {this.slot}\r\n            <footer>I'm a footer</footer>\r\n        </article>\r\n    }\r\n\r\n    appendChild(child){ // children\r\n        console.log(\"Parent::appendChild\", child)\r\n        //this.slot.appendChild(child);\r\n        this.children.push(child)\r\n    }\r\n    mountTo(parent){\r\n        this.slot = <div></div>\r\n        for(let child of this.children){\r\n            if(typeof child === \"string\"){\r\n                child = new Text(child)\r\n            }\r\n                \r\n            this.slot.appendChild(child)\r\n        }\r\n        this.render().mountTo(parent);\r\n    }\r\n}\r\n*/\n\n\nvar Carousel = /*#__PURE__*/function () {\n  function Carousel(config) {\n    _classCallCheck(this, Carousel);\n\n    //console.log(\"config\", config);\n    this.children = [];\n    this.attributes = new Map();\n    this.properties = new Map();\n  }\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      this.attributes.set(name, value);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      //this.slot = <div></div>\n      return createElement(\"div\", null, this.data.map(function (url) {\n        var element = createElement(\"img\", {\n          src: url\n        });\n        element.addEventListener(\"dragstart\", function (event) {\n          return event.preventDefault();\n        });\n        return element;\n      }));\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      this.render().mountTo(parent);\n    }\n  }]);\n\n  return Carousel;\n}(); // let component = <div id=\"a\" class=\"b\" style=\"width:100px; height:100px; background-color:green;\">\n//     <div></div>\n//     <p>123</p>\n//     <div></div>\n//     <div></div>\n//     </div>\n// let component = <div>{new Wrapper('span')}</div>\n// let component = <MyComponent>\n//         <div>{new Wrapper('span')}</div>\n//     </MyComponent>\n\n\nvar component = createElement(Carousel, {\n  data: [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]\n});\ncomponent.title = \"I'm a property title\";\ncomponent.mountTo(document.body);\nconsole.log(component); //component.id = \"b\"\n//component.setAttribute(\"id\", \"b\");\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });