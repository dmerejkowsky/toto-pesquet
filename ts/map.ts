export class Coordinates {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export enum Orientation {
  North = "Noth",
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

export const translate = ({ x, y }: Coordinates, orientation: Orientation, direction: Direction): Coordinates => {
  return new Coordinates(x + 1, y)
}

export const rotate = (orientation: Orientation, rotation: Rotation): Orientation => {
  return Orientation.East
}