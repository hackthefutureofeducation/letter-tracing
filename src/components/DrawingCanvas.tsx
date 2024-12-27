import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

interface DrawingCanvasProps {
  width: number;
  height: number;
  color: string;
  text: string;
}

export function DrawingCanvas({ width, height, color, text }: DrawingCanvasProps) {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasContainerRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasContainerRef.current) {
      // Initialize the main canvas
      const canvas = new fabric.Canvas(canvasContainerRef.current, {
        width,
        height,
        backgroundColor: 'white',
      });
      canvasRef.current = canvas;

      // Create and render the visible text
      const textObj = new fabric.Text(text, {
        left: width / 2,
        top: height / 2,
        fontSize: 100,
        fill: '#c4c8cf', // Light gray to guide tracing
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false, // Prevent interaction with the text
      });
      canvas.add(textObj);

      // Clone text as a path for clipping
      textObj.clone((clonedText: any) => {
        const clipPath = new fabric.Text(text, {
          left: width / 2,
          top: height / 2,
          fontSize: 100,
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        });

        // Set the clip path for the canvas
        canvas.clipPath = clipPath;
      });

      // Enable drawing mode with brush settings
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = 10;

      // Cleanup resources on unmount
      return () => {
        canvas.dispose();
      };
    }
  }, [width, height, color, text]);

  return (
    <div className="overflow-hidden relative">
      <canvas
        ref={canvasContainerRef}
        className="border border-gray-300 rounded-lg touch-none"
        style={{ touchAction: 'none' }}
        width={width}
        height={height}
      />
    </div>
  );
}