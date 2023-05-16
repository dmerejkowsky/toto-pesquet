import Movable from "./movable"

export default class Remote {
  target: Movable

  constructor(target: Movable) {
    this.target = target
  }

  execute(command: string) {
    for (const letter of command) {
      switch (letter.toLowerCase()) {
        case 'f':
          this.target.moveForward()
          break
        case 'b':
          this.target.moveBackward()
          break
        case 'l':
          this.target.rotateLeft()
          break
        case 'r':
          this.target.rotateRight()
          break
        default:
          throw new Error(`Unknown letter: '${letter}'`)
      }
    }
  }
}