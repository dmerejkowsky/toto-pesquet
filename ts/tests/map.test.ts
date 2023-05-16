import { describe, test, expect } from '@jest/globals'

import { Coordinates, Direction, Orientation, Rotation, rotate, translate } from '../src/map'

type rotationTest = [[Orientation, Rotation], Orientation]
const rotationTests: rotationTest[] = [
  [[Orientation.North, Rotation.Right], Orientation.East],
  [[Orientation.East, Rotation.Left], Orientation.North]
]

describe('rotations', () => {
  test.each(rotationTests)("Rotating from %s gives %s", ([orientation, rotation], expected) => {
    const actual = rotate(orientation, rotation)
    expect(actual).toEqual(expected)
  })
})


type translateTest = [[number, number, Orientation, Direction], [number, number]]
const translateTests: translateTest[] =
  [
    [[0, 0, Orientation.North, Direction.Forward], [0, 1]],
    [[0, 0, Orientation.East, Direction.Forward], [1, 0]],
    [[0, 3, Orientation.North, Direction.Backward], [0, 2]]
  ]

describe('translations', () => {
  test.each(translateTests)("Translating %s -> %s", (input, expected) => {
    const [x, y, orientation, direction] = input
    const coordinates = new Coordinates(x, y)
    const actualCoordinates = translate(coordinates, orientation, direction)
    const expectedCoordinates = new Coordinates(expected[0], expected[1])
    expect(actualCoordinates).toEqual(expectedCoordinates)
  })
})