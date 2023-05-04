import { describe, test, expect } from '@jest/globals'
import Remote from '../remote'
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

describe('remote', () => {
  test('FF calls forward twice', () => {
    const fakeRover = new FakeMovable()
    const remote = new Remote(fakeRover)

    remote.execute("FF")

    expect(fakeRover.moves).toEqual(["forward", "forward"])
  })

  test('Execute complex command', () => {
    const fakeRover = new FakeMovable()
    const remote = new Remote(fakeRover)

    remote.execute("FFRBBL")

    expect(fakeRover.moves).toEqual(
      ["forward", "forward", "right", "backward", "backward", "left"]
    )
  })


  test('throws on invalid command', () => {
    const fakeRover = new FakeMovable()
    const remote = new Remote(fakeRover)

    expect(
      () => { remote.execute("FCAB") }
    ).toThrow()

  })
})

