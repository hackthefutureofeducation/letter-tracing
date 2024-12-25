export function createTextMask(
  ctx: CanvasRenderingContext2D,
  text: string,
  width: number,
  height: number
): ImageData {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
  
  if (!tempCtx) return ctx.createImageData(width, height);

  // Clear the temporary canvas
  tempCtx.clearRect(0, 0, width, height);
  
  // Draw the text with a thicker stroke for better boundary detection
  tempCtx.font = '8rem Arial';
  tempCtx.textAlign = 'right';
  tempCtx.fillStyle = '#000000';
  tempCtx.fillText(text, width - 20, height / 2);
  
  // Add a slight blur to smooth the edges
  tempCtx.filter = 'blur(1px)';
  
  return tempCtx.getImageData(0, 0, width, height);
}