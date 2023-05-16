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
}

let count = 0
const onClick = (text: HTMLInputElement) => (event: MouseEvent) => {
  count++
  text.value = "yolo" + count
}