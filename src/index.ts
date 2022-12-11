import { createGrid, Grid } from "./grid";

export type Coordinates = {
  x: number;
  y: number;
};

type LiveCells = Coordinates[];

type CandidatesToLive = Coordinates[];

const possibleNeighbours = createGrid([
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
]);

const translateCell = (cell: Coordinates) => (element: Coordinates) =>
  createGrid([
    {
      x: element.x + cell.x,
      y: element.y + cell.y,
    },
  ]);

export const computeLivingNeighbours = (cell: Coordinates, liveCells: LiveCells): LiveCells => {
  const formatliveCells = createGrid(liveCells);

  return possibleNeighbours.map(translateCell(cell)).filter(formatliveCells.includes).asArray();
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
  const gridLiveCells = createGrid(liveCells);
  const translatedPossibleNeighbours = gridLiveCells.map((liveCell) => possibleNeighbours.map(translateCell(liveCell)));

  const valuesString = gridLiveCells.add(translatedPossibleNeighbours);

  return valuesString.asArray();
};
