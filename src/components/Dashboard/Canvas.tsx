import React, { useRef, useEffect } from 'react';
import { drawMessagePreview } from './canvas-utils/drawFunctions';
import { MessagePreview } from './canvas-utils/types';

export interface CanvasProps {
  onCardSelect: (message: MessagePreview) => void;
  messagePreviews: MessagePreview[];
  setMessagePreviews: React.Dispatch<React.SetStateAction<MessagePreview[]>>;
  handleAddMessage: () => void;
}

const Canvas: React.FC<CanvasProps> = ({ onCardSelect, messagePreviews, setMessagePreviews, handleAddMessage}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        contextRef.current = context;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    } else {
      console.error('Canvas reference is null');
    }
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    if (context) {
      messagePreviews.forEach((message) => {
        drawMessagePreview(context, message);
      });
    }
  }, [messagePreviews]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      messagePreviews.forEach((message) => {
        if (x > message.x && x < message.x + message.width && y > message.y && y < message.y + message.height) {
          onCardSelect(message);
        }
      });
    }
  };

  return (
    <div>
      <button onClick={handleAddMessage}>Add Message</button>
      <canvas ref={canvasRef} onClick={handleCanvasClick} />
    </div>
  );
};

export default Canvas;

