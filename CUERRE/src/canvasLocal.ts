export class GF256 {
  gfExp: number[];
  gfLog: number[];
  primitive: number;

  constructor(primitive: number = 0x11D) {
      this.primitive = primitive;
      this.gfExp = new Array(256).fill(0);
      this.gfLog = new Array(256).fill(0);
      let x = 1;
      for (let i = 0; i < 255; i++) {
          this.gfExp[i] = x;
          this.gfLog[x] = i;
          x <<= 1;
          if (x & 0x100) {
              x ^= primitive;
          }
      }
      this.gfExp[255] = 1;
  }

  multiply(a: number, b: number): number {
      if (a === 0 || b === 0) {
          return 0;
      }
      const logA = this.gfLog[a];
      const logB = this.gfLog[b];
      let sumLog = logA + logB;
      if (sumLog >= 255) {
          sumLog -= 255;
      }
      return this.gfExp[sumLog];
  }

  inverse(a: number): number {
      if (a === 0) throw new Error("Inverse of 0 is undefined");
      return this.gfExp[255 - this.gfLog[a]];
  }

  polyMultiply(p1: number[], p2: number[]): number[] {
      const result = new Array(p1.length + p2.length - 1).fill(0);
      for (let j = 0; j < p2.length; j++) {
          for (let i = 0; i < p1.length; i++) {
              result[i + j] ^= this.multiply(p1[i], p2[j]);
          }
      }
      return result;
  }

  polyDivide(dividend: number[], divisor: number[]): number[] {
      let remainder = [...dividend];
      const divisorLeadTerm = divisor[0];
      const divisorLength = divisor.length;

      for (let i = 0; i <= remainder.length - divisorLength; i++) {
          const factor = this.multiply(remainder[i], this.inverse(divisorLeadTerm));
          for (let j = 0; j < divisorLength; j++) {
              remainder[i + j] ^= this.multiply(divisor[j], factor);
          }
      }
      const numEcc = divisorLength - 1;
      return remainder.slice(remainder.length - numEcc);
  }

  static generateGeneratorPolynomial(gf: GF256, numEccCodewords: number): number[] {
      let g = [1];
      for (let i = 0; i < numEccCodewords; i++) {
          g = gf.polyMultiply(g, [1, gf.gfExp[i]]);
      }
      return g;
  }
}

export class CanvasLocal {
  protected graphics: CanvasRenderingContext2D;
  protected modules: number;
  protected maxX: number;
  protected maxY: number;
  protected modulePx: number;
  protected offsetX: number;
  protected offsetY: number;
  protected gf: GF256;

  private alwaysZero: number[];
  private alwaysOne: number[];
  private infoReserved: number[];
  private D: { [key: string]: number[] };
  private E: { [key: string]: number[] };
  private Vi: number[];
  private dataAndEccIndices: Set<number>;

  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      this.graphics = g;
      this.modules = 25;
      this.maxX = canvas.width;
      this.maxY = canvas.height;
      this.modulePx = Math.floor(Math.min(this.maxX, this.maxY) / this.modules);
      this.offsetX = (this.maxX - this.modulePx * this.modules) / 2;
      this.offsetY = (this.maxY - this.modulePx * this.modules) / 2;

      this.gf = new GF256();

      this.alwaysZero = [
          7, 32, 57, 82, 107, 132, 157, 182, 175, 176, 177, 178, 179, 180, 181,
          17, 42, 57, 92, 117, 142, 157, 192, 193, 194, 195, 196, 197, 198, 199,
          425, 426, 427, 428, 429, 430, 431, 432, 457, 482, 507, 532, 557, 582, 607,
          159, 161, 163, 165, 167, 231, 281, 331, 381
      ];
      this.alwaysOne = [433];
      this.infoReserved = [
          200, 201, 202, 203, 204, 205, 207, 208, 183, 199, 108, 83, 58, 33, 8,
          217, 218, 219, 220, 221, 222, 223, 224, 458, 483, 508, 533, 558, 583, 608
      ];
      this.D = {
          D1: [624, 623, 599, 598, 574, 573, 549, 548], D2: [524, 523, 499, 498, 474, 473, 449, 448],
          D3: [424, 423, 399, 398, 374, 373, 349, 348], D4: [324, 323, 299, 298, 274, 273, 249, 248],
          D5: [247, 246, 272, 271, 297, 296, 322, 321], D6: [347, 346, 372, 371, 397, 396, 422, 421],
          D7: [447, 446, 472, 471, 497, 496, 522, 521], D8: [547, 546, 572, 571, 597, 596, 622, 621],
          D9: [620, 619, 595, 594, 570, 569, 545, 544], D10: [395, 394, 370, 369, 345, 344, 320, 319],
          D11: [295, 294, 270, 269, 245, 244, 243, 242], D12: [268, 267, 293, 292, 318, 317, 343, 342],
          D13: [368, 367, 393, 392, 543, 542, 568, 567], D14: [593, 592, 618, 617, 616, 615, 591, 590],
          D15: [566, 565, 541, 540, 515, 490, 465, 440], D16: [415, 391, 390, 366, 365, 341, 340, 316],
          D17: [315, 291, 290, 266, 265, 241, 240, 216], D18: [215, 191, 190, 141, 140, 116, 115, 91],
          D19: [90, 66, 65, 41, 40, 16, 15, 14], D20: [13, 39, 38, 64, 63, 89, 88, 114],
          D21: [113, 139, 138, 189, 188, 214, 213, 239], D22: [238, 264, 263, 289, 288, 314, 313, 339],
          D23: [338, 364, 363, 389, 388, 414, 413, 439], D24: [438, 464, 463, 489, 488, 514, 513, 539],
          D25: [538, 564, 563, 589, 588, 614, 613, 612], D26: [611, 587, 586, 562, 561, 537, 536, 512],
          D27: [511, 487, 486, 462, 461, 437, 436, 412], D28: [411, 387, 386, 362, 361, 337, 336, 312]
      };
      this.E = {
          E1: [311, 287, 286, 262, 261, 237, 236, 212], E2: [211, 187, 186, 137, 136, 112, 111, 87],
          E3: [86, 62, 61, 37, 36, 12, 11, 10], E4: [9, 35, 34, 60, 59, 85, 84, 110],
          E5: [109, 135, 134, 185, 184, 210, 209, 235], E6: [234, 260, 259, 285, 284, 310, 309, 335],
          E7: [334, 360, 359, 385, 384, 410, 409, 435], E8: [434, 460, 459, 485, 484, 510, 509, 535],
          E9: [534, 560, 559, 585, 584, 610, 609, 408], E10: [407, 383, 382, 358, 357, 333, 332, 308],
          E11: [307, 283, 282, 258, 257, 233, 232, 230], E12: [229, 255, 254, 280, 279, 305, 304, 330],
          E13: [329, 355, 354, 380, 379, 405, 404, 403], E14: [402, 378, 377, 353, 352, 328, 327, 303],
          E15: [302, 278, 277, 253, 252, 228, 227, 226], E16: [225, 251, 250, 276, 275, 301, 300, 326]
      };
      this.Vi = [325, 351, 350, 376, 375, 401, 400];

      this.dataAndEccIndices = new Set();
      Object.values(this.D).forEach(arr => arr.forEach(idx => this.dataAndEccIndices.add(idx)));
      Object.values(this.E).forEach(arr => arr.forEach(idx => this.dataAndEccIndices.add(idx)));
  }

  mX(i: number): number { return this.offsetX + i * this.modulePx; }
  mY(j: number): number { return this.offsetY + j * this.modulePx; }

  drawModule(i: number, j: number, isBlack: boolean): void {
      this.graphics.fillStyle = isBlack ? '#000' : '#fff';
      this.graphics.fillRect(this.mX(i), this.mY(j), this.modulePx, this.modulePx);
  }

  clearCanvas(): void {
      this.graphics.fillStyle = '#fff';
      this.graphics.fillRect(0, 0, this.maxX, this.maxY);
  }

  createBaseMatrix(): number[][] {
      const N = this.modules;
      let mat: number[][] = Array.from({ length: N }, () => Array(N).fill(2));

      const finder: number[][] = [
          [1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1],
          [1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1]
      ];

      const placeFinder = (x0: number, y0: number): void => {
          for (let dy = 0; dy < 7; dy++) {
              for (let dx = 0; dx < 7; dx++) {
                  mat[y0 + dy][x0 + dx] = finder[dy][dx];
              }
          }
          for (let i = -1; i < 8; i++) {
              if (y0 > 0 && (x0 + i >= 0) && (x0 + i < N)) mat[y0 - 1][x0 + i] = 0;
              if (y0 + 7 < N && (x0 + i >= 0) && (x0 + i < N)) mat[y0 + 7][x0 + i] = 0;
          }
          for (let i = 0; i < 7; i++) {
              if (x0 > 0 && (y0 + i >= 0) && (y0 + i < N)) mat[y0 + i][x0 - 1] = 0;
              if (x0 + 7 < N && (y0 + i >= 0) && (y0 + i < N)) mat[y0 + i][x0 + 7] = 0;
          }
      };

      placeFinder(0, 0);
      placeFinder(N - 7, 0);
      placeFinder(0, N - 7);

      const alignPattern: number[][] = [
          [1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]
      ];
      const alignX0 = N - 7 - 2;
      const alignY0 = N - 7 - 2;
      if (N >= 25) {
          for (let dy = 0; dy < 5; dy++) {
              for (let dx = 0; dx < 5; dx++) {
                  mat[alignY0 + dy][alignX0 + dx] = alignPattern[dy][dx];
              }
          }
      }

      for (let i = 8; i < N - 8; i++) {
          mat[6][i] = (i % 2 === 0) ? 1 : 0;
          mat[i][6] = (i % 2 === 0) ? 1 : 0;
      }

      for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
              if (mat[r][c] === 2) mat[r][c] = 0;
          }
      }
      return mat;
  }

  applyAlwaysZero(mat: number[][]): void {
      const N = this.modules;
      this.alwaysZero.forEach(idx => {
          const i = idx % N;
          const j = Math.floor(idx / N);
          if (j >= 0 && j < N && i >= 0 && i < N) mat[j][i] = 0;
      });
  }

  applyAlwaysOne(mat: number[][]): void {
      const N = this.modules;
      this.alwaysOne.forEach(idx => {
          const i = idx % N;
          const j = Math.floor(idx / N);
          if (j >= 0 && j < N && i >= 0 && i < N) mat[j][i] = 1;
      });
  }

  getFormatInfoBits(): number[] {
      return "111011110101110".split('').map(b => +b);
  }

  applyFormatInformation(mat: number[][], formatBits: number[]): void {
      const N = this.modules;
      const formatPos1 = [
          [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
      ];
      const formatPos2 = [
          [N - 1, 8], [N - 2, 8], [N - 3, 8], [N - 4, 8], [N - 5, 8], [N - 6, 8], [N - 7, 8], [N - 8, 8],
          [8, N - 7], [8, N - 6], [8, N - 5], [8, N - 4], [8, N - 3], [8, N - 2], [8, N - 1]
      ];

      for (let k = 0; k < 15; k++) {
          const [x1, y1] = formatPos1[k];
          if (y1 >= 0 && y1 < N && x1 >= 0 && x1 < N) mat[y1][x1] = formatBits[k];

          const [x2, y2] = formatPos2[k];
          if (y2 >= 0 && y2 < N && x2 >= 0 && x2 < N) mat[y2][x2] = formatBits[k];
      }
  }

  generateEcc(dataCodewords: number[], numEccCodewords: number): number[] {
      const generatorPoly = GF256.generateGeneratorPolynomial(this.gf, numEccCodewords);
      const messagePoly = [...dataCodewords];
      for (let i = 0; i < numEccCodewords; i++) {
          messagePoly.push(0);
      }
      return this.gf.polyDivide(messagePoly, generatorPoly);
  }

  applyMaskPattern(mat: number[][]): void {
      const N = this.modules;
      for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
              const linearIndex = r * N + c;
              if (this.dataAndEccIndices.has(linearIndex)) {
                  if ((r + c) % 2 === 0) {
                      mat[r][c] = mat[r][c] === 1 ? 0 : 1;
                  }
              }
          }
      }
  }

  generateQRCode(url: string): void {
      this.clearCanvas();
      const N = this.modules;
      let mat = this.createBaseMatrix();

      let dataBits: number[] = [];
      dataBits.push(0, 1, 0, 0);
      const urlLen = url.length;
      for (let i = 7; i >= 0; i--) dataBits.push((urlLen >> i) & 1);
      for (let char of url) {
          const charCode = char.charCodeAt(0);
          for (let i = 7; i >= 0; i--) dataBits.push((charCode >> i) & 1);
      }

      const numDataCodewords = Object.keys(this.D).length;
      const dataCapacityBits = numDataCodewords * 8;

      if (dataBits.length > dataCapacityBits) {
          for (let y = 0; y < N; y++) {
              for (let x = 0; x < N; x++) {
                  this.drawModule(x, y, (x + y) % 2 === 0);
              }
          }
          return;
      }

      if (dataBits.length + 4 <= dataCapacityBits) dataBits.push(0, 0, 0, 0);
      else while (dataBits.length < dataCapacityBits && dataBits.length % 8 !== 0) dataBits.push(0);

      while (dataBits.length % 8 !== 0) dataBits.push(0);

      const padBytes: number[][] = [[1, 1, 1, 0, 1, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1]];
      let padIdx = 0;
      while (dataBits.length < dataCapacityBits) {
          dataBits.push(...padBytes[padIdx % 2]);
          padIdx++;
      }

      let dataCodewords: number[] = [];
      for (let i = 0; i < dataBits.length; i += 8) {
          let byte = 0;
          for (let j = 0; j < 8; j++) {
              if (dataBits[i + j] === 1) {
                  byte |= (1 << (7 - j));
              }
          }
          dataCodewords.push(byte);
      }

      const numEccCodewords = Object.keys(this.E).length;
      const eccCodewords = this.generateEcc(dataCodewords, numEccCodewords);

      let eccBits: number[] = [];
      eccCodewords.forEach(byte => {
          for (let i = 7; i >= 0; i--) {
              eccBits.push((byte >> i) & 1);
          }
      });

      let bitStreamIndex = 0;
      for (const dArray of Object.values(this.D)) {
          for (const cellLinearIndex of dArray) {
              const val = (bitStreamIndex < dataBits.length) ? dataBits[bitStreamIndex] : 0;
              mat[Math.floor(cellLinearIndex / N)][cellLinearIndex % N] = val;
              bitStreamIndex++;
          }
      }

      bitStreamIndex = 0;
      for (const eArray of Object.values(this.E)) {
          for (const cellLinearIndex of eArray) {
              const val = (bitStreamIndex < eccBits.length) ? eccBits[bitStreamIndex] : 0;
              mat[Math.floor(cellLinearIndex / N)][cellLinearIndex % N] = val;
              bitStreamIndex++;
          }
      }

      this.applyMaskPattern(mat);

      const formatBits = this.getFormatInfoBits();
      this.applyFormatInformation(mat, formatBits);

      this.Vi.forEach(idx => {
          mat[Math.floor(idx / N)][idx % N] = 0;
      });

      this.applyAlwaysZero(mat);
      this.applyAlwaysOne(mat);

      for (let y = 0; y < N; y++) {
          for (let x = 0; x < N; x++) {
              this.drawModule(x, y, mat[y][x] === 1);
          }
      }
  }

  paint(): void {
      this.clearCanvas();
      const mat = this.createBaseMatrix();
      const formatBits = this.getFormatInfoBits();
      this.applyFormatInformation(mat, formatBits);
      this.Vi.forEach(idx => {
          mat[Math.floor(idx / this.modules)][idx % this.modules] = 0;
      });
      this.applyAlwaysZero(mat);
      this.applyAlwaysOne(mat);
      for (let y = 0; y < this.modules; y++) {
          for (let x = 0; x < this.modules; x++) {
              this.drawModule(x, y, mat[y][x] === 1);
          }
      }
  }
}
