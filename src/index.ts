export type Coordinates = {
  x: number;
  y: number;
};

type LiveCells = Coordinates[];

const formatCell = (cell: Coordinates) => {
  return `${cell.x}|${cell.y}`;
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

export const computeNeighbour = (cell: Coordinates, liveCells: LiveCells): LiveCells => {
  const formatliveCells = liveCells.map(formatCell);

  const translatedPossibleNeighbours = possibleNeighbours.map(translateCell(cell));

  return translatedPossibleNeighbours.reduce((acc, element) => {
    if (formatliveCells.includes(formatCell(element))) {
      return [...acc, element];
    }
    return acc;
  }, []);
};

export const isCellAliveAtNextGeneration = (wasAlive: boolean, numberOfNeighbours: number): boolean => {
  return (wasAlive && numberOfNeighbours === 2) || numberOfNeighbours === 3;
};

export const transitionForOneCell = (cell: Coordinates, liveCells: LiveCells): boolean => {
  const numberOfNeighbours = computeNeighbour(cell, liveCells).length;
  return isCellAliveAtNextGeneration(false, numberOfNeighbours);
};

export const transition = (liveCells: LiveCells): LiveCells => {
  return [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];
};
