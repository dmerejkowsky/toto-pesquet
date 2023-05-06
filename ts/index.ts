import { Coordinates } from "./map"
import Remote from "./remote"
import Rover from "./rover"
import prompt from "prompt"

const main = async () => {
  const origin = new Coordinates(0, 0)
  const rover = new Rover(origin)
  const remote = new Remote(rover)
  console.log(rover.coordinates, rover.orientation)
  prompt.message = ">"
  prompt.delimiter = " "
  prompt.start()
  while (true) {
    const { command }: { command: string } = await prompt.get(['command'])
    if (command === 'q' || command === 'quit') {
      break
    }
    try {
      remote.execute(command)
    } catch (e) {
      console.log(e.message)
    }
    console.log(rover.coordinates, rover.orientation)
  }
}

main()