export class Coordinates {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export enum Orientation {
  North = "North",
  South = "South",
  East = "East",
  West = "West"
}

export enum Direction {
  Forward = "forward",
  Backward = "backward"
}

export enum Rotation {
  Left = "left",
  Right = "right"
}

export const translate = (coordinates: Coordinates, orientation: Orientation, direction: Direction): Coordinates => {
  switch (direction) {
    case Direction.Forward:
      return translateForward(coordinates, orientation)
    case Direction.Backward:
      return translateBackward(coordinates, orientation)
  }
}


const translateForward = ({ x, y }: Coordinates, orientation: Orientation): Coordinates => {
  switch (orientation) {
    case Orientation.North:
      return new Coordinates(x, y + 1)
    case Orientation.South:
      return new Coordinates(x, y - 1)
    case Orientation.West:
      return new Coordinates(x - 1, y)
    case Orientation.East:
      return new Coordinates(x + 1, y)
  }
}

const translateBackward = ({ x, y }: Coordinates, orientation: Orientation): Coordinates => {
  switch (orientation) {
    case Orientation.North:
      return new Coordinates(x, y - 1)
    case Orientation.South:
      return new Coordinates(x, y + 1)
    case Orientation.West:
      return new Coordinates(x - 1, y)
    case Orientation.East:
      return new Coordinates(x + 1, y)
  }
}


export const rotate = (orientation: Orientation, rotation: Rotation): Orientation => {
  switch (rotation) {
    case Rotation.Left:
      return rotateLeft(orientation)
    case Rotation.Right:
      return rotateRight(orientation)
  }
}


const rotateLeft = (orientation: Orientation): Orientation => {
  switch (orientation) {
    case Orientation.East:
      return Orientation.North
    case Orientation.North:
      return Orientation.West
    case Orientation.West:
      return Orientation.South
    case Orientation.South:
      return Orientation.East
  }
}

const rotateRight = (orientation: Orientation): Orientation => {
  switch (orientation) {
    case Orientation.East:
      return Orientation.South
    case Orientation.South:
      return Orientation.West
    case Orientation.West:
      return Orientation.North
    case Orientation.North:
      return Orientation.East
  }
}
