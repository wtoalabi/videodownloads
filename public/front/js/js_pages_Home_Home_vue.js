(self["webpackChunk"] = self["webpackChunk"] || []).push([["js_pages_Home_Home_vue"],{

/***/ "./js/pages/Home/url_validations.js":
/*!******************************************!*\
  !*** ./js/pages/Home/url_validations.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  services: ["youtube", "twitter"],
  validUrl: function validUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return !!pattern.test(str);
  },
  isSupported: function isSupported(str) {
    var name = extractName(str);
    var selected_service = null;
    var f = this.services.some(function (service) {
      if (name.includes(service)) {
        selected_service = service;
        return service;
      }

      return false;
    });
    return selected_service;
  }
});

function extractName(url) {
  return url.split("://")[1] || url.split("www")[1];
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _url_validations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url_validations */ "./js/pages/Home/url_validations.js");
/* harmony import */ var _Results_Youtube_Youtube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Results/Youtube/Youtube */ "./js/pages/Home/Results/Youtube/Youtube.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted: function mounted() {
    this.$store.commit("fakeVideoData");
  },
  components: {
    Youtube: _Results_Youtube_Youtube__WEBPACK_IMPORTED_MODULE_1__.default
  },
  data: function data() {
    return {
      reloadWithResult: 0,
      inputText: "",
      service: "youtube",
      result: {},
      errorMessage: "",
      showErrorMessage: false,
      video_url: ""
    };
  },
  methods: {
    processInput: function processInput(url) {
      if (url) {
        this.clear();
        this.showErrorMessage = false;

        if (url.length === 0) {
          return this.showErrorMessage = false;
        }

        if (this.isValidUrl(url)) {
          this.$store.dispatch("processUrl", {
            url: url,
            'service': this.service
          });
          this.showErrorMessage = false;
          return;
        }

        this.showErrorMessage = true;
      }
    },
    isValidUrl: function isValidUrl(text) {
      if (_url_validations__WEBPACK_IMPORTED_MODULE_0__.default.validUrl(text)) {
        var service = _url_validations__WEBPACK_IMPORTED_MODULE_0__.default.isSupported(text);

        if (service) {
          this.service = service;
          return true;
        } else {
          this.errorMessage = "This service is not currently being supported...";
        }
      } else {
        this.errorMessage = "The url is not a valid URL...";
      }

      return false;
    },
    clear: function clear() {
      this.showErrorMessage = false;
      this.errorMessage = "";
      this.$store.commit("clearResults");
      this.result = "";
      this.video_url = "";
    }
  },
  watch: {
    serverError: function serverError() {
      this.errorMessage = this.serverError;
      this.showErrorMessage = true;
      console.log(this.serverError);
    },
    results: function results() {
      this.reloadWithResult++;
      this.inputText = "";
    }
  },
  computed: {
    loading: function loading() {
      return this.$store.state.loading;
    },
    serverError: function serverError() {
      return this.$store.state.errorDataMessage;
    },
    results: function results() {
      return this.$store.state.video.result;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var byte_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! byte-size */ "./node_modules/byte-size/dist/index.js");
/* harmony import */ var byte_size__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(byte_size__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//const byteSize = require('byte-size')

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted: function mounted() {
    console.log(this.formats);
  },
  data: function data() {
    return {
      headers: [{
        text: 'Format',
        align: 'start',
        sortable: false,
        value: 'format',
        width: '30%'
      }, {
        text: 'Ext/Type',
        align: 'center',
        value: 'ext',
        sortable: false,
        width: "30%"
      }, {
        text: 'Download',
        align: 'center',
        value: 'download',
        sortable: false
      }, {
        text: 'Size',
        value: 'filesize',
        align: 'center',
        sortable: true
      }],
      formatTypes: {
        160: "Video",
        249: "Audio",
        250: "Audio",
        278: "Video",
        133: "Video",
        242: "Video",
        140: "Audio",
        251: "Audio",
        134: "Video",
        243: "Video",
        135: "Video",
        244: "Video",
        18: "Video",
        136: "Video",
        247: "Video",
        248: "Video",
        137: "Video",
        271: "Video",
        313: "Video",
        302: "Video",
        303: "Video",
        298: "Video",
        299: "Video"
      }
    };
  },
  methods: {
    downloadVideo: function downloadVideo(item) {
      console.log(item, "ITEM");
      var anchor = document.createElement('a');
      anchor.href = item.url;
      anchor.target = '_blank';
      anchor.download = this.fileName;
      anchor.click();
    },
    formatSize: function formatSize(size) {
      var fSize = byte_size__WEBPACK_IMPORTED_MODULE_0___default()(size);
      return "".concat(fSize.value, " ").concat(fSize.unit);
    },
    reformatFormatTitle: function reformatFormatTitle(format) {
      return format.split("-")[1].trim();
    },
    getFormatType: function getFormatType(type) {
      var selectedType = this.formatTypes[type];
      return selectedType || "Unknown";
    },
    getFormatTypeColor: function getFormatTypeColor(type) {
      var selectedType = this.formatTypes[type];
      return selectedType === "Audio" ? "#E1BEE7" : selectedType === "Video" ? "#EF9A9A" : "grey";
    }
  },
  computed: {
    fileName: function fileName() {
      return this.$store.state.video.results.title;
    },
    sortedFormats: function sortedFormats() {
      return _.orderBy(this.$store.state.video.results.formats, ['filesize'], ['asc']).filter(function (format) {
        return format.filesize > 1;
      });
    },
    formats: function formats() {
      return this.sortedFormats;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _FormatsTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormatsTable */ "./js/pages/Home/Results/Youtube/FormatsTable.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted: function mounted() {
    console.log(this.results, "RESULT IN YOUTBE");
  },
  components: {
    FormatsTable: _FormatsTable__WEBPACK_IMPORTED_MODULE_0__.default
  },
  data: function data() {
    return {
      reload: 0,
      chip_colors: ["#FF8A80", "#E3F2FD", "#EDE7F6", "#E1F5FE", "#E0F7FA", "#E0F2F1", "#FFF8E1", "#FFF3E0", "#ECEFF1", "#FBE9E7", "#FAFAFA"]
    };
  },
  methods: {
    chipColor: function chipColor() {
      var rand = _.random(0, this.chip_colors.length);

      return this.chip_colors[rand];
    }
  },
  watch: {
    result: function result() {
      this.reload++;
    }
  },
  computed: {
    hasResults: function hasResults() {
      return _.isNotEmpty(this.results);
    },
    results: function results() {
      return this.$store.state.video.results;
    },
    getFullDate: function getFullDate() {
      var year = this.results.upload_date.substr(0, 4);
      var month = this.results.upload_date.substr(4, 2);
      var day = this.results.upload_date.substr(6, 2);
      return "".concat(day, " - ").concat(month, " - ").concat(year);
    },
    getFullLength: function getFullLength() {
      return (this.results.duration / 60).toFixed(2);
    }
  }
});

/***/ }),

/***/ "./node_modules/byte-size/dist/index.js":
/*!**********************************************!*\
  !*** ./node_modules/byte-size/dist/index.js ***!
  \**********************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  /**
   * @module byte-size
   */

  let defaultOptions = {};
  const _options = new WeakMap();

  class ByteSize {
    constructor (bytes, options) {
      options = Object.assign({
        units: 'metric',
        precision: 1
      }, defaultOptions, options);
      _options.set(this, options);

      const tables = {
        metric: [
          { from: 0   , to: 1e3 , unit: 'B' , long: 'bytes' },
          { from: 1e3 , to: 1e6 , unit: 'kB', long: 'kilobytes' },
          { from: 1e6 , to: 1e9 , unit: 'MB', long: 'megabytes' },
          { from: 1e9 , to: 1e12, unit: 'GB', long: 'gigabytes' },
          { from: 1e12, to: 1e15, unit: 'TB', long: 'terabytes' },
          { from: 1e15, to: 1e18, unit: 'PB', long: 'petabytes' },
          { from: 1e18, to: 1e21, unit: 'EB', long: 'exabytes' },
          { from: 1e21, to: 1e24, unit: 'ZB', long: 'zettabytes' },
          { from: 1e24, to: 1e27, unit: 'YB', long: 'yottabytes' },
        ],
        metric_octet: [
          { from: 0   , to: 1e3 , unit: 'o' , long: 'octets' },
          { from: 1e3 , to: 1e6 , unit: 'ko', long: 'kilooctets' },
          { from: 1e6 , to: 1e9 , unit: 'Mo', long: 'megaoctets' },
          { from: 1e9 , to: 1e12, unit: 'Go', long: 'gigaoctets' },
          { from: 1e12, to: 1e15, unit: 'To', long: 'teraoctets' },
          { from: 1e15, to: 1e18, unit: 'Po', long: 'petaoctets' },
          { from: 1e18, to: 1e21, unit: 'Eo', long: 'exaoctets' },
          { from: 1e21, to: 1e24, unit: 'Zo', long: 'zettaoctets' },
          { from: 1e24, to: 1e27, unit: 'Yo', long: 'yottaoctets' },
        ],
        iec: [
          { from: 0                , to: Math.pow(1024, 1), unit: 'B'  , long: 'bytes' },
          { from: Math.pow(1024, 1), to: Math.pow(1024, 2), unit: 'KiB', long: 'kibibytes' },
          { from: Math.pow(1024, 2), to: Math.pow(1024, 3), unit: 'MiB', long: 'mebibytes' },
          { from: Math.pow(1024, 3), to: Math.pow(1024, 4), unit: 'GiB', long: 'gibibytes' },
          { from: Math.pow(1024, 4), to: Math.pow(1024, 5), unit: 'TiB', long: 'tebibytes' },
          { from: Math.pow(1024, 5), to: Math.pow(1024, 6), unit: 'PiB', long: 'pebibytes' },
          { from: Math.pow(1024, 6), to: Math.pow(1024, 7), unit: 'EiB', long: 'exbibytes' },
          { from: Math.pow(1024, 7), to: Math.pow(1024, 8), unit: 'ZiB', long: 'zebibytes' },
          { from: Math.pow(1024, 8), to: Math.pow(1024, 9), unit: 'YiB', long: 'yobibytes' },
        ],
        iec_octet: [
          { from: 0                , to: Math.pow(1024, 1), unit: 'o'  , long: 'octets' },
          { from: Math.pow(1024, 1), to: Math.pow(1024, 2), unit: 'Kio', long: 'kibioctets' },
          { from: Math.pow(1024, 2), to: Math.pow(1024, 3), unit: 'Mio', long: 'mebioctets' },
          { from: Math.pow(1024, 3), to: Math.pow(1024, 4), unit: 'Gio', long: 'gibioctets' },
          { from: Math.pow(1024, 4), to: Math.pow(1024, 5), unit: 'Tio', long: 'tebioctets' },
          { from: Math.pow(1024, 5), to: Math.pow(1024, 6), unit: 'Pio', long: 'pebioctets' },
          { from: Math.pow(1024, 6), to: Math.pow(1024, 7), unit: 'Eio', long: 'exbioctets' },
          { from: Math.pow(1024, 7), to: Math.pow(1024, 8), unit: 'Zio', long: 'zebioctets' },
          { from: Math.pow(1024, 8), to: Math.pow(1024, 9), unit: 'Yio', long: 'yobioctets' },
        ],
      };
      Object.assign(tables, options.customUnits);

      const prefix = bytes < 0 ? '-' : '';
      bytes = Math.abs(bytes);
      const table = tables[options.units];
      if (table) {
        const units = table.find(u => bytes >= u.from && bytes < u.to);
        if (units) {
          const value = units.from === 0
            ? prefix + bytes
            : prefix + (bytes / units.from).toFixed(options.precision);
          this.value = value;
          this.unit = units.unit;
          this.long = units.long;
        } else {
          this.value = prefix + bytes;
          this.unit = '';
          this.long = '';
        }
      } else {
        throw new Error(`Invalid units specified: ${options.units}`)
      }
    }

    toString () {
      const options = _options.get(this);
      return options.toStringFn ? options.toStringFn.bind(this)() : `${this.value} ${this.unit}`
    }
  }

  /**
   * Returns an object with the spec `{ value: string, unit: string, long: string }`. The returned object defines a `toString` method meaning it can be used in any string context.
   * @param {number} - The bytes value to convert.
   * @param [options] {object} - Optional config.
   * @param [options.precision] {number} - Number of decimal places. Defaults to `1`.
   * @param [options.units] {string} - Specify `'metric'`, `'iec'`, `'metric_octet'`, `'iec_octet'` or the name of a property from the custom units table in `options.customUnits`. Defaults to `metric`.
   * @param [options.customUnits] {object} - An object containing one or more custom unit lookup tables.
   * @param [options.toStringFn] {function} - A `toString` function to override the default.
   * @returns {object}
   * @alias module:byte-size
   */
  function byteSize (bytes, options) {
    return new ByteSize(bytes, options)
  }

  /**
   * Set the default `byteSize` options for the duration of the process.
   * @param options {object} - A `byteSize` options object.
   */
  byteSize.defaultOptions = function (options) {
    defaultOptions = options;
  };

  return byteSize;

})));


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*\n\nxs\n320\n360\n\nsm\n414\n\nmd\n600\n768\n834\n\nlg\n1024\n1280\n\nxlg\n1440\n1680\n\nxxlg\n1920\n\nxxxlg\n2560\n\n$screen-xs: 320px;\n$screen-sm: 479px;\n$screen-md: 767px;\n$screen-lg: 991px;\n$screen-xl: 1199px;\n$screen-xxl: 2559px;\n*/\n/*\nRemember to re-declare some of this in the theme state as well\n*/\n*[data-v-0669b1cc] {\n  word-break: break-word;\n}\n@media (min-width: 321px) {\n.xs-down[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (max-width: 319px) {\n.xs-up[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (min-width: 415px) {\n.sm-down[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (max-width: 413px) {\n.sm-up[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (min-width: 601px) {\n.md-down[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (max-width: 599px) {\n.md-up[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (min-width: 769px) {\n.xmd-down[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (max-width: 767px) {\n.xmd-up[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (min-width: 1025px) {\n.lg-down[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (max-width: 1024px) {\n.lg-up[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (min-width: 1441px) {\n.xl-down[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (max-width: 1439px) {\n.xl-up[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (min-width: 1921px) {\n.xxl-down[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (max-width: 1919px) {\n.xxl-up[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (min-width: 2561px) {\n.xxxl-down[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n@media (max-width: 2559px) {\n.xxxl-up[data-v-0669b1cc] {\n    display: none !important;\n    visibility: hidden;\n}\n}\n.justify-between[data-v-0669b1cc] {\n  justify-content: space-between !important;\n}\n.align-center[data-v-0669b1cc] {\n  align-items: center;\n}\n.cursor-pointer[data-v-0669b1cc] {\n  cursor: pointer !important;\n}\n.col-0[data-v-0669b1cc] {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n}\n.errorMsg[data-v-0669b1cc] {\n  color: red;\n}\n.hide[data-v-0669b1cc] {\n  display: none;\n}\na[data-v-0669b1cc] {\n  text-decoration: none;\n}\n.menu-list-item[data-v-0669b1cc] {\n  display: flex;\n}\n.menu-list-item .menu_title[data-v-0669b1cc] {\n  font-size: 1.1rem !important;\n  padding: 1rem;\n  color: #000000ab;\n}\n.home[data-v-0669b1cc] {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  /*.image {\n      margin: auto;\n      height: 9px;\n      width: 191px;\n      @media (min-width: 360px) {\n          width: 234px;\n          height: 0;\n      }\n      @media (min-width: 419px) {\n          width: 235px;\n          height: 0;\n      }\n      @media (min-width: 414px) and (min-height: 896px) {\n\n      }\n      @media (min-width: 600px) {\n\n      }\n      @media (min-width: 768px) {\n\n      }\n      @media (min-width: 834px) {\n      }\n      @media (min-width: 1024px) {\n          width: 538px;\n          height: 150px;\n      }\n      @media (min-width: 1280px) {\n          width: 238px;\n      }\n      @media (min-width: 1440px) {\n          width: 276px;\n      }\n      @media (min-width: 1680px) {\n          width: 334px;\n      }\n      @media (min-width: 1920px) {\n          width: 356px;\n      }\n      @media (min-width: 2560px) {\n          width: 500px;\n      }\n      @media (min-width: 2565px) {\n          width: 25%;\n      }\n  }*/\n}\n.home .row[data-v-0669b1cc] {\n  display: flex;\n  justify-content: center;\n}\n.home .main[data-v-0669b1cc] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n.home .image_container[data-v-0669b1cc] {\n  width: 30%;\n  margin: auto;\n}\n.home .image_container .image[data-v-0669b1cc] {\n  width: 100%;\n  height: 100%;\n}\n.home .error[data-v-0669b1cc] {\n  color: red;\n}\n.home .processing_text[data-v-0669b1cc] {\n  text-align: center;\n  margin-top: 1rem;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".expanded_column[data-v-3ed80be4] {\n  display: flex;\n  justify-content: space-evenly;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".centered[data-v-57adc8fe] {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n.text[data-v-57adc8fe] {\n  color: grey;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_0669b1cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_0669b1cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_0669b1cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_style_index_0_id_3ed80be4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_style_index_0_id_3ed80be4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_style_index_0_id_3ed80be4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_style_index_0_id_57adc8fe_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_style_index_0_id_57adc8fe_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_style_index_0_id_57adc8fe_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./js/pages/Home/Home.vue":
/*!********************************!*\
  !*** ./js/pages/Home/Home.vue ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _Home_vue_vue_type_template_id_0669b1cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=0669b1cc&scoped=true& */ "./js/pages/Home/Home.vue?vue&type=template&id=0669b1cc&scoped=true&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ "./js/pages/Home/Home.vue?vue&type=script&lang=js&");
/* harmony import */ var _Home_vue_vue_type_style_index_0_id_0669b1cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss& */ "./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Home_vue_vue_type_template_id_0669b1cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Home_vue_vue_type_template_id_0669b1cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0669b1cc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "js/pages/Home/Home.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./js/pages/Home/Results/Youtube/FormatsTable.vue":
/*!********************************************************!*\
  !*** ./js/pages/Home/Results/Youtube/FormatsTable.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _FormatsTable_vue_vue_type_template_id_3ed80be4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormatsTable.vue?vue&type=template&id=3ed80be4&scoped=true& */ "./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=template&id=3ed80be4&scoped=true&");
/* harmony import */ var _FormatsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormatsTable.vue?vue&type=script&lang=js& */ "./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=script&lang=js&");
/* harmony import */ var _FormatsTable_vue_vue_type_style_index_0_id_3ed80be4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss& */ "./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _FormatsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _FormatsTable_vue_vue_type_template_id_3ed80be4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _FormatsTable_vue_vue_type_template_id_3ed80be4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "3ed80be4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "js/pages/Home/Results/Youtube/FormatsTable.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./js/pages/Home/Results/Youtube/Youtube.vue":
/*!***************************************************!*\
  !*** ./js/pages/Home/Results/Youtube/Youtube.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _Youtube_vue_vue_type_template_id_57adc8fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Youtube.vue?vue&type=template&id=57adc8fe&scoped=true& */ "./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=template&id=57adc8fe&scoped=true&");
/* harmony import */ var _Youtube_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Youtube.vue?vue&type=script&lang=js& */ "./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=script&lang=js&");
/* harmony import */ var _Youtube_vue_vue_type_style_index_0_id_57adc8fe_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss& */ "./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _Youtube_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Youtube_vue_vue_type_template_id_57adc8fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Youtube_vue_vue_type_template_id_57adc8fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "57adc8fe",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "js/pages/Home/Results/Youtube/Youtube.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./js/pages/Home/Home.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./js/pages/Home/Home.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormatsTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Youtube.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss&":
/*!******************************************************************************************!*\
  !*** ./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_0669b1cc_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=style&index=0&id=0669b1cc&scoped=true&lang=scss&");


/***/ }),

/***/ "./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss&":
/*!******************************************************************************************************************!*\
  !*** ./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss& ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_style_index_0_id_3ed80be4_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=style&index=0&id=3ed80be4&scoped=true&lang=scss&");


/***/ }),

/***/ "./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss&":
/*!*************************************************************************************************************!*\
  !*** ./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss& ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_0_rules_0_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_style_index_0_id_57adc8fe_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12[0].rules[0].use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=style&index=0&id=57adc8fe&scoped=true&lang=scss&");


/***/ }),

/***/ "./js/pages/Home/Home.vue?vue&type=template&id=0669b1cc&scoped=true&":
/*!***************************************************************************!*\
  !*** ./js/pages/Home/Home.vue?vue&type=template&id=0669b1cc&scoped=true& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_0669b1cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_0669b1cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_0669b1cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Home.vue?vue&type=template&id=0669b1cc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=template&id=0669b1cc&scoped=true&");


/***/ }),

/***/ "./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=template&id=3ed80be4&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=template&id=3ed80be4&scoped=true& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_template_id_3ed80be4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_template_id_3ed80be4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormatsTable_vue_vue_type_template_id_3ed80be4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormatsTable.vue?vue&type=template&id=3ed80be4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=template&id=3ed80be4&scoped=true&");


/***/ }),

/***/ "./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=template&id=57adc8fe&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=template&id=57adc8fe&scoped=true& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_template_id_57adc8fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_template_id_57adc8fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_template_id_57adc8fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Youtube.vue?vue&type=template&id=57adc8fe&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=template&id=57adc8fe&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=template&id=0669b1cc&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Home.vue?vue&type=template&id=0669b1cc&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* binding */ render,
/* harmony export */   "staticRenderFns": () => /* binding */ staticRenderFns
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "home" }, [
    _c(
      "div",
      { staticClass: "fill-height main" },
      [
        _c(
          "div",
          { staticClass: "image_container" },
          [
            _c("v-img", {
              staticClass: "image",
              attrs: {
                "lazy-src": "https://picsum.photos/id/11/10/6",
                src: "/images/download_video.svg"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "v-row",
          [
            _c(
              "v-col",
              { attrs: { cols: "12", sm: "10", md: "10" } },
              [
                _vm.showErrorMessage
                  ? _c(
                      "div",
                      [
                        _c(
                          "v-alert",
                          { attrs: { text: "", rounded: "", type: "error" } },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.errorMessage) +
                                "\n                    "
                            )
                          ]
                        )
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c("v-text-field", {
                  attrs: {
                    auto: "",
                    color: "black",
                    outlined: "",
                    label: "Paste/Type the video url...",
                    clearable: "",
                    rounded: ""
                  },
                  on: { "click:clear": _vm.clear, input: _vm.processInput },
                  model: {
                    value: _vm.inputText,
                    callback: function($$v) {
                      _vm.inputText = $$v
                    },
                    expression: "inputText"
                  }
                }),
                _vm._v(" "),
                _vm.loading
                  ? _c(
                      "div",
                      [
                        _c("v-progress-linear", {
                          attrs: {
                            color: "primary",
                            height: "10",
                            striped: "",
                            stream: "",
                            indeterminate: ""
                          }
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "processing_text" }, [
                          _vm._v(
                            "\n                        Processing Video...please wait and stay on this page!\n                    "
                          )
                        ])
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(_vm.service, { tag: "component" })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c("v-spacer")
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=template&id=3ed80be4&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/FormatsTable.vue?vue&type=template&id=3ed80be4&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* binding */ render,
/* harmony export */   "staticRenderFns": () => /* binding */ staticRenderFns
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-data-table", {
    staticClass: "elevation-1",
    attrs: {
      headers: _vm.headers,
      "items-per-page": _vm.formats.length,
      items: _vm.formats,
      "hide-default-footer": ""
    },
    scopedSlots: _vm._u([
      {
        key: "item.format",
        fn: function(ref) {
          var item = ref.item
          return [
            _vm._v(
              "\n        " +
                _vm._s(_vm.reformatFormatTitle(item.format)) +
                "\n    "
            )
          ]
        }
      },
      {
        key: "item.ext",
        fn: function(ref) {
          var item = ref.item
          return [
            _c(
              "div",
              { staticClass: "expanded_column" },
              [
                _c("v-chip", { attrs: { small: "" } }, [
                  _vm._v(_vm._s(item.ext))
                ]),
                _vm._v(" "),
                _c(
                  "v-chip",
                  {
                    attrs: {
                      small: "",
                      color: _vm.getFormatTypeColor(item.format_id)
                    }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.getFormatType(item.format_id)) +
                        "\n            "
                    )
                  ]
                )
              ],
              1
            )
          ]
        }
      },
      {
        key: "item.download",
        fn: function(ref) {
          var item = ref.item
          return [
            _c(
              "v-tooltip",
              {
                attrs: { left: "" },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "activator",
                      fn: function(ref) {
                        var on = ref.on
                        var attrs = ref.attrs
                        return [
                          _c(
                            "a",
                            {
                              attrs: {
                                target: "_blank",
                                download: _vm.fileName,
                                href: item.url
                              }
                            },
                            [_c("v-icon", [_vm._v("mdi-download")])],
                            1
                          )
                        ]
                      }
                    }
                  ],
                  null,
                  true
                )
              },
              [
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    "You can click to download or right click to copy the link to your clipboard"
                  )
                ])
              ]
            )
          ]
        }
      },
      {
        key: "item.filesize",
        fn: function(ref) {
          var item = ref.item
          return [
            _vm._v(
              "\n        " + _vm._s(_vm.formatSize(item.filesize)) + "\n    "
            )
          ]
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=template&id=57adc8fe&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./js/pages/Home/Results/Youtube/Youtube.vue?vue&type=template&id=57adc8fe&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* binding */ render,
/* harmony export */   "staticRenderFns": () => /* binding */ staticRenderFns
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { key: _vm.reload }, [
    _vm.hasResults
      ? _c(
          "div",
          [
            _c(
              "v-row",
              [
                _c("v-col", { attrs: { cols: "12", md: "6" } }, [
                  _c("div", { staticClass: "mt-44" }, [
                    _c("strong", [
                      _vm._v(_vm._s(_vm._f("shorten")(_vm.results.title, 90)))
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-4" },
                    _vm._l(_vm.results.categories, function(category, index) {
                      return _c(
                        "v-chip",
                        { key: index, attrs: { color: _vm.chipColor() } },
                        [_vm._v(_vm._s(category) + "\n                    ")]
                      )
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "mt-4" }, [
                    _c("strong", [_vm._v("Uploaded By:")]),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "text",
                        attrs: { href: _vm.results.uploader_url }
                      },
                      [_vm._v(_vm._s(_vm.results.uploader) + " ")]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mt-4" }, [
                    _c("strong", [_vm._v("Uploaded On:")]),
                    _vm._v(" "),
                    _c("span", { staticClass: "text" }, [
                      _vm._v(_vm._s(_vm.getFullDate))
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mt-4" }, [
                    _c("strong", [_vm._v("Length:")]),
                    _vm._v(" "),
                    _c("span", { staticClass: "text" }, [
                      _vm._v(_vm._s(_vm.getFullLength) + " minutes")
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "v-col",
                  { staticClass: "centered", attrs: { cols: "12", md: "6" } },
                  [
                    _vm.results.thumbnail
                      ? _c("v-img", { attrs: { src: _vm.results.thumbnail } })
                      : _c("v-img", {
                          attrs: {
                            width: "50%",
                            src: "/images/default_video_image.svg"
                          }
                        })
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "v-row",
              { staticStyle: { display: "flex", "justify-content": "center" } },
              [
                _c("v-col", { attrs: { cols: "12" } }, [_c("formats-table")], 1)
              ],
              1
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ normalizeComponent
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);