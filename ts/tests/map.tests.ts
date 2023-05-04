import test from 'tape'
import { Coordinates, Direction, Orientation, Rotation, rotate, translate } from '../map'

test('compute new coordinates when moving', t => {
  const origin = new Coordinates(0, 0)

  const upNorth = translate(origin, Orientation.North, Direction.Forward)

  t.deepEqual(upNorth, new Coordinates(1, 0))
  t.end()
})

type rotationTest = [Orientation, Rotation, Orientation]

const rotationTests: rotationTest[] = [
  [Orientation.North, Rotation.Left, Orientation.East],
  [Orientation.East, Rotation.Left, Orientation.South]
]

for (const [orientation, rotation, expected] of rotationTests) {
  test(`${orientation} rotating ${rotation} gives ${expected}`, t => {

    const actual = rotate(orientation, rotation)

    t.deepEqual(actual, expected)
    t.end()
  })
}