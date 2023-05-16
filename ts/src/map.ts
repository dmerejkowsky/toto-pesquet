export class Coordinates {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  toString(): string {
    return `${this.x} ${this.y}`
  }
}

export enum Orientation {
  North = "North",
  South = "South",
  East = "East",
  West = "West"
}

class Vector {
  readonly x: number
  readonly y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

const UNIT_VECTORS: Map<Orientation, Vector> = new Map(
  [
    [Orientation.North, new Vector(0, 1)],
    [Orientation.South, new Vector(0, -1)],
    [Orientation.East, new Vector(1, 0)],
    [Orientation.West, new Vector(-1, 0)]
  ]
)

export enum Direction {
  Forward = "forward",
  Backward = "backward"
}

export enum Rotation {
  Left = "left",
  Right = "right"
}

const add = (coordinates: Coordinates, vector: Vector): Coordinates => {
  return new Coordinates(coordinates.x + vector.x, coordinates.y + vector.y)
}

const sub = (coordinates: Coordinates, vector: Vector): Coordinates => {
  return new Coordinates(coordinates.x - vector.x, coordinates.y - vector.y)
}

export const translate = (coordinates: Coordinates, orientation: Orientation, direction: Direction): Coordinates => {
  const vector = UNIT_VECTORS.get(orientation)
  if (!vector) {
    throw new Error(`unit vector not found for ${orientation}`)
  }
  return direction === Direction.Forward ? add(coordinates, vector) : sub(coordinates, vector)
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
