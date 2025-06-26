
//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './Point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvHLines;
let obj: Obj3D;
let ang: number=0;

function leerArchivo(e:any) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      //sDir = sDir1;
      cv = new CvHLines(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido:any) {
  var elemento = document.getElementById('contenido-archivo');
  //
  //readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta:number, dPhi:number, fRho:number):void{  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  }
  else
    alert('aun no has leido un archivo');
}

function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}
let elevatorPosition: number = 0;
const MAX_CLICKS = 9;
function subirElevador() {
  if (elevatorPosition < MAX_CLICKS) {
    let dz = 0.99;
    for (let i = 88; i <= 110; i++) {
      obj.w[i].z += dz;
    }
    
    for (let i = 617; i <= 629; i++) {
      obj.w[i].z += dz;
    }
    elevatorPosition++;
    cv.setObj(obj);
    cv.paint();
  }
}
function bajarElevador() {
  if (elevatorPosition > 0) {
    let dz = -0.99;
    for (let i = 88; i <= 110; i++) {
      obj.w[i].z += dz;
    }
    
    for (let i = 617; i <= 629; i++) {
      obj.w[i].z += dz;
    }
    elevatorPosition--;
    cv.setObj(obj);
    cv.paint();
  }
}
function girarManecillaChicaHoraria() {
  if (!obj || !obj.w[385] || !obj.w[630]) {
    return;
  }
  let af = 5; 
  Rota3D.initRotate(obj.w[385], obj.w[630], af * Math.PI / 180);
  obj.w[386] = Rota3D.rotate(obj.w[386]);

  cv.setObj(obj);
  cv.paint();
}
function girarManecillaGrandeHoraria() {
  if (!obj || !obj.w[385] || !obj.w[630]) {
    return;
  }
  let af = 5; 
  Rota3D.initRotate(obj.w[385], obj.w[630], af * Math.PI / 180);
  obj.w[387] = Rota3D.rotate(obj.w[387]);
  cv.setObj(obj);
  cv.paint();
}
let leftCurtainPosition: number = 0; 
let rightCurtainPosition: number = 0; 
const MAX_CURTAIN_CLICKS = 9; 
function moverCortinaIzquierda() {
  if (leftCurtainPosition < MAX_CURTAIN_CLICKS) {
  let dx = -0.1;
  for (let i = 635; i <= 638; i++) {
  obj.w[i].x += dx;
  }
  leftCurtainPosition++;
  cv.setObj(obj);
  cv.paint();
  }
  }
  function cerrarCortinaIzquierda() {
  if (leftCurtainPosition > 0) {
  let dx = 0.1;
  for (let i = 635; i <= 638; i++) {
  obj.w[i].x += dx;
  }
  leftCurtainPosition--;
  cv.setObj(obj);
  cv.paint();
  }
  }
  function moverCortinaDerecha() {
  if (rightCurtainPosition < MAX_CURTAIN_CLICKS) {
  let dx = 0.1;
  for (let i = 631; i <= 634; i++) {
  obj.w[i].x += dx;
  }
  rightCurtainPosition++;
  cv.setObj(obj);
  cv.paint();
  }
  }
  function cerrarCortinaDerecha() {
  if (rightCurtainPosition > 0) {
  let dx = -0.1;
  for (let i = 631; i <= 634; i++) {
  obj.w[i].x += dx;
  }
  rightCurtainPosition--;
  cv.setObj(obj);
  cv.paint();
  }
  }

function abrirTodasCortinas() {
  moverCortinaIzquierda();
  moverCortinaDerecha();
}

function cerrarTodasCortinas() {
  cerrarCortinaIzquierda();
  cerrarCortinaDerecha();
}
function girarSillonDerecha() {
  
  if (!obj || !obj.w[229] || !obj.w[261]) {
    return;
  }
  let af = 15; 
  Rota3D.initRotate(obj.w[229], obj.w[261], af * Math.PI / 180);
  for (let i = 214; i <= 264; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cv.setObj(obj); 
  cv.paint();    
}
function girarSillonIzquierda() {
  if (!obj || !obj.w[229] || !obj.w[261]) {
    return;
  }
  let af = -15; 
  Rota3D.initRotate(obj.w[229], obj.w[261], af * Math.PI / 180);
  for (let i = 214; i <= 264; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cv.setObj(obj); 
  cv.paint();     
}




document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);


//movimiento de piezas
document.getElementById('subirElevador').addEventListener('click', subirElevador, false);
document.getElementById('bajarElevador').addEventListener('click', bajarElevador, false);
document.getElementById('girarManecillaChica').addEventListener('click', girarManecillaChicaHoraria, false);
document.getElementById('girarManecillaGrande').addEventListener('click', girarManecillaGrandeHoraria, false);
document.getElementById('abrirTodasCortinas').addEventListener('click', abrirTodasCortinas, false);
document.getElementById('cerrarTodasCortinas').addEventListener('click', cerrarTodasCortinas, false);
document.getElementById('girarSillonDerecha').addEventListener('click', girarSillonDerecha, false);
document.getElementById('girarSillonIzquierda').addEventListener('click', girarSillonIzquierda, false);





let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix=evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    //console.log(Pfx, Pfy)
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
    vp(0, 0.1 * difY / 50, 1);
    Piy = Pfy;
    vp(0.1 * difX, 0 / 50, 1);
    Pix = Pfx;
    /*if( Piy>Pfy+1 ){
      phi += SensibilidadY;
      vp(0, 0.1*, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }

    if(Pfy>Piy+1){
      phi -= SensibilidadY;
      vp(0,-0.1, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }*/

    /*if (Pix > Pfx + 1) {
      theta += SensibilidadX;
      vp(0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }
        
    if (Pfx > Pix + 1) {
      theta -= SensibilidadX;
      vp(-0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }*/
  }
}

function noDraw() {
  flag = false;
}

canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);