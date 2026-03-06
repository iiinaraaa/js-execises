let screen = document.getElementById("screen")
let result = document.getElementById("result")

function add(value) {
    screen.value = screen.value + value
}

function calculate() {
    result.innerText = eval(screen.value)
}

function clearScreen() {
    screen.value = ""
    result.innerText = ""
}