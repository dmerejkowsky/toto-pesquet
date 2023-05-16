import { test, expect } from '@jest/globals'
import { Coordinates, Orientation } from '../src/map'
import Rover from '../src/rover'

test('starts facing north', () => {
  const landingPosition = new Coordinates(0, 2)
  const rover = new Rover(landingPosition)

  expect(rover.orientation).toEqual(Orientation.North)
  expect(rover.coordinates).toEqual(landingPosition)
})

test('rotate right', () => {
  const landingPosition = new Coordinates(0, 2)
  const rover = new Rover(landingPosition)

  rover.rotateRight()

  expect(rover.orientation).toEqual(Orientation.East)
})

test('rotate left', () => {
  const landingPosition = new Coordinates(0, 2)
  const rover = new Rover(landingPosition)
  rover.rotateLeft()

  expect(rover.orientation).toEqual(Orientation.West)
})

test('move forward', () => {
  const landingPosition = new Coordinates(0, 2)
  const rover = new Rover(landingPosition)

  rover.moveForward()

  expect(rover.coordinates).toEqual(new Coordinates(0, 3))
})

test('move bacwkard', () => {
  const landingPosition = new Coordinates(0, 2)
  const rover = new Rover(landingPosition)

  rover.moveBackward()

  expect(rover.coordinates).toEqual(new Coordinates(0, 1))
})