export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 12;
        this.rHeight = 8;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 12;
        this.centerY = this.maxY / 8 * 7;
    }

    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }

    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
        this.graphics.fill();
    }

    drawRmboide(x1, y1, x2, y2, x3, y3, x4, y4, color) {
        // Color de relleno (RGBA)
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
        // Lo rellenamos con el color especificado
        this.graphics.fill();
    }

    barra(x, y, alt) {
        
        
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

        



        const x1 = x - 0.5;
        const y1 = 0.5;
        const x2 = x;
        const y2 = 0;
        const dx = 0.9;
        const dyIzq = 0.2;
        const dyCen = 0.2;
        const x3 = x2 - dx;
        const y3 = y2 - dyCen;
        const x4 = x1 - dx;
        const y4 = y1 - dyIzq;
        this.drawRmboide(
            this.iX(x1), this.iY(y1), 
            this.iX(x2), this.iY(y2), 
            this.iX(x3), this.iY(y3), 
            this.iX(x4), this.iY(y4), 
            'rgba(194, 64, 100, 0.3)' 
        );
        this.graphics.strokeStyle = 'black';


        
    }

    paint(h = [10, 30, 80, 50]) {
        const maxEsc = 100; 
        const colors = ['black'];

        let i = 0;
        for (let x = 0; x < 8; x += (10 / h.length)) {
            this.graphics.strokeStyle = colors[i % colors.length];
            let valor = h[i];
            if (valor >= 0 && valor <= 100) {
                this.barra(x, 0, valor * (this.rHeight - 2) / maxEsc);
            } else {
                this.barra(x, 0, 0); 
            }
            i++;
        }

        
    }
}
