import { Coordinates } from ".";

export type Grid = {
  includes: (coordinate: Coordinates) => boolean;
  map(fn: (coordinate: Coordinates) => Grid): Grid;
  add: (grid: Grid) => Grid;
  filter(fn: (coordinate: Coordinates) => boolean): Grid;
  asArray: () => Coordinates[];
};

type SerializedCoordinates = `${number}|${number}`;

const toString = (cell: Coordinates): SerializedCoordinates => {
  return `${cell.x}|${cell.y}`;
};

const toCoordinate = (cellString: SerializedCoordinates): Coordinates => {
  const [x, y] = cellString.split("|").map((coordinate) => parseInt(coordinate));
  return { x, y };
};

export const createGrid = (coordinates: Coordinates[]): Grid => {
  const formatCoordinates = coordinates.map(toString);
  const set = new Set(formatCoordinates);

  const asArray = () => [...set].map(toCoordinate);
  const add = (additionnalGrid) => createGrid([...additionnalGrid.asArray(), ...coordinates]);
  const includes = (coordinateToCheck) => set.has(toString(coordinateToCheck));
  const filter = (fn) => {
    return createGrid(asArray().filter(fn));
  };
  const map: Grid["map"] = (fn) => {
    const toto = asArray()
      .map(fn)
      .map((grid) => grid.asArray())
      .flat();
    return createGrid(toto);
  };

  return {
    add,
    asArray,
    filter,
    includes,
    map,
  };
};
