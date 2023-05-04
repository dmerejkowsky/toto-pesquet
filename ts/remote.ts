import Movable from "./movable"

export default class Remote {
  target: Movable

  constructor(target: Movable) {
    this.target = target
  }

  execute(command: string) {
    for (const letter of command) {
      switch (letter) {
        case 'F':
          this.target.moveForward()
          break
        case 'B':
          this.target.moveBackward()
          break
        case 'L':
          this.target.rotateLeft()
          break
        case 'R':
          this.target.rotateRight()
          break
        default:
          throw new Error(`Unknown letter: '${letter}'`)
      }
    }
  }
}