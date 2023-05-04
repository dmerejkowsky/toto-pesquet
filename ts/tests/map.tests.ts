import test from 'tape'
import { Coordinates, Direction, Orientation, Rotation, rotate, translate } from '../map'

type rotationTest = [Orientation, Rotation, Orientation]

const rotationTests: rotationTest[] = [
  [Orientation.North, Rotation.Right, Orientation.East],
  [Orientation.East, Rotation.Left, Orientation.North]
]

for (const [orientation, rotation, expected] of rotationTests) {
  test(`${orientation} rotating ${rotation} gives ${expected}`, t => {

    const actual = rotate(orientation, rotation)

    t.deepEqual(actual, expected)
    t.end()
  })
}

type translateTest = [[number, number], Orientation, Direction, [number, number]]

const translateTests: translateTest[] =
  [
    [[0, 0], Orientation.North, Direction.Forward, [0, 1]],
    [[0, 0], Orientation.East, Direction.Forward, [1, 0]],
    [[0, 3], Orientation.North, Direction.Backward, [0, 2]]
  ]

for (const [input, orientation, direction, expected] of translateTests) {
  test(`translate ${input} moving ${direction} facing ${orientation} gives ${expected}`, t => {

    const startCoordinates = new Coordinates(input[0], input[1])
    const expectedCoordinates = new Coordinates(expected[0], expected[1])

    const actualCoordinates = translate(startCoordinates, orientation, direction)


    t.deepEqual(actualCoordinates, expectedCoordinates)
    t.end()
  })
}