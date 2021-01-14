/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dev/js/extension.js":
/*!*****************************!*\
  !*** ./dev/js/extension.js ***!
  \*****************************/
/***/ (() => {

var id = chrome.runtime.id; //const parent = document.querySelector(".main")

var single = document.querySelector(".watch-main-col");
var playlist = document.querySelector(".ytd-playlist-sidebar-renderer");

if (location.href.includes("watch?v") && location.href.includes("&list=")) {
  console.log("installOnPlaylistWithSinglePlayer");
  installOnPlaylistWithSinglePlayer();
} else if (playlist && location.href.includes("playlist?list")) {
  console.log("installOnPlaylistPage");
  installOnPlaylistPage();
} else if (single && location.href.includes("watch?v")) {
  console.log("installOnSingleVideoPage");
  installOnSingleVideoPage();
}

function getPlaylistUrl() {
  var a = document.querySelector("a.yt-simple-endpoint.yt-formatted-string");
  return a.href;
}

function installOnPlaylistWithSinglePlayer() {
  var parent = document.querySelector(".ytp-chrome-controls");
  parent.classList.add("download_videos_chrome_extension");
  var playListUrl = getPlaylistUrl();
  var playListButton = createButton(null, "Download The Entire Playlist", playListUrl);
  var singleVideoButton = createButton(null, "Download This Video", null);
  parent.insertBefore(playListButton, parent.children[1]);
  parent.insertBefore(singleVideoButton, parent.children[2]);
}

function installOnSingleVideoPage() {
  var parent = document.querySelector(".ytp-chrome-controls");
  parent.classList.add("download_videos_chrome_extension");
  var button = createButton(null, "Download Video");
  parent.insertBefore(button, parent.children[1]);
}

function installOnPlaylistPage() {
  var parent = document.querySelector(".ytd-playlist-sidebar-renderer");
  parent.classList.add("download_videos_chrome_extension");
  var button = createButton("playlist_button", "Download Playlist Videos");
  parent.insertBefore(button, parent.children[2]);
}

function createButton(additional_class, text) {
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var img = document.createElement("img");
  var button = document.createElement("button");
  button.type = "button";
  button.role = "button";
  button.classList.add("click_to_download");
  button.classList.add(additional_class);
  /**/

  button.innerHTML = "\n    <div class=\"img_container\"><img src=\"chrome-extension://".concat(id, "/assets/images/logo.png\"/></div>\n\t\t<span class=\"button-text-content\">").concat(text, "</span>\n");
  img.setAttribute("title", "Click to ".concat(text));
  img.src = "chrome-extension://".concat(id, "/assets/images/logo.svg");
  button.addEventListener("click", function () {
    {
      window.open("https://videodownloads.xyz/#/?url=".concat(url === null ? location.href : url));
    }
  });
  return button;
}

/***/ }),

/***/ "./dev/styles/extension.scss":
/*!***********************************!*\
  !*** ./dev/styles/extension.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/extension": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./dev/js/extension.js"],
/******/ 			["./dev/styles/extension.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkvideodownloads_chrome_extension"] = self["webpackChunkvideodownloads_chrome_extension"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;