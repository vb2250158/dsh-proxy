window.__ModuleLoader__.load({ id: '@smanx/dsh-proxy', factory: (require) => { var module = { exports: {} }; var exports = module.exports;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js"(exports, module2) {
    module2.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module2) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module2.exports = BitBuffer;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module2) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module2.exports = BitMatrix;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module3 = data.get(row, col);
          if (module3 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module3;
            sameCountCol = 1;
          }
          module3 = data.get(col, row);
          if (module3 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module3;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module2) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module2.exports = ReedSolomonEncoder;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js"(exports, module2) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module2.exports = NumericData;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module2) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module2.exports = AlphanumericData;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js"(exports, module2) {
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module2.exports = ByteData;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js"(exports, module2) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module2.exports = KanjiData;
  }
});

// node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js"(exports, module2) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module2 !== "undefined") {
      module2.exports = dijkstra;
    }
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/SettingsSection.tsx
var import_react2 = require("react");

// src/contract.ts
var RPC_CHANNEL = "/api";
var RPC_STATUS_ENDPOINT = "dsh-proxy/status";
var RPC_UPDATE_ENDPOINT = "dsh-proxy/update";
var RPC_START_ENDPOINT = "dsh-proxy/start";
var RPC_STOP_ENDPOINT = "dsh-proxy/stop";

// src/client/AccessLinks.tsx
var import_react = require("react");
var import_qrcode = __toESM(require_browser(), 1);
var import_jsx_runtime = require("react/jsx-runtime");
function AddressCode({ url, errorText }) {
  const [image, setImage] = (0, import_react.useState)(null);
  const [failed, setFailed] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    let active = true;
    setImage(null);
    setFailed(false);
    void import_qrcode.default.toDataURL(url, { width: 180, margin: 4, errorCorrectionLevel: "M" }).then(
      (data) => {
        if (active) setImage(data);
      },
      () => {
        if (active) setFailed(true);
      }
    );
    return () => {
      active = false;
    };
  }, [url]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", justifyItems: "start", gap: "10px" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: url, target: "_blank", rel: "noreferrer", style: { color: "var(--dsw-alias-brand-primary)", overflowWrap: "anywhere" }, children: url }),
    image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: image, alt: url, width: 180, height: 180 }) : null,
    failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorText }) : null
  ] });
}
function AccessLinks({ urls, errorText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "20px" }, children: urls.map((url) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressCode, { url, errorText }, url)) });
}

// src/client/SettingsSection.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function StatusRow(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh_lanproxy_rowLabel", children: props.label }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh_lanproxy_rowValue", children: props.value })
  ] });
}
function PortStatus(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dsh_lanproxy_portStatus", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: props.ok ? "dsh_lanproxy_dot dsh_lanproxy_dotOn" : "dsh_lanproxy_dot dsh_lanproxy_dotOff" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh_lanproxy_portValue", children: props.port }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: props.ok ? "dsh_lanproxy_statusText dsh_lanproxy_statusTextOn" : "dsh_lanproxy_statusText dsh_lanproxy_statusTextOff", children: props.ok ? props.okText : props.failText })
  ] });
}
function EyeIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "12", cy: "12", r: "3" })
  ] });
}
function EyeOffIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: "2", x2: "22", y1: "2", y2: "22" })
  ] });
}
function SettingsSection({ rpc, t }) {
  const [phase, setPhase] = (0, import_react2.useState)("loading");
  const phaseRef = (0, import_react2.useRef)("loading");
  const [status, setStatus] = (0, import_react2.useState)(null);
  const [statusError, setStatusError] = (0, import_react2.useState)(null);
  const [saving, setSaving] = (0, import_react2.useState)(false);
  const [controlling, setControlling] = (0, import_react2.useState)(false);
  const [error, setError] = (0, import_react2.useState)(null);
  const [message, setMessage] = (0, import_react2.useState)(null);
  const [controlError, setControlError] = (0, import_react2.useState)(null);
  const [controlMessage, setControlMessage] = (0, import_react2.useState)(null);
  const [showPassword, setShowPassword] = (0, import_react2.useState)(false);
  const [listenPort, setListenPort] = (0, import_react2.useState)("");
  const [username, setUsername] = (0, import_react2.useState)("");
  const [password, setPassword] = (0, import_react2.useState)("");
  const formSeededRef = (0, import_react2.useRef)(false);
  const applyPhase = (0, import_react2.useCallback)((next) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);
  const applyStatusToForm = (0, import_react2.useCallback)((next) => {
    setListenPort(String(next.listenPort));
    setUsername(next.username);
    setPassword(next.password ?? "");
  }, []);
  const loadStatus = (0, import_react2.useCallback)(async () => {
    applyPhase("loading");
    setStatusError(null);
    try {
      const result = await rpc.call(RPC_CHANNEL, RPC_STATUS_ENDPOINT, {});
      if (result.ok) {
        const next = result.value;
        setStatus(next);
        applyPhase("ok");
        if (!formSeededRef.current) {
          applyStatusToForm(next);
          formSeededRef.current = true;
        }
      } else {
        setStatusError(result.error.message);
        applyPhase("error");
      }
    } catch (err) {
      console.error("[dsh-proxy] status RPC failed:", err);
      setStatusError(err instanceof Error ? err.message : String(err));
      applyPhase("error");
    }
  }, [rpc, applyPhase, applyStatusToForm]);
  (0, import_react2.useEffect)(() => {
    void loadStatus();
    const timer = window.setTimeout(() => {
      if (phaseRef.current === "error") void loadStatus();
    }, 2e3);
    return () => window.clearTimeout(timer);
  }, [loadStatus]);
  const runControl = (0, import_react2.useCallback)(async (action) => {
    setControlling(true);
    setControlError(null);
    setControlMessage(null);
    try {
      const result = await rpc.call(
        RPC_CHANNEL,
        action === "start" ? RPC_START_ENDPOINT : RPC_STOP_ENDPOINT,
        {}
      );
      if (result.ok) {
        const next = result.value;
        setStatus(next);
        if (action === "start" && !next.proxyListening) {
          setControlError(t("control.startHintPort"));
        } else {
          setControlMessage(action === "start" ? t("control.started") : t("control.stopped"));
        }
      } else {
        setControlError(result.error.message);
      }
    } catch (err) {
      console.error(`[dsh-proxy] ${action} RPC failed:`, err);
      setControlError(`${t("control.failed")}\uFF1A${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setControlling(false);
    }
  }, [rpc, t]);
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const port = Number(listenPort.trim());
      if (!Number.isInteger(port) || port < 1 || port > 65535) {
        setError(t("form.invalidPort"));
        return;
      }
      if (status !== null && port === status.upstreamPort) {
        setError(t("form.portConflict"));
        return;
      }
      const payload = {
        listenPort: port,
        username: username.trim(),
        password
      };
      const result = await rpc.call(RPC_CHANNEL, RPC_UPDATE_ENDPOINT, payload);
      if (result.ok) {
        const value = result.value;
        setStatus(value.status);
        applyPhase("ok");
        const noticeText = {
          "saved": t("form.updatedSaved"),
          "saved-restarted": t("form.updated"),
          "saved-restart-failed": `${t("form.updatedListenFailed")}\uFF1A${value.message}`,
          "credentials-partial-saved": t("form.updatedSavedPartial"),
          "credentials-partial-restarted": t("form.updatedPartial")
        };
        setMessage(noticeText[value.notice]);
        applyStatusToForm(value.status);
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      console.error("[dsh-proxy] update RPC failed:", err);
      setError(`${t("form.failed")}\uFF1A${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };
  const authBadge = status === null || status.authEnabled ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh_lanproxy_badge dsh_lanproxy_badgeOn", children: t("status.authOn") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh_lanproxy_badge dsh_lanproxy_badgeOff", children: t("status.authOff") });
  const statusCard = phase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_hint", children: t("status.loading") }) : phase === "error" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_statusError", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_error", children: t("status.unreachable") }),
    statusError !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_hint", children: statusError }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsh_lanproxy_button", onClick: () => {
      void loadStatus();
    }, children: t("status.retry") })
  ] }) : status !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gap: "10px", marginBottom: "16px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: t("status.lanUrls") }),
      status.caCertificateUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gap: "8px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: status.caCertificateUrl, children: t("status.ca") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("status.trust") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { style: { overflowWrap: "anywhere" }, children: status.caFingerprint })
      ] }) : null,
      status.lanUrls.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AccessLinks, { urls: status.lanUrls, errorText: t("status.qrError") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh_lanproxy_hint", children: t("status.scan") })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh_lanproxy_hint", children: t("status.noLanUrls") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      StatusRow,
      {
        label: t("status.proxyPort"),
        value: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PortStatus, { port: `${status.listenHost}:${status.listenPort}`, ok: status.proxyListening, okText: t("status.proxyRunning"), failText: t("status.proxyStopped") })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      StatusRow,
      {
        label: t("status.targetPort"),
        value: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PortStatus, { port: `${status.upstreamHost}:${status.upstreamPort}`, ok: status.upstreamReachable, okText: t("status.targetReachable"), failText: t("status.targetUnreachable") })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatusRow, { label: t("status.username"), value: status.username }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatusRow, { label: t("status.auth"), value: authBadge }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_hint", children: status.persisted ? t("status.persistedOn") : t("status.persistedOff") })
  ] }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "dsh_lanproxy_section", "aria-labelledby": "dsh-lanproxy-settings-title", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { id: "dsh-lanproxy-settings-title", className: "dsh_lanproxy_title", children: t("nav") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_subtitle", children: t("form.subtitle") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_cardHeader", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh_lanproxy_cardTitle", children: t("status.title") }),
        phase === "ok" && status !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_controls", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              className: "dsh_lanproxy_button",
              disabled: controlling || status.proxyListening,
              onClick: () => {
                void runControl("start");
              },
              children: t("control.start")
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              className: "dsh_lanproxy_button dsh_lanproxy_buttonStop",
              disabled: controlling || !status.proxyListening,
              onClick: () => {
                void runControl("stop");
              },
              children: t("control.stop")
            }
          )
        ] }) : null
      ] }),
      statusCard,
      controlMessage !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_message", children: controlMessage }) : null,
      controlError !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_error", children: controlError }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("form", { className: "dsh_lanproxy_card dsh_lanproxy_form", onSubmit: (event) => {
      void submit(event);
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "dsh_lanproxy_cardTitle", children: t("form.title") }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "dsh_lanproxy_fieldLabel", htmlFor: "dsh-lanproxy-listen-port", children: t("form.listenPort") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            id: "dsh-lanproxy-listen-port",
            className: "dsh_lanproxy_input",
            type: "number",
            min: 1,
            max: 65535,
            inputMode: "numeric",
            placeholder: t("form.listenPortHint"),
            value: listenPort,
            onChange: (event) => {
              setListenPort(event.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "dsh_lanproxy_fieldLabel", htmlFor: "dsh-lanproxy-username", children: t("form.username") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            id: "dsh-lanproxy-username",
            className: "dsh_lanproxy_input",
            type: "text",
            autoComplete: "username",
            placeholder: t("form.usernameHint"),
            value: username,
            onChange: (event) => {
              setUsername(event.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "dsh_lanproxy_fieldLabel", htmlFor: "dsh-lanproxy-password", children: t("form.password") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_passwordWrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              id: "dsh-lanproxy-password",
              className: "dsh_lanproxy_input dsh_lanproxy_passwordInput",
              type: showPassword ? "text" : "password",
              autoComplete: "new-password",
              placeholder: t("form.passwordHint"),
              value: password,
              onChange: (event) => {
                setPassword(event.target.value);
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              className: "dsh_lanproxy_eye",
              "aria-label": showPassword ? t("form.hidePassword") : t("form.showPassword"),
              title: showPassword ? t("form.hidePassword") : t("form.showPassword"),
              onClick: () => {
                setShowPassword((visible) => !visible);
              },
              children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EyeOffIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EyeIcon, {})
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh_lanproxy_actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "dsh_lanproxy_button", disabled: saving, children: saving ? t("form.saving") : t("form.save") }),
        message !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_message", children: message }) : null,
        error !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh_lanproxy_error", children: error }) : null
      ] })
    ] })
  ] });
}

// src/client/locales.ts
var NS = "dsh-proxy";
var zh = {
  "status.ca": "\u4E0B\u8F7D\u5B89\u5353 CA \u8BC1\u4E66",
  "status.trust": "\u9996\u6B21\u4F7F\u7528\uFF1A\u4E0B\u8F7D\u8BC1\u4E66\uFF0C\u5728\u5B89\u5353\u8BBE\u7F6E\u4E2D\u5B89\u88C5\u4E3A CA \u8BC1\u4E66\uFF0C\u518D\u626B\u63CF HTTPS \u4E8C\u7EF4\u7801\u3002\u5B89\u88C5\u524D\u6838\u5BF9\u4E0B\u65B9 SHA-256 \u6307\u7EB9\u3002",
  "status.lanUrls": "\u6D4F\u89C8\u5668\u8BBF\u95EE",
  "status.noLanUrls": "\u6682\u65E0\u53EF\u7528\u7684\u5C40\u57DF\u7F51\u5730\u5740",
  "status.scan": "\u624B\u673A\u626B\u7801\u540E\u5728\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00\uFF0C\u4F7F\u7528\u8D26\u53F7\u5BC6\u7801\u767B\u5F55\u3002",
  "status.qrError": "\u4E8C\u7EF4\u7801\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u4F7F\u7528\u4E0A\u65B9\u94FE\u63A5\u3002",
  "nav": "\u5C40\u57DF\u7F51\u4EE3\u7406",
  "status.title": "\u8FD0\u884C\u72B6\u6001",
  "status.proxyPort": "\u4EE3\u7406\u670D\u52A1\u7AEF\u53E3",
  "status.proxyRunning": "\u8FD0\u884C\u4E2D",
  "status.proxyStopped": "\u672A\u8FD0\u884C",
  "status.targetPort": "\u9ED8\u8BA4\u670D\u52A1\u7AEF\u53E3",
  "status.targetReachable": "\u53EF\u8BBF\u95EE",
  "status.targetUnreachable": "\u4E0D\u53EF\u8BBF\u95EE",
  "status.username": "\u5F53\u524D\u7528\u6237\u540D",
  "status.auth": "\u5BC6\u7801\u767B\u5F55",
  "status.authOn": "\u5DF2\u542F\u7528",
  "status.authOff": "\u672A\u542F\u7528\uFF08\u5C40\u57DF\u7F51\u5F00\u653E\u8BBF\u95EE\uFF09",
  "status.persistedOn": "\u5B58\u5728\u5DF2\u4FDD\u5B58\u7684\u8FD0\u884C\u914D\u7F6E\uFF08\u4F18\u5148\u4E8E cordis \u914D\u7F6E\uFF09",
  "status.persistedOff": "\u4F7F\u7528 cordis \u914D\u7F6E",
  "status.loading": "\u52A0\u8F7D\u4E2D\u2026",
  "status.unreachable": "\u65E0\u6CD5\u8FDE\u63A5\u4EE3\u7406\u670D\u52A1\uFF0C\u8BF7\u786E\u8BA4\u63D2\u4EF6\u5DF2\u542F\u7528\u5E76\u91CD\u542F\u8FC7 dsh web\u3002",
  "status.retry": "\u91CD\u8BD5",
  "control.start": "\u542F\u52A8",
  "control.stop": "\u505C\u6B62",
  "control.started": "\u4EE3\u7406\u670D\u52A1\u5DF2\u542F\u52A8",
  "control.stopped": "\u4EE3\u7406\u670D\u52A1\u5DF2\u505C\u6B62",
  "control.failed": "\u64CD\u4F5C\u5931\u8D25",
  "control.startHintPort": "\u4EE3\u7406\u670D\u52A1\u672A\u80FD\u542F\u52A8\uFF0C\u8BF7\u5C1D\u8BD5\u66F4\u6362\u4EE3\u7406\u670D\u52A1\u7AEF\u53E3\uFF08\u5F53\u524D\u7AEF\u53E3\u53EF\u80FD\u5DF2\u88AB\u5360\u7528\uFF09\u3002",
  "form.title": "\u4FEE\u6539\u8BBE\u7F6E",
  "form.subtitle": "\u542F\u7528\u5BC6\u7801\u767B\u5F55\u540E\uFF0C\u6D4F\u89C8\u5668\u4F1A\u5F39\u51FA\u539F\u751F Basic Auth \u767B\u5F55\u6846\uFF1B\u4FDD\u5B58\u4FEE\u6539\u4F1A\u91CD\u542F\u8F6C\u53D1\u670D\u52A1\u3002",
  "form.listenPort": "\u4EE3\u7406\u670D\u52A1\u7AEF\u53E3\uFF08\u76D1\u542C\u7AEF\u53E3\uFF09",
  "form.listenPortHint": "1\u201365535",
  "form.username": "\u7528\u6237\u540D",
  "form.usernameHint": "\u6E05\u7A7A\u5373\u8BBE\u4E3A\u7A7A",
  "form.password": "\u5BC6\u7801",
  "form.passwordHint": "\u6E05\u7A7A\u5373\u8BBE\u4E3A\u7A7A\uFF1B\u7528\u6237\u540D\u4E0E\u5BC6\u7801\u9700\u540C\u65F6\u975E\u7A7A\u624D\u4F1A\u542F\u7528\u5BC6\u7801\u767B\u5F55",
  "form.showPassword": "\u663E\u793A\u5BC6\u7801",
  "form.hidePassword": "\u9690\u85CF\u5BC6\u7801",
  "form.save": "\u5E94\u7528",
  "form.saving": "\u5E94\u7528\u4E2D\u2026",
  "form.invalidPort": "\u7AEF\u53E3\u5FC5\u987B\u662F 1\u201365535 \u7684\u6574\u6570",
  "form.portConflict": "\u4EE3\u7406\u670D\u52A1\u7AEF\u53E3\u4E0D\u80FD\u4E0E\u9ED8\u8BA4\u670D\u52A1\u7AEF\u53E3\u76F8\u540C",
  "form.updated": "\u5DF2\u4FDD\u5B58\u5E76\u91CD\u542F\u8F6C\u53D1\u670D\u52A1",
  "form.updatedSaved": "\u5DF2\u4FDD\u5B58",
  "form.updatedPartial": "\u5DF2\u4FDD\u5B58\u5E76\u91CD\u542F\u8F6C\u53D1\u670D\u52A1\uFF08\u6CE8\u610F\uFF1A\u9700\u540C\u65F6\u8BBE\u7F6E\u7528\u6237\u540D\u548C\u5BC6\u7801\u624D\u4F1A\u542F\u7528\u5BC6\u7801\u767B\u5F55\uFF09",
  "form.updatedSavedPartial": "\u5DF2\u4FDD\u5B58\uFF08\u6CE8\u610F\uFF1A\u9700\u540C\u65F6\u8BBE\u7F6E\u7528\u6237\u540D\u548C\u5BC6\u7801\u624D\u4F1A\u542F\u7528\u5BC6\u7801\u767B\u5F55\uFF09",
  "form.updatedListenFailed": "\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u8F6C\u53D1\u670D\u52A1\u672A\u80FD\u542F\u52A8",
  "form.failed": "\u4FDD\u5B58\u5931\u8D25"
};
var en = {
  "status.ca": "Download Android CA certificate",
  "status.trust": "First use: install this CA certificate in Android settings, then scan the HTTPS code. Verify the SHA-256 fingerprint below.",
  "status.lanUrls": "Browser access",
  "status.noLanUrls": "No LAN address available",
  "status.scan": "Scan on your phone, open in a browser and sign in with your username and password.",
  "status.qrError": "QR code unavailable. Use the link above.",
  "nav": "LAN Proxy",
  "status.title": "Status",
  "status.proxyPort": "Proxy port",
  "status.proxyRunning": "Running",
  "status.proxyStopped": "Not running",
  "status.targetPort": "Default service port",
  "status.targetReachable": "Reachable",
  "status.targetUnreachable": "Unreachable",
  "status.username": "Username",
  "status.auth": "Password login",
  "status.authOn": "Enabled",
  "status.authOff": "Not enabled (open access)",
  "status.persistedOn": "A saved runtime config overrides the cordis config",
  "status.persistedOff": "Using the cordis config",
  "status.loading": "Loading\u2026",
  "status.unreachable": "Cannot reach the proxy service \u2014 make sure the plugin is enabled and dsh web was restarted.",
  "status.retry": "Retry",
  "control.start": "Start",
  "control.stop": "Stop",
  "control.started": "Proxy service started",
  "control.stopped": "Proxy service stopped",
  "control.failed": "Action failed",
  "control.startHintPort": "The proxy failed to start \u2014 try changing the proxy port (the current one may already be in use).",
  "form.title": "Edit settings",
  "form.subtitle": "With password login enabled, the browser shows its native Basic Auth dialog; saving restarts the forwarding service.",
  "form.listenPort": "Proxy port (listen)",
  "form.listenPortHint": "1\u201365535",
  "form.username": "Username",
  "form.usernameHint": "Empty to set blank",
  "form.password": "Password",
  "form.passwordHint": "Empty to set blank; password login requires BOTH username and password",
  "form.showPassword": "Show password",
  "form.hidePassword": "Hide password",
  "form.save": "Apply",
  "form.saving": "Applying\u2026",
  "form.invalidPort": "Port must be an integer between 1 and 65535",
  "form.portConflict": "Proxy port must differ from the default service port",
  "form.updated": "Saved and the forwarding service restarted",
  "form.updatedSaved": "Saved",
  "form.updatedPartial": "Saved and restarted (note: password login requires BOTH username and password)",
  "form.updatedSavedPartial": "Saved (note: password login requires BOTH username and password)",
  "form.updatedListenFailed": "Saved, but the forwarding service failed to start",
  "form.failed": "Save failed"
};

// src/client/styles.ts
var STYLE_ID = "dsh-lanproxy-style";
var cssText = `
.dsh_lanproxy_section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.dsh_lanproxy_heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.dsh_lanproxy_title {
  margin: 0;
  color: var(--dsw-alias-label-primary, #e6edf3);
  font-size: 18px;
  line-height: 26px;
  font-weight: 600;
}
.dsh_lanproxy_subtitle {
  margin: 0;
  color: var(--dsw-alias-label-tertiary, #8b949e);
  font-size: 13px;
  line-height: 20px;
}
.dsh_lanproxy_card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid var(--dsw-alias-border-l2, #30363d);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1, #161b22);
}
.dsh_lanproxy_cardTitle {
  color: var(--dsw-alias-label-primary, #e6edf3);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}
.dsh_lanproxy_cardHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}
.dsh_lanproxy_controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dsh_lanproxy_cardDesc {
  margin: -4px 0 0;
  color: var(--dsw-alias-label-tertiary, #8b949e);
  font-size: 12px;
  line-height: 18px;
}
.dsh_lanproxy_row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}
.dsh_lanproxy_rowLabel {
  color: var(--dsw-alias-label-secondary, #c9d1d9);
  font-size: 13px;
  line-height: 20px;
}
.dsh_lanproxy_rowValue {
  color: var(--dsw-alias-label-primary, #e6edf3);
  font-size: 13px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.dsh_lanproxy_portStatus {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.dsh_lanproxy_dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: none;
}
.dsh_lanproxy_dotOn {
  background: var(--dsw-alias-state-success-primary, #3fb950);
  box-shadow: 0 0 0 3px rgba(63, 185, 80, 0.2);
}
.dsh_lanproxy_dotOff {
  background: var(--dsw-alias-state-error-primary, #f85149);
  box-shadow: 0 0 0 3px rgba(248, 81, 73, 0.2);
}
.dsh_lanproxy_portValue {
  color: var(--dsw-alias-label-primary, #e6edf3);
  font-variant-numeric: tabular-nums;
}
.dsh_lanproxy_statusText {
  font-size: 12px;
  line-height: 18px;
}
.dsh_lanproxy_statusTextOn {
  color: var(--dsw-alias-state-success-primary, #3fb950);
}
.dsh_lanproxy_statusTextOff {
  color: var(--dsw-alias-state-error-primary, #f85149);
}
/* Badges: text color only, no tinted background (the user asked for the
   status text color without the red/green fill). */
.dsh_lanproxy_badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 18px;
  background: transparent;
}
.dsh_lanproxy_badgeOn {
  color: var(--dsw-alias-state-success-primary, #3fb950);
}
.dsh_lanproxy_badgeOff {
  color: var(--dsw-alias-state-error-primary, #f85149);
}
.dsh_lanproxy_form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}
.dsh_lanproxy_field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.dsh_lanproxy_fieldLabel {
  color: var(--dsw-alias-label-secondary, #c9d1d9);
  font-size: 13px;
  line-height: 20px;
}
.dsh_lanproxy_fieldHint {
  color: var(--dsw-alias-label-tertiary, #8b949e);
  font-size: 12px;
  line-height: 18px;
}
.dsh_lanproxy_input {
  box-sizing: border-box;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--dsw-alias-border-l2, #30363d);
  border-radius: 8px;
  /* bg-layer-0 does not exist in the design platform; bg-layer-2 is the
     token the harness itself uses for inputs and raised surfaces. */
  background: var(--dsw-alias-bg-layer-2, #21262d);
  color: var(--dsw-alias-label-primary, #e6edf3);
  font-size: 13px;
  line-height: 20px;
}
.dsh_lanproxy_input:focus {
  outline: none;
  border-color: var(--dsw-alias-accent, #2f81f7);
}
.dsh_lanproxy_passwordWrap {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
}
.dsh_lanproxy_passwordInput {
  padding-right: 36px;
}
.dsh_lanproxy_eye {
  position: absolute;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-tertiary, #8b949e);
  cursor: pointer;
}
.dsh_lanproxy_eye:hover {
  color: var(--dsw-alias-label-primary, #e6edf3);
  background: var(--dsw-alias-bg-layer-2, #21262d);
}
.dsh_lanproxy_eye svg {
  width: 16px;
  height: 16px;
}
.dsh_lanproxy_statusError {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}
.dsh_lanproxy_actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 2px;
}
/* Primary button (\u542F\u52A8 / \u5E94\u7528): filled accent with a visible border. */
.dsh_lanproxy_button {
  padding: 7px 14px;
  border: 1px solid var(--dsw-alias-accent, #2f81f7);
  border-radius: 8px;
  background: var(--dsw-alias-accent, #2f81f7);
  color: var(--dsw-alias-fg-on-accent, #ffffff);
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.dsh_lanproxy_button:hover:not(:disabled) {
  background: var(--dsw-alias-accent-hover, #388bfd);
  border-color: var(--dsw-alias-accent-hover, #388bfd);
}
.dsh_lanproxy_button:active:not(:disabled) {
  background: var(--dsw-alias-accent-active, #1f6feb);
  border-color: var(--dsw-alias-accent-active, #1f6feb);
}
.dsh_lanproxy_button:disabled {
  opacity: 0.5;
  cursor: default;
  border-color: var(--dsw-alias-border-l2, #30363d);
  background: var(--dsw-alias-bg-layer-2, #21262d);
  color: var(--dsw-alias-label-tertiary, #8b949e);
}
/* Secondary button (\u505C\u6B62): outline style with its own border. */
.dsh_lanproxy_buttonStop {
  background: var(--dsw-alias-bg-layer-1, #161b22);
  border: 1px solid var(--dsw-alias-border-l2, #30363d);
  color: var(--dsw-alias-label-primary, #e6edf3);
}
.dsh_lanproxy_buttonStop:hover:not(:disabled) {
  background: var(--dsw-alias-bg-layer-2, #21262d);
  border-color: var(--dsw-alias-label-tertiary, #8b949e);
}
.dsh_lanproxy_buttonStop:active:not(:disabled) {
  background: var(--dsw-alias-bg-layer-0, #0d1117);
}
.dsh_lanproxy_buttonStop:disabled {
  opacity: 0.5;
  cursor: default;
}
.dsh_lanproxy_message {
  margin: 0;
  color: var(--dsw-alias-state-success-primary, #3fb950);
  font-size: 13px;
  line-height: 20px;
}
.dsh_lanproxy_error {
  margin: 0;
  color: var(--dsw-alias-state-error-primary, #f85149);
  font-size: 13px;
  line-height: 20px;
}
.dsh_lanproxy_hint {
  margin: 0;
  color: var(--dsw-alias-label-tertiary, #8b949e);
  font-size: 12px;
  line-height: 18px;
}
`;
function adoptStyles() {
  if (document.getElementById(STYLE_ID) !== null) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = cssText;
  document.head.appendChild(style);
}

// src/client/index.ts
var inject = ["slots", "locale", "connection"];
function apply(ctx) {
  adoptStyles();
  console.info("[dsh-proxy] bundle loaded");
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-proxy: dictionaries");
  const t = ctx.locale.bind(NS);
  const connection = ctx.get("connection");
  const rpc = connection.rpc;
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "dsh-proxy",
    order: 70,
    label: () => t("nav"),
    locale: NS,
    inject: () => ({ rpc })
  }, SettingsSection));
}
return module.exports; } });
//# sourceMappingURL=client.js.map
