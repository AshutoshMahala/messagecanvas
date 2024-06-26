import { MessagePreview } from './types';
import { drawRoundedRect, drawText, drawImage, drawCircle, drawMessageShape, drawDashedLine, drawMultilineText } from './canvasHelpers';


export const drawBadge = (
  context: CanvasRenderingContext2D,
  x: number, 
  y: number, 
  backgroundcolor: string,
  text: string, 
  fontStyle: string, 
  textcolor: string) => {
  drawRoundedRect(context, x, y, 65, 28, 4, backgroundcolor, backgroundcolor);
  drawText(context, text, x + 8, y + 17, fontStyle, textcolor);
};

export const drawCardHeadingIcon = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  drawCircle(context, x + 32, y + 35, 16, '#7986CB', '#7986CB');
  drawMessageShape(context, x + 24, y + 27, 16, 16, 3, 'white', 'white',"left-bottom");
};

export const drawCardHeading = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string | undefined
) => {
  drawCardHeadingIcon(context, x, y);
  if (text) {
    drawText(context, text, x + 58, y + 43, 'bold 16px Arial', '#000000');
  } else {
    drawText(context, 'New Heading', x + 58, y + 43, 'bold 16px Arial', '#000000');
  }
};

export const drawSeparator = (
  context: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) => {
  const dashPattern = [2, 2]; // 2px dash, 2px gap
  drawDashedLine(context, x1, y1, x2, y2, 'green', dashPattern);
};

export const drawHeader = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  imageUrl: string | undefined
) => {
  if (imageUrl) {
    drawImage(context, imageUrl, x + 5, y + 5, width - 12, 100, () => {
      drawBadge(context, x + 11, y + 11, '#FFFFFF', ' Header', 'bold 12px Arial', '#41C352');
    });
  } else {
    drawBadge(context, x + 11, y + 11, '#FFFFFF', ' Header', 'bold 12px Arial', '#41C352');
  }
};

export const drawBody = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string | undefined,
) => {
  drawBadge(context, x + 5, y + 6, '#F5F5F5', '  Body', 'bold 12px Arial', '#41C352');
  if (text) {
    drawMultilineText(context, text, x + 5, y + 60, 35, 18,'16px Arial', '#000000');
  }
};

export const drawFooter = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string | undefined,
) => {
  drawBadge(context, x + 5, y + 6, '#F5F5F5', ' Footer', 'bold 12px Arial', '#41C352');
  if (text) {
    drawText(context, text, x + 6, y + 50, 'italic 14px Arial', '#888888');
  }
};

export const drawMessageContainer = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  imageUrl: string | undefined,
  bodyText: string | undefined,
  footerText: string | undefined
) => {
  drawMessageShape(context, x, y, width, height, 3, 'white', 'white',"left-top")
  drawHeader(context, x, y, width, imageUrl);

  drawSeparator(context, x + 5, y + 107, x + width - 5, y + 107);
  drawBody(context, x + 5, y + 107, bodyText);

  drawSeparator(context, x + 5, y + 192, x + width - 5, y + 192);
  drawFooter(context, x+ 5, y + 192, footerText);
};

export const drawBottomButton = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  text: string | undefined
) => {
  drawRoundedRect(context, x, y, width, height, 5, '#FFFFFF', null);
  if (text) {
    let paddingSize: number = 51 - text.length;
    paddingSize = Math.floor(paddingSize/2);
    let padding: string = '';
    for (let i=0; i< paddingSize; i++) {
      padding += ' ';
    }
    drawText(context, padding + text, x, y + 20, '14px Arial', '#0000ff');
  } else {
    drawText(context, 'button text here', x + 70, y + 20, '14px Arial', '#A5A5A5');
  }
};

export const drawMessagePreview = (
  context: CanvasRenderingContext2D,
  message: MessagePreview
) => {
  const { x, y, width, height, headerText, bodyText, imageUrl, footerText, contactUsText } = message;

  // Clear the area for the message
  context.clearRect(x, y, width, height);

  // Draw the card background
  drawRoundedRect(context, x, y, width, height, 8, '#FFFFFF', null);

  // Draw the heading
  drawCardHeading(context, x, y, headerText);

  // Draw Button Container background
  drawRoundedRect(context, x + 6 , y + 58, width-12, height-70, 8, '#F5F5F5', null);

  drawMessageContainer(context, x + 30, y + 78, width - 50, 260, imageUrl, bodyText, footerText)

  drawBottomButton(context, x + 30, y + 351, width - 50, 30, contactUsText)
};
