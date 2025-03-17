export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 6;
        this.rHeight = 4;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    /*fx(x:number):number {
      return Math.sin(x*2.5);
    }*/
    paint() {
        //this.drawLine(100.5,100, 500,100.5);
        //this.drawLine(500, 100, 300, 400);
        //this.drawLine(300, 400, 100,100);
        //this.drawLine(this.iX(-3), this.iY(0), this.iX(3), this.iY(0));
        //this.drawLine(this.iX(0), this.iY(2), this.iX(0), this.iY(-2));
        this.drawLine(100, 100, 500, 100);
        this.drawLine(500, 100, 500, 500);
        this.drawLine(500, 500, 100, 500);
        this.drawLine(100, 500, 100, 100);
        let lado = 400;
        let p = 0.95; // reducción 
        let q = 1 - p;
        let xA = 100, yA = 100;
        let xB = xA + lado, yB = yA;
        let xC = xB, yC = yB + lado;
        let xD = xA, yD = yA + lado;
        for (let i = 0; i < 30; i++) {
            this.drawLine(xA, yA, xB, yB);
            this.drawLine(xB, yB, xC, yC);
            this.drawLine(xC, yC, xD, yD);
            this.drawLine(xD, yD, xA, yA);
            let xA1 = p * xA + q * xB;
            let yA1 = p * yA + q * yB;
            let xB1 = p * xB + q * xC;
            let yB1 = p * yB + q * yC;
            let xC1 = p * xC + q * xD;
            let yC1 = p * yC + q * yD;
            let xD1 = p * xD + q * xA;
            let yD1 = p * yD + q * yA;
            xA = xA1;
            yA = yA1;
            xB = xB1;
            yB = yB1;
            xC = xC1;
            yC = yC1;
            xD = xD1;
            yD = yD1;
        }
    }
}
