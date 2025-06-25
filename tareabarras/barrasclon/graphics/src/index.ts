import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

const miCanvas: CanvasLocal = new CanvasLocal(graphics, canvas);

function getHValues(): number[] {
    const inputs = document.querySelectorAll('#h-inputs input');
    return Array.from(inputs).map(input => {
        let val = parseFloat(input.value);
        return (val >= 10 && val <= 100) ? val : 0; 
    });
}
function draw(): void {
    graphics.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    miCanvas.paint(getHValues());
}
const inputElements = document.querySelectorAll('#h-inputs input');
inputElements.forEach(input => {
    input.addEventListener('input', draw);
});
draw();
