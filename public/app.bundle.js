/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _requestFactory = __webpack_require__(1);

	var _requestFactory2 = _interopRequireDefault(_requestFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	    var api = '/api/post';
	    var el = document.getElementById("message-input-button");

	    el.parentElement.addEventListener("keyup", function (e) {
	        e.preventDefault();
	        if (e.keyCode == 13) {
	            el.click();
	        }
	    });

	    el.addEventListener("click", function () {

	        postingInsult();

	        //GENERATING A message
	        setTimeout(function () {
	            gettingInsult();
	        }, responseTime());
	    });
	    //getting message
	    var gettingInsult = function gettingInsult() {
	        (0, _requestFactory2.default)({
	            method: 'get',
	            url: api
	        }).then(function (data) {
	            return (0, _requestFactory2.default)({
	                method: 'get',
	                url: api
	            }).then(function (data) {
	                var response = JSON.parse(data);
	                var randomIndex = getRandomIndex(response.length);
	                var randomInsult = response[randomIndex];
	                generateMessage("incoming", randomInsult.text);
	            }).catch(function (err) {
	                console.error("error", err.statusText);
	            });
	        }).catch(function (err) {
	            console.error("error", err.statusText);
	        });
	    };

	    function getRandomIndex(lengthOfResponse) {
	        return Math.floor(Math.random(0, lengthOfResponse) * 100);
	    }
	    //posting message
	    var postingInsult = function postingInsult() {
	        var message = document.getElementById("message-input").value;
	        (0, _requestFactory2.default)({
	            method: "get",
	            url: api,
	            params: { 'text': message }
	        }).then(function (data) {
	            return (0, _requestFactory2.default)({
	                method: 'post',
	                url: api,
	                params: {
	                    text: message
	                },
	                headers: {
	                    'Content-Type': 'application/x-www-form-urlencoded'
	                }
	            });
	        }).catch(function (err) {
	            console.error("error : ", err);
	        });
	        generateMessage("outgoing");
	    };

	    function fadeIn(element) {
	        element.style.opacity = 0;

	        var last = +new Date();
	        var tick = function tick() {
	            element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
	            last = +new Date();

	            if (+element.style.opacity < 1) {
	                window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
	            }
	        };

	        tick();
	    }

	    function generateMessage(messageStatus, recievedMessage) {
	        //visualize message to user
	        var input = document.getElementById("message-input"),
	            message = recievedMessage ? recievedMessage : input.value,
	            time = getTime(),

	        //creating a article with a picture and style.
	        article = generateArticle(message, time, messageStatus),
	            chat = document.getElementById("message-pane");
	        chat.appendChild(article);
	        fadeIn(article);
	        //reset input value.
	        input.value = '';
	    }

	    function generateArticle(message, currentTime, messageStatus) {
	        var article = document.createElement("article"),
	            clock = document.createElement("span"),
	            avatar = document.createElement("img");

	        article.innerText = message ? message : "Lorem ipsum";

	        if (messageStatus === "incoming") {
	            article.className = "incoming";
	            avatar.className = "incoming";
	            avatar.setAttribute("src", "./images/bot" + (Math.floor(Math.random() * (5 - 1 + 1)) + 1) + ".jpg");
	        } else {
	            avatar.className = "sender";
	            avatar.setAttribute("src", "./images/avatars.jpg");
	        }

	        clock.innerText = currentTime;
	        clock.className = "time";

	        article.appendChild(avatar);
	        article.appendChild(clock);

	        return article;
	    }

	    function getTime() {
	        return new Date().toLocaleTimeString("en-US", {
	            hour12: false,
	            hour: "numeric",
	            minute: "numeric"
	        });
	    }

	    function responseTime() {
	        return Math.floor(Math.random(2000, 6000));
	    }
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = makeRequest;
	function makeRequest(opts) {
	  return new Promise(function (resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(opts.method, opts.url);
	    xhr.onload = function () {
	      if (this.status >= 200 && this.status < 300) {
	        resolve(xhr.response);
	      } else {
	        reject({
	          status: this.status,
	          statusText: xhr.statusText
	        });
	      }
	    };
	    xhr.onerror = function () {
	      reject({
	        status: this.status,
	        statusText: xhr.statusText
	      });
	    };
	    if (opts.headers) {
	      Object.keys(opts.headers).forEach(function (key) {
	        xhr.setRequestHeader(key, opts.headers[key]);
	      });
	    }
	    var params = opts.params;
	    if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
	      params = Object.keys(params).map(function (key) {
	        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
	      }).join('&');
	    }
	    xhr.send(params);
	  });
	}

/***/ }
/******/ ]);