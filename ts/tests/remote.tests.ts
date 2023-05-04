import test from 'tape'
import Remote from '../remote'
import Rover from '../rover'
import { Coordinates } from '../map'
import Movable from '../movable'

class FakeMovable implements Movable {
  moves: string[]

  constructor() {
    this.moves = []
  }

  moveForward(): void {
    this.moves.push("forward")
  }
  moveBackward(): void {
    this.moves.push("backward")
  }
  rotateLeft(): void {
    this.moves.push("left")
  }
  rotateRight(): void {
    this.moves.push("right")
  }
}

test('FF calls forward twice', t => {
  const fakeRover = new FakeMovable()
  const remote = new Remote(fakeRover)

  remote.execute("FF")

  t.deepEqual(fakeRover.moves, ["forward", "forward"])

  t.end()
})

test('Execute complex command', t => {
  const fakeRover = new FakeMovable()
  const remote = new Remote(fakeRover)

  remote.execute("FFRBBL")

  t.deepEqual(fakeRover.moves,
    ["forward", "forward", "right", "backward", "backward", "left"])

  t.end()
})

test('throws on invalid command', t => {
  const fakeRover = new FakeMovable()
  const remote = new Remote(fakeRover)

  t.throws(
    () => {
      remote.execute("FCAB")
    },
    /Unknown letter/
  )

  t.end()
})