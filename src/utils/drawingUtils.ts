interface Point {
  x: number;
  y: number;
}

export function interpolatePoints(start: Point, end: Point, steps: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    points.push({
      x: start.x + (end.x - start.x) * (i / steps),
      y: start.y + (end.y - start.y) * (i / steps)
    });
  }
  return points;
}

export function getDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}