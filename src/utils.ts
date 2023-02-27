import { PixelRatio } from "react-native";

type Point = {
  x: number;
  y: number;
};

const THRESHOLD = 5 * 0.01;

const hasDuplicates = (array: any[]): boolean => {
  return new Set(array).size !== array.length;
};

export const analysePoints = (points: Point[]) => {
  console.log(points.sort((a: Point, b: Point) => a.x - b.y));
  const extremePoints = [
    points.sort((a: Point, b: Point) => a.x - b.x)[0],
    points.sort((a: Point, b: Point) => b.x - a.x)[0],
    points.sort((a: Point, b: Point) => a.y - b.y)[0],
    points.sort((a: Point, b: Point) => b.y - a.y)[0],
  ];
  let controlPoints: Point[] = [];
  let idPoints: Point[] = [];
  if (extremePoints.length == 4) {
    extremePoints.forEach((point: Point, index: number) => {
      const otherPoints = extremePoints.filter(
        (filterPoint: Point) => filterPoint != point
      );
      if (arePointsARightAngle(otherPoints)) {
        controlPoints = otherPoints;
        idPoints = points.filter((filterPoint: Point) =>
          controlPoints.includes(filterPoint)
        );
      }
    });
  }

  const readable = controlPoints.length == 3 && idPoints.length == 2;
  // console.log("Control", controlPoints);
  // console.log("ID", idPoints);
  return {
    readable,
  };
};

const getDistancesToOherPoints = (
  point: Point,
  otherPoints: Point[]
): number[] => {
  return otherPoints.map((otherPoint: Point) =>
    distanceBetweenTwoPoints(point, otherPoint)
  );
};

const distanceBetweenTwoPoints = (pointA: Point, pointB: Point) =>
  PixelRatio.getPixelSizeForLayoutSize(
    Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y)
  );

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
