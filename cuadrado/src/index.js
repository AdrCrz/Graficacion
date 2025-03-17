"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvasLocal_js_1 = require("./canvasLocal.js");
var canvas;
var graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
var miCanvas = new canvasLocal_js_1.CanvasLocal(graphics, canvas);
miCanvas.paint();
