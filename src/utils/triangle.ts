type Point = {
  x: number;
  y: number;
};

const THRESHOLD = 1 * 0.01;

const distanceBetweenTwoPoints = (pointA: Point, pointB: Point) =>
  Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);

export const arePointsARightAngle = (points: Point[]): boolean => {
  if (points.length !== 3) {
    return false;
  }

  const distances = pointsToLengths(points).sort((a, b) => b - a);

  if (distances.length !== 3) {
    return false;
  }

  const longSide = Math.floor(Math.pow(distances[0], 2));
  const shortSides = Math.floor(
    Math.pow(distances[1], 2) + Math.pow(distances[2], 2)
  );

  // Is within 5%
  return (
    shortSides >= longSide * (1 - THRESHOLD) &&
    shortSides <= longSide * (1 + THRESHOLD)
  );
};

export const pointsToLengths = (points: Point[]): number[] => {
  if (points.length !== 3) {
    return [];
  }
  return [
    distanceBetweenTwoPoints(points[0], points[1]),
    distanceBetweenTwoPoints(points[1], points[2]),
    distanceBetweenTwoPoints(points[2], points[0]),
  ];
};
