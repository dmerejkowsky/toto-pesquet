import test from 'tape'
import Rover from '../rover'
import { Coordinates } from '../map'
import Remote from '../remote'

test('Moving rover', t => {
  const origin = new Coordinates(0, 0)
  const rover = new Rover(origin)
  const remote = new Remote(rover)

  remote.execute("FFRF")

  t.deepEqual(rover.coordinates, new Coordinates(1, 2))
  t.end()
})