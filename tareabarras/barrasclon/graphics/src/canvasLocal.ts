
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
    this.drawLine(this.iX(x), this.iY(0), this.iX(x-0.5), this.iY(0.5));
    this.drawLine(this.iX(x-0.5), this.iY(0.5), this.iX(x-0.5), this.iY(y+alt));
    this.drawLine(this.iX(x-0.5), this.iY(y+alt), this.iX(x), this.iY(y+alt-0.5));
    this.drawLine(this.iX(x), this.iY(y+alt-0.5), this.iX(x+0.5), this.iY(y+alt));
    this.drawLine(this.iX(x+0.5), this.iY(y+alt), this.iX(x+0.5), this.iY(0.5));
    this.drawLine(this.iX(x+0.5), this.iY(0.5), this.iX(x), this.iY(0));
    this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(y+alt-0.5));
    this.graphics.strokeStyle = 'gray';
    this.drawLine(this.iX(x-0.5), this.iY(y+alt), this.iX(x-0.5), this.iY(this.rHeight-2));
    this.drawLine(this.iX(x), this.iY(y+alt-0.5), this.iX(x), this.iY(this.rHeight-2.5));
    this.drawLine(this.iX(x+0.5), this.iY(y+alt), this.iX(x+0.5), this.iY(this.rHeight-2));
    this.drawLine(this.iX(x-0.5), this.iY(this.rHeight-2), this.iX(x), this.iY(this.rHeight-1.5));
    this.drawLine(this.iX(x+0.5), this.iY(this.rHeight-2), this.iX(x), this.iY(this.rHeight-1.5));
    this.drawLine(this.iX(x-0.5), this.iY(this.rHeight-2), this.iX(x), this.iY(this.rHeight-2.5));
    this.drawLine(this.iX(x+0.5), this.iY(this.rHeight-2), this.iX(x), this.iY(this.rHeight-2.5));
    this.graphics.strokeStyle = 'black';
  }


  paint() {
    
    //let h: number[] = [20, 100, 160, 420];
    //let h: number[] = [1150, 1780, 860, 1260, 1500];
    let h: number[] = [27, 10, 16,90,50,75];
    let maxEsc: number;
    let colors: string[]= ['magenta', 'red', 'green', 'yellow'];

    maxEsc = this.maxH(h);
    let i=0;
    for(let x= 0; x < 8; x+=(8/(h.length*1)) ){
      this.graphics.strokeStyle = colors[i%4];
      if(i<h.length)
        this.barra(x,0, h[i++]*(this.rHeight-2)/maxEsc);
    }
    i=0;
    for (let x = 0; x < 8; x += (8/(h.length*1)) ){
      this.graphics.strokeStyle = colors[i%4];
      if(i<h.length)
        this.graphics.strokeText(h[i++]+"", this.iX(x), this.iY(-0.5));
    }
    
/*
    this.barra(3,0, 10*(this.rHeight-2)/maxEsc);

    this.barra(5,0, 16*(this.rHeight-2)/maxEsc);
    this.barra(7,0, 2*(this.rHeight-2)/maxEsc);
    /*this.graphics.strokeStyle = 'black';
    this.drawLine(this.iX(0), this.iY(0), this.iX(8), this.iY(0));
    this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(6));
    //las 6 unidades se dividen entre 4 periodos de lineas cada una 
    //representara una escala de 1/4 del total maximo
    let i = 0;
    for (let y = 0.6; y <= 6; y += 1.35){
      this.drawLine(this.iX(0.6), this.iY(y), this.iX(8), this.iY(y));
      this.drawLine(this.iX(0), this.iY(y - 0.6), this.iX(0.6), this.iY(y));
      this.graphics.strokeText((maxEsc*i/4)+"",this.iX(-0.5), this.iY(y-0.7));
      i++;
    }
    this.graphics.strokeStyle = 'black';
    let ind = 0;
    for (let i = 0.5; i <=8; i += 2){
      //this.graphics.strokeStyle = colors[ind];
      this.graphics.fillStyle = colors[ind];
      //console.log(this.rHeight*h[ind]/maxEsc)
      this.drawLine(this.iX(i), this.iY(6 * h[ind] / maxEsc-0.1), this.iX(i), this.iY(0));
      this.graphics.fillRect(this.iX(i), this.iY(6 * h[ind] / maxEsc-0.1), this.iX(2) - this.iX(1), this.iY(0.2) - this.iY(6 * h[ind] / maxEsc ));
      this.drawRmboide(this.iX(i + 0.3), this.iY(6 * h[ind] / maxEsc + 0.2), this.iX(i + 1.3), this.iY(6 * h[ind] / maxEsc + 0.2),
                      this.iX(i + 1), this.iY(6 * h[ind] / maxEsc-0.1), this.iX(i), this.iY(6 * h[ind] / maxEsc-0.1), colors[ind]);
      this.drawRmboide(this.iX(i + 1), this.iY(6 * h[ind] / maxEsc-0.1), this.iX(i + 1.3), this.iY(6 * h[ind] / maxEsc + 0.2),
                      this.iX(i+1.3), this.iY(0.4), this.iX(i+1), this.iY(0.1), colors[ind]) ;
      ind++;
    }
    ind=0
    for (let x = 0; x < 8; x += 2) {
      this.graphics.strokeText(colors[ind++], this.iX(x+0.5), this.iY(-0.5));
    }

    for (let y = 0; y< h.length; y++) {
      this.graphics.strokeText(colors[y], this.iX(9), this.iY(5 - y));
      this.graphics.fillStyle = colors[y];
      this.graphics.fillRect(this.iX(8.5), this.iY(5 - y), 10, 10);
    }*/
    
  }

}