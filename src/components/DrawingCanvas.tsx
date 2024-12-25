import React, { useRef, useEffect } from 'react';
import { createTextMask } from '../utils/textMask';
import { interpolatePoints, getDistance } from '../utils/drawingUtils';

interface Point {
  x: number;
  y: number;
}

interface DrawingCanvasProps {
  width: number;
  height: number;
  color: string;
  text: string;
}

export function DrawingCanvas({ width, height, color, text }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskDataRef = useRef<ImageData | null>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<Point | null>(null);
  const lastValidPoint = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 12;
    ctx.shadowColor = color;
    ctx.shadowBlur = 1;
    ctx.globalAlpha = 0.9;

    maskDataRef.current = createTextMask(ctx, text, width, height);

    // Draw guide text
    ctx.font = '8rem Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#f3f4f6';
    ctx.fillText(text, width - 20, height / 2);
  }, [color, text, width, height]);

  const isPointInText = (x: number, y: number): boolean => {
    if (!maskDataRef.current || x < 0 || y < 0 || x >= width || y >= height) return false;
    
    // Strict boundary checking with higher threshold
    const threshold = 100; // Adjust alpha threshold for stricter boundary
    const index = (y * width + x) * 4;
    return maskDataRef.current.data[index + 3] > threshold;
  };

  const drawSmoothLine = (start: Point, end: Point, ctx: CanvasRenderingContext2D) => {
    const distance = getDistance(start, end);
    const steps = Math.max(Math.floor(distance / 2), 1);
    const points = interpolatePoints(start, end, steps);
    
    let validSegment = false;
    let segmentStart: Point | null = null;

    points.forEach((point) => {
      if (isPointInText(point.x, point.y)) {
        if (!validSegment) {
          validSegment = true;
          segmentStart = point;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
        lastValidPoint.current = point;
      } else if (validSegment) {
        ctx.stroke();
        validSegment = false;
      }
    });

    if (validSegment) {
      ctx.stroke();
    }
  };

  const getPoint = (e: React.TouchEvent | React.MouseEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: Math.round((clientX - rect.left) * scaleX),
      y: Math.round((clientY - rect.top) * scaleY)
    };
  };

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const point = getPoint(e);
    if (!point || !isPointInText(point.x, point.y)) return;

    isDrawing.current = true;
    lastPoint.current = point;
    lastValidPoint.current = point;
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing.current || !lastPoint.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPoint = getPoint(e);
    if (!currentPoint) return;

    if (lastValidPoint.current) {
      drawSmoothLine(lastValidPoint.current, currentPoint, ctx);
    }

    lastPoint.current = currentPoint;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastPoint.current = null;
    lastValidPoint.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className="border border-gray-300 rounded-lg bg-white touch-none"
      style={{ touchAction: 'none' }}
    />
  );
}