import { Coordinates, Orientation, Direction, Rotation, translate, rotate } from './map'
import Movable from './movable'


export default class Rover implements Movable {
  coordinates: Coordinates
  orientation: Orientation

  constructor(coordinates: Coordinates) {
    this.coordinates = coordinates
    this.orientation = Orientation.North
  }

  moveForward() {
    this.coordinates = translate(this.coordinates, this.orientation, Direction.Forward)
  }

  moveBackward() {
    this.coordinates = translate(this.coordinates, this.orientation, Direction.Backward)
  }

  rotateLeft() {
    this.orientation = rotate(this.orientation, Rotation.Left)
  }

  rotateRight() {
    this.orientation = rotate(this.orientation, Rotation.Right)
  }

  toString(): string {
    return `Rover at ${this.coordinates} facing ${this.orientation}`
  }

}