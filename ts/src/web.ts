import { Coordinates } from "./map"
import Remote from "./remote"
import Rover from "./rover"


class Page {
  rover: HTMLParagraphElement
  canvas: HTMLCanvasElement

  constructor(rover: HTMLParagraphElement, canvas: HTMLCanvasElement) {
    this.rover = rover
    this.canvas = canvas
  }
}

const origin = new Coordinates(0, 0)
const rover = new Rover(origin)
const remote = new Remote(rover)


addEventListener("DOMContentLoaded", (event) => onLoad())

const onLoad = () => {

  const roverElement = document.getElementById("rover")
  if (!roverElement) {
    throw new Error("rover element not found")
  }
  const roverParagraph = roverElement as HTMLParagraphElement
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  if (!canvas) {
    throw new Error("Could not get canvas")
  }
  const page = new Page(roverParagraph, canvas)

  refreshPage(page) // Initial rendering

  document.addEventListener("keydown", onKeyDown(page))
}

const onKeyDown = (page: Page) => (event: KeyboardEvent) => {
  console.log(event.key)
  try {
    remote.execute(event.key)
  } catch (e) {
    console.log(e)
  }
  refreshPage(page)
}

const refreshCanvas = (canvas: HTMLCanvasElement, rover: Rover) => {
  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("Could not get canvas context")
  }
  context.fillStyle = "green"
  context.fillRect(10, 10, 150, 100)
}


const refreshPage = (page: Page) => {
  console.log(rover.toString())
  refreshCanvas(page.canvas, rover)
  page.rover.innerText = rover.toString()
}