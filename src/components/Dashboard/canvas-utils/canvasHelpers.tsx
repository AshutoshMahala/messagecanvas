export const getCanvasContext = (canvas: HTMLCanvasElement | null): CanvasRenderingContext2D | null => {
    return canvas ? canvas.getContext('2d') : null;
};

export const clearCanvas = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    context.clearRect(0,0, canvas.width, canvas.height);
};

export const drawRoundedRect = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fillColor: string,
    strokeColor: string | null
) => {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fillStyle = fillColor;
    context.fill();
    if (strokeColor != null) {
        context.strokeStyle = strokeColor;
        context.stroke();
    }
};

export const drawText = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    font: string,
    fillColor: string
) => {
    context.font = font;
    context.fillStyle = fillColor;
    context.fillText(text, x, y);
};


export const drawMultilineText = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    charLimit: number,
    lineSpacing: number,
    font: string,
    fillColor: string
) => {
    context.font = font;
    context.fillStyle = fillColor;
  
    const words = text.split(' ');
    let line = '';
    let yOffset = 0;
  
    for (let n = 0; n < words.length; n++) {
        if (line.length + words[n].length + 1> charLimit) {
            drawText(context, line, x, y + yOffset, font, fillColor);
            line = words[n] + ' ';
            yOffset += lineSpacing;
        } else {
            line = line + words[n] + ' ';
        }
    }
  
    drawText(context, line, x, y + yOffset, font, fillColor);
};

export const drawImage = (
    context: CanvasRenderingContext2D,
    imageUrl: string,
    x: number,
    y: number,
    width: number,
    height: number,
    onLoadCallback: () => void
) => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      context.drawImage(image, x, y, width, height);
      onLoadCallback();
    };
};

export const drawCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    fillColor: string,
    strokeColor: string
) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = fillColor;
    context.fill();
    context.strokeStyle = strokeColor;
    context.stroke();
};

export const addNotch = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    notchDirection: string
) => {
    context.beginPath();
    switch (notchDirection) {
        case "left-bottom":
            context.moveTo(x, y + height * 0.5);
            context.lineTo(x, y + height * 1.25);
            context.lineTo(x + width * 0.25, y + height);
            context.closePath();
            break;
        case "left-top":
            context.moveTo(x, y);
            context.lineTo(x - width * 0.05, y);
            context.lineTo(x, y + height * 0.05);
            context.closePath();
            break;
        default:
            console.error("Invalid notch direction");
    }
    context.fill();
}

export const drawMessageShape = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fillColor: string,
    strokeColor: string,
    notchDirection: string
) => {
    drawRoundedRect(context, x, y, width, height, radius, fillColor, strokeColor);
    addNotch(context, x, y, width, height, notchDirection)
}

export const drawDashedLine = (
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeColor: string,
    dashPattern: number[]
) => {
    context.beginPath();
    context.setLineDash(dashPattern);
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = strokeColor;
    context.stroke();
    context.setLineDash([]);
}