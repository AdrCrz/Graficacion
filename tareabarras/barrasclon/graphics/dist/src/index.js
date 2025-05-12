import { CanvasLocal } from './canvasLocal.js';

let canvas = document.getElementById('circlechart');
let graphics = canvas.getContext('2d');
const miCanvas = new CanvasLocal(graphics, canvas);

// :3
function getHValues() {
    const inputs = document.querySelectorAll('#h-inputs input');
    return Array.from(inputs).map(input => {
        let val = parseFloat(input.value);
        return (val >= 10 && val <= 100) ? val : 0;
    });
}

function draw() {
    graphics.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas
    miCanvas.paint(getHValues());
}

const inputElements = document.querySelectorAll('#h-inputs input');
inputElements.forEach(input => {
    input.addEventListener('input', draw);
});

draw();
