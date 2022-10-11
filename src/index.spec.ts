// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { computeNeighbour, Coordinates, isCellAliveAtNextGeneration, transition, transitionForOneCell } from ".";
expect.extend(matchers);

describe("computeNeighbour", () => {
  it("a single cell should disapear", function () {
    //Given
    const singleCell: Coordinates = { x: 0, y: 0 };

    //When
    const expectedResult = computeNeighbour(singleCell, [singleCell]);

    expect(expectedResult).toEqual([]);
  });

  it("2 adjacent cells should be neighbours", function () {
    //Given
    const singleCell: Coordinates = { x: 0, y: 0 };
    const singleCellB: Coordinates = { x: 1, y: 0 };
    //When
    const expectedResult = computeNeighbour(singleCell, [singleCell, singleCellB]);

    expect(expectedResult).toEqual([singleCellB]);
  });
  it("2 adjacent cells should be neighbours", function () {
    //Given
    const singleCell: Coordinates = { x: 0, y: 0 };
    const singleCellB: Coordinates = { x: 0, y: 1 };
    //When
    const expectedResult = computeNeighbour(singleCell, [singleCell, singleCellB]);

    expect(expectedResult).toEqual([singleCellB]);
  });
  it("2 adjacent cells should be neighbours", function () {
    //Given
    const singleCell: Coordinates = { x: 0, y: 0 };
    const singleCellB: Coordinates = { x: 0, y: 1 };
    const singleCellC: Coordinates = { x: 1, y: 0 };
    //When
    const expectedResult = computeNeighbour(singleCell, [singleCell, singleCellB, singleCellC]);

    console.log(expectedResult);

    expect(expectedResult).toEqual([singleCellC, singleCellB]);
  });
  it("2 adjacent cells should be neighbours", function () {
    //Given
    const singleCell: Coordinates = { x: 2, y: 2 };
    const singleCellB: Coordinates = { x: 2, y: 3 };
    //When
    const expectedResult = computeNeighbour(singleCell, [singleCell, singleCellB]);

    console.log(expectedResult);

    expect(expectedResult).toEqual([singleCellB]);
  });
});

it("a block should stay a block", function () {
  //Given
  const block: Coordinates[] = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];

  //When
  const expectedResult = transition(block);

  expect(expectedResult).toEqual(block);
});

it("a cell should disappear if it has no neighbour", function () {
  //Given
  const numberOfNeighbours = 0;
  const wasAlive = true;

  //When
  const actualResult = isCellAliveAtNextGeneration(wasAlive, numberOfNeighbours);

  //Then
  const expectedResult = false;
  expect(actualResult).toEqual(expectedResult);
});
it("a cell should stay alive if it has 2 neighbours", function () {
  //Given
  const numberOfNeighbours = 2;
  const wasAlive = true;

  //When
  const actualResult = isCellAliveAtNextGeneration(wasAlive, numberOfNeighbours);

  //Then
  const expectedResult = true;
  expect(actualResult).toEqual(expectedResult);
});
it("a cell should not appear if it has 2 neighbours", function () {
  //Given
  const numberOfNeighbours = 2;
  const wasAlive = false;

  //When
  const actualResult = isCellAliveAtNextGeneration(wasAlive, numberOfNeighbours);

  //Then
  const expectedResult = false;
  expect(actualResult).toEqual(expectedResult);
});
it("a cell should stay or appear if it has 3 neighbours", function () {
  //Given
  const numberOfNeighbours = 3;
  const wasAlive = true;

  //When
  const actualResult = isCellAliveAtNextGeneration(wasAlive, numberOfNeighbours);

  //Then
  const expectedResult = true;
  expect(actualResult).toEqual(expectedResult);
});
it("a single cell should die", function () {
  //Given
  const singleCell: Coordinates = { x: 2, y: 2 };
  const liveCells = [];

  //When
  const actualResult = transitionForOneCell(singleCell, liveCells);

  //Then
  const expectedResult = false;
  expect(actualResult).toEqual(expectedResult);
});
it("a single cell should stay alive if there is 3 neighbours", function () {
  //Given
  const singleCell: Coordinates = { x: 0, y: 0 };
  const liveCells = [
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ];

  //When
  const actualResult = transitionForOneCell(singleCell, liveCells);

  //Then
  const expectedResult = true;
  expect(actualResult).toEqual(expectedResult);
});
it("a single cell should stay dead if there is 2 neighbours", function () {
  //Given
  const singleCell: Coordinates = { x: 0, y: 0 };
  const liveCells = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
  ];

  //When
  const actualResult = transitionForOneCell(singleCell, liveCells);

  //Then
  const expectedResult = true;
  expect(actualResult).toEqual(expectedResult);
});
