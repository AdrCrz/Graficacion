export class CanvasLocal {
  //atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth:number;
  protected rHeight:number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  
      
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.graphics = g;
    this.rWidth = 12;
    this.rHeight= 8;
    this.maxX = canvas.width - 1
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX/12;
    this.centerY = this.maxY/8*7;
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number):number{return Math.round(this.centerY - y / this.pixelSize); }
  
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  drawRmboide(x1: number, y1: number, x2: number, y2: number,
  x3:number, y3:number, x4:number, y4:number, color:string) {
  
    // Color de relleno
    this.graphics.fillStyle = color;
    // Comenzamos la ruta de dibujo, o path
    this.graphics.beginPath();
    // Mover a la esquina superior izquierda
    this.graphics.moveTo(x1, y1);
    // Dibujar la línea hacia la derecha
    this.graphics.lineTo(x2, y2);
    // Ahora la que va hacia abajo
    this.graphics.lineTo(x3, y3); // A 80 porque esa es la altura
    // La que va hacia la izquierda
    this.graphics.lineTo(x4, y4);
    // Y dejamos que la última línea la dibuje JS
    this.graphics.closePath();
    // Hacemos que se dibuje
    this.graphics.stroke();
    // Lo rellenamos
    this.graphics.fill();
  }

  fx(x:number):number {
    return Math.sin(x*2.5);
  }

  maxH(h: number[]): number{
    let max = h[0];
    for (let i = 1; i < h.length; i++) {
      if (max < h[i])
        max = h[i];
    }
    //
    let res:number;
    let pot: number = 10;
    //se calcula la potencia de 10 mayor al max para redondear el maximo de la grafica.
    while (pot<max) {
      pot *= 10;
    }
    pot /= 10;
    res = Math.ceil(max / pot) * pot;
    return res;
  }

  barra(x:number, y:number, alt:number):void{
        
    this.graphics.fillStyle   = 'rgba(61, 61, 63, 1)';
    this.graphics.beginPath();
    this.graphics.moveTo(this.iX(x - 0.5),this.iY(y + alt));
    this.graphics.lineTo(this.iX(x - 0.5),this.iY(this.rHeight - 2));
    this.graphics.lineTo(this.iX(x),this.iY(this.rHeight - 2.5));
    this.graphics.lineTo(this.iX(x),this.iY(y + alt - 0.5));
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    this.graphics.fillStyle   = 'rgba(77, 78, 80, 1)';
    this.graphics.beginPath();
    this.graphics.moveTo(this.iX(x + 0.5),this.iY(y + alt));
    this.graphics.lineTo(this.iX(x + 0.5),this.iY(this.rHeight - 2));
    this.graphics.lineTo(this.iX(x),this.iY(this.rHeight - 2.5));
    this.graphics.lineTo(this.iX(x),this.iY(y + alt - 0.5));
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    this.graphics.fillStyle   = 'rgba(90, 92, 96, 1)';
    this.graphics.beginPath();
    this.graphics.moveTo(this.iX(x - 0.5),this.iY(this.rHeight - 2));
    this.graphics.lineTo(this.iX(x),this.iY(this.rHeight - 1.5));
    this.graphics.lineTo(this.iX(x + 0.5),this.iY(this.rHeight - 2));
    this.graphics.lineTo(this.iX(x),this.iY(this.rHeight - 2.5));
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    // Original lines (many of these seem redundant with the filled paths above, but kept for consistency)
    this.drawLine(this.iX(x), this.iY(0), this.iX(x - 0.5), this.iY(0.5));
    this.drawLine(this.iX(x - 0.5), this.iY(0.5), this.iX(x - 0.5), this.iY(y + alt));
    this.drawLine(this.iX(x - 0.5), this.iY(y + alt), this.iX(x), this.iY(y + alt - 0.5));
    this.drawLine(this.iX(x + 0.5), this.iY(y + alt), this.iX(x), this.iY(y + alt + 0.5));
    this.drawLine(this.iX(x - 0.5), this.iY(y + alt), this.iX(x), this.iY(y + alt + 0.5));
    this.drawLine(this.iX(x), this.iY(y + alt - 0.5), this.iX(x), this.iY(y + alt + 0.5));
    this.drawLine(this.iX(x), this.iY(y + alt - 0.5), this.iX(x + 0.5), this.iY(y + alt));
    this.drawLine(this.iX(x + 0.5), this.iY(y + alt), this.iX(x + 0.5), this.iY(0.5));
    this.drawLine(this.iX(x + 0.5), this.iY(0.5), this.iX(x), this.iY(0));
    this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(y + alt - 0.1));
    

    this.graphics.fillStyle = 'rgba(194, 64, 100, 1)';
    this.graphics.beginPath();
    this.graphics.moveTo( this.iX(x),       this.iY(0)           );
    this.graphics.lineTo( this.iX(x - 0.5), this.iY(0.5)         );
    this.graphics.lineTo( this.iX(x - 0.5), this.iY(y + alt)     );
    this.graphics.lineTo( this.iX(x),       this.iY(y + alt - 0.5) );
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    this.graphics.fillStyle = 'rgba(228, 100, 125, 1)';
    this.graphics.beginPath();
    this.graphics.moveTo( this.iX(x),       this.iY(0)           );
    this.graphics.lineTo( this.iX(x),       this.iY(y + alt - 0.5) );
    this.graphics.lineTo( this.iX(x + 0.5), this.iY(y + alt)     );
    this.graphics.lineTo( this.iX(x + 0.5), this.iY(0.5)         );
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    this.graphics.fillStyle = 'rgba(220, 102, 129, 1)';
    this.graphics.beginPath();
    this.graphics.moveTo( this.iX(x - 0.5), this.iY(y + alt)     );
    this.graphics.lineTo( this.iX(x),       this.iY(y + alt - 0.5) );
    this.graphics.lineTo( this.iX(x),       this.iY(y + alt + 0.5) );
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();

    this.graphics.fillStyle = 'rgba(230, 150, 170, 1)';
    this.graphics.beginPath();
    this.graphics.moveTo( this.iX(x + 0.5), this.iY(y + alt)     );
    this.graphics.lineTo( this.iX(x),       this.iY(y + alt + 0.5) );
    this.graphics.lineTo( this.iX(x),       this.iY(y + alt - 0.5) );
    this.graphics.closePath();
    this.graphics.fill();
    this.graphics.stroke();
    
    const x1_rhomboid = x - 0.5;
    const y1_rhomboid = 0.5;
    const x2_rhomboid = x;
    const y2_rhomboid = 0;
    const dx = 0.9;
    const dyIzq = 0.2;
    const dyCen = 0.2;
    const x3_rhomboid = x2_rhomboid - dx;
    const y3_rhomboid = y2_rhomboid - dyCen;
    const x4_rhomboid = x1_rhomboid - dx;
    const y4_rhomboid = y1_rhomboid - dyIzq;
    this.drawRmboide(
        this.iX(x1_rhomboid), this.iY(y1_rhomboid), 
        this.iX(x2_rhomboid), this.iY(y2_rhomboid), 
        this.iX(x3_rhomboid), this.iY(y3_rhomboid), 
        this.iX(x4_rhomboid), this.iY(y4_rhomboid), 
        'rgba(194, 64, 100, 0.3)' 
    );
    this.graphics.strokeStyle = 'black';
  }

  paint(h: number[] = [10, 30, 80, 50]) { // Added default parameter for h
    const maxEsc = 100; // This was hardcoded in canvasLocal.js, so keeping it
    const colors = ['black']; // This was hardcoded in canvasLocal.js, so keeping it

    let i = 0;
    for (let x = 0; x < 8; x += (10 / h.length)) { // Loop condition changed from 8/(h.length*1) to 10/h.length
        this.graphics.strokeStyle = colors[i % colors.length];
        let valor = h[i];
        if (valor >= 0 && valor <= 100) { // Condition from canvasLocal.js
            this.barra(x, 0, valor * (this.rHeight - 2) / maxEsc);
        } else {
            this.barra(x, 0, 0); // Handles values outside 0-100 as per canvasLocal.js
        }
        i++;
    }
  }
}
