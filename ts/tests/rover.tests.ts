import test from 'tape'
import Rover from '../rover'
import { Coordinates, Orientation } from '../map'

test('starts facing north', (t) => {
  const landingPosition = new Coordinates(0, 2)
  const rover = new Rover(landingPosition)

  t.equal(rover.orientation, Orientation.North)
  t.deepEqual(rover.coordinates, landingPosition)
  t.end()
})

test('rotate right', (t) => {
  const landingPosition = new Coordinates(0, 2)
  const rover = new Rover(landingPosition)

  rover.rotateRight()

  t.equal(rover.orientation, Orientation.East)
  t.end()
})

test('move forward', (t) => {
  const landingPosition = new Coordinates(0, 2)
  const rover = new Rover(landingPosition)

  rover.moveForward()

  t.deepEqual(rover.coordinates, new Coordinates(1, 2))
  t.end()
})