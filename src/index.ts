export type Coordinates = {
  x: number;
  y: number;
};

type LiveCells = Coordinates[];

type CandidatesToLive = Coordinates[];

type SerializedCoordinates = `${number}|${number}`;

const toString = (cell: Coordinates): SerializedCoordinates => {
  return `${cell.x}|${cell.y}`;
};

const toCoordinate = (cellString: SerializedCoordinates): Coordinates => {
  const [x, y] = cellString.split("|").map((coordinate) => parseInt(coordinate));
  return { x, y };
};

const possibleNeighbours: Coordinates[] = [
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

const translateCell =
  (cell: Coordinates) =>
  (element: Coordinates): Coordinates => ({
    x: element.x + cell.x,
    y: element.y + cell.y,
  });

export const computeLivingNeighbours = (cell: Coordinates, liveCells: LiveCells): LiveCells => {
  const formatliveCells = liveCells.map(toString);

  const translatedPossibleNeighbours = possibleNeighbours.map(translateCell(cell));

  return translatedPossibleNeighbours.reduce((acc, element) => {
    if (formatliveCells.includes(toString(element))) {
      return [...acc, element];
    }
    return acc;
  }, []);
};

export const isCellAliveAtNextGeneration = (wasAlive: boolean, numberOfNeighbours: number): boolean => {
  return (wasAlive && numberOfNeighbours === 2) || numberOfNeighbours === 3;
};

const isCellAlive = (cell: Coordinates, liveCells: LiveCells): boolean => {
  return liveCells.find((liveCell) => liveCell.x === cell.x && liveCell.y === cell.y) !== undefined;
};

export const transitionForOneCell =
  (liveCells: LiveCells) =>
  (cell: Coordinates): boolean => {
    const numberOfNeighbours = computeLivingNeighbours(cell, liveCells).length;
    const isAlive = isCellAlive(cell, liveCells);

    return isCellAliveAtNextGeneration(isAlive, numberOfNeighbours);
  };

export const transitionForAllCells = (liveCells: LiveCells): LiveCells => {
  const allCandidatesToLife = findAllCandidatesToLife(liveCells);

  return allCandidatesToLife.filter(transitionForOneCell(liveCells));
};

export const findAllCandidatesToLife = (liveCells: LiveCells): CandidatesToLive => {
  const translatedPossibleNeighbours = liveCells.map((liveCell) => possibleNeighbours.map(translateCell(liveCell)));
  const flattenNeighbours = translatedPossibleNeighbours.flat();

  const valuesString = new Set([...liveCells.map(toString), ...flattenNeighbours.map(toString)]);

  return [...valuesString].map(toCoordinate);
};
