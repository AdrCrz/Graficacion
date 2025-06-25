import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d')!;

const miCanvas: CanvasLocal = new CanvasLocal(graphics, canvas);

const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const urlInput = document.getElementById('urlInput') as HTMLInputElement;

generateBtn.addEventListener('click', () => {
    const url = urlInput.value;
    if (url && url.trim() !== "") {
        miCanvas.generateQRCode(url.trim());
    }
});
