import { describe, test, expect } from '@jest/globals'
import Rover from '../src/rover'
import { Coordinates } from '../src/map'
import Remote from '../src/remote'

describe('end to end tests', () => {
  test('moving the rover around', () => {
    const origin = new Coordinates(0, 0)
    const rover = new Rover(origin)
    const remote = new Remote(rover)

    remote.execute("FFRF")

    expect(rover.coordinates).toEqual(new Coordinates(1, 2))
  })
})