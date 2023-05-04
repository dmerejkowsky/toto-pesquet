import { Coordinates, Orientation, Direction, Rotation, translate, rotate } from './map'


export default class Rover {
  coordinates: Coordinates
  orientation: Orientation

  constructor(coordinates: Coordinates) {
    this.coordinates = coordinates
    this.orientation = Orientation.North
  }

  moveForward() {
    this.coordinates = translate(this.coordinates, this.orientation, Direction.Forward)
  }

  rotateRight() {
    this.orientation = rotate(this.orientation, Rotation.Right)
  }

}