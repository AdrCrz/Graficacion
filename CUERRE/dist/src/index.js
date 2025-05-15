import { CanvasLocal } from './canvasLocal.js';

let canvas = document.getElementById('circlechart');
let graphics = canvas.getContext('2d');
const miCanvas = new CanvasLocal(graphics, canvas);

 

const generateBtn = document.getElementById('generateBtn');
const urlInput = document.getElementById('urlInput');

generateBtn.addEventListener('click', () => {
    const url = urlInput.value;
    if (url && url.trim() !== "") {
        miCanvas.generateQRCode(url.trim());
    }
});
