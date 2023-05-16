import { Coordinates } from "./map"
import Remote from "./remote"
import Rover from "./rover"

addEventListener("DOMContentLoaded", (event) => onLoad())

const onLoad = () => {
  const button = document.getElementById("button-count")
  if (!button) {
    throw new Error("button-count not found")
  }
  const text = document.getElementById("text-count")
  if (!text) {
    throw new Error("text-count not found")
  }
  const inputText = text as HTMLInputElement
  button.addEventListener("click", onClick(inputText))

  const origin = new Coordinates(0, 0)
  const rover = new Rover(origin)
  const remote = new Remote(rover)

  const remoteInput = document.getElementById("remote-input")
  if (!remoteInput) {
    throw new Error("remote-input not found")
  }
  const roverElement = document.getElementById("rover")
  if (!roverElement) {
    throw new Error("rover element not found")
  }
  const roverText = roverElement as HTMLParagraphElement
  remoteInput.addEventListener("keydown", onKey(roverText, remote, rover))
}

let count = 0
const onClick = (text: HTMLInputElement) => (event: MouseEvent) => {
  count++
  text.value = "yolo" + count
}

const onKey = (element: HTMLParagraphElement, remote: Remote, rover: Rover) => (event: KeyboardEvent) => {
  console.log(event.key)
  try {
    remote.execute(event.key)
  } catch (e) {
    console.log(e)
  }
  console.log(rover.toString())
  element.innerText = rover.toString()

}