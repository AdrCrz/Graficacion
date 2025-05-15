export class CanvasLocal {
  // Atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth: number;
  protected rHeight: number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.graphics = g;
    this.rWidth = 25;
    this.rHeight = 25;
    this.maxX = canvas.width - 1;
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = 0;
    this.centerY = this.maxY;
  }

  iX(x: number): number {
    return Math.round(this.centerX + x / this.pixelSize);
  }
  
  iY(y: number): number {
    return Math.round(this.centerY - y / this.pixelSize);
  }
  
  drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }
  
  dibujarPixel(x: number, y: number): void {
    this.graphics.fillRect(
      this.iX(x),
      this.iY(y + 1),
      this.iX(1) - this.iX(0),
      this.iX(1) - this.iX(0)
    );
  }
  
  // Método auxiliar para dibujar un "módulo" del QR (cuadrado) con un color específico.
  private drawModule(moduleX: number, moduleY: number, color: string): void {
    const moduleSize = this.iX(1) - this.iX(0);
    this.graphics.fillStyle = color;
    this.graphics.fillRect(
      this.iX(moduleX),
      this.iY(moduleY + 1),
      moduleSize,
      moduleSize
    );
  }
  
  /**
   * Genera y dibuja en el canvas un QR code simplificado de 21x21 módulos basado en la URL.
   * Se colocan los finder patterns en las tres esquinas (superior izquierda, superior derecha e inferior izquierda)
   * y el resto de la matriz se rellena con un patrón pseudoaleatorio dependiente de la URL.
   */
  generateQRCode(url: string): void {
    // Limpiar el canvas
    this.graphics.clearRect(0, 0, this.maxX, this.maxY);
    
    const size: number = 21; // Versión 1 del QR code (21x21 módulos)
    let qrMatrix: number[][] = [];
    
    // Inicializar la matriz con 0 (blanco)
    for (let i = 0; i < size; i++) {
      qrMatrix[i] = [];
      for (let j = 0; j < size; j++) {
        qrMatrix[i][j] = 0;
      }
    }
    
    // Función auxiliar para colocar un finder pattern en la matriz
    function applyFinderPattern(matrix: number[][], startX: number, startY: number): void {
      const pattern: number[][] = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ];
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          matrix[startY + y][startX + x] = pattern[y][x];
        }
      }
    }
    
    // Colocar los finder patterns en las tres esquinas:
    applyFinderPattern(qrMatrix, 0, 0);                      // Superior izquierda
    applyFinderPattern(qrMatrix, size - 7, 0);               // Superior derecha
    applyFinderPattern(qrMatrix, 0, size - 7);               // Inferior izquierda
    
    // Crear una semilla simple basada en la URL
    let seed = 0;
    for (let i = 0; i < url.length; i++) {
      seed += url.charCodeAt(i);
    }
    
    // Rellenar el resto de la matriz con un patrón pseudoaleatorio
    // Solo se modifican las celdas que no pertenecen a los finder patterns.
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Verificar si la celda forma parte de un finder pattern:
        let inFinder = false;
        if (x < 7 && y < 7) inFinder = true;                  // Superior izquierda
        if (x >= size - 7 && y < 7) inFinder = true;           // Superior derecha
        if (x < 7 && y >= size - 7) inFinder = true;           // Inferior izquierda
        
        if (!inFinder) {
          qrMatrix[y][x] = ((x + y + seed) % 2 === 0) ? 1 : 0;
        }
      }
    }
    
    // Calcular un offset para centrar el QR code dentro del grid de rWidth x rHeight unidades.
    const offset: number = (this.rWidth - size) / 2;
    
    // Dibujar cada módulo del QR code usando la matriz generada.
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (qrMatrix[y][x] === 1) {
          this.drawModule(offset + x, offset + y, "black");
        } else {
          this.drawModule(offset + x, offset + y, "white");
        }
      }
    }
  }
  
  // Método de pintura original (puedes dejarlo para otros propósitos o pruebas)
  paint(): void {
    this.drawLine(this.iX(0), this.iY(0), this.iX(25), this.iY(0));
    let tamX: number = 25;
    let tamY: number = 25;
    
    this.graphics.fillStyle = "red";
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if (Math.random() > 0.5) this.dibujarPixel(i, j);
      }
    }
    
    this.graphics.fillStyle = "black";
    for (let x = 0; x <= tamX; x++) {
      this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(tamX));
    }
    for (let y = 0; y <= tamY; y++) {
      this.drawLine(this.iX(0), this.iY(y), this.iX(tamY), this.iY(y));
    }
  }
}
