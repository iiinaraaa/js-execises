const resultElement = document.querySelector(".calculator__display-result")
const historyElement = document.querySelector(".calculator__display-history")

const numberButtons = document.querySelectorAll(".btn-number")
const operatorButtons = document.querySelectorAll(".btn-operator")
const equalsButton = document.querySelector(".btn-equals")
const actionButtons = document.querySelectorAll(".btn-action")

let previousValue = null
let currentValue = "0"
let operator = null
let history = []

let expression = ""

let shouldResetScreen = false

const Operator = Object.freeze({
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "*",
    DIVIDE: "/"
})

const OperatorSymbol = Object.freeze({
    ADD: "+",
    SUBTRACT: "−",
    MULTIPLY: "×",
    DIVIDE: "÷"
})

function updateDisplay() {
    resultElement.innerText = expression || currentValue

    historyElement.innerHTML = history
        .map(item => `<div class="history-item">${item}</div>`)
        .join("")
}

function mapOperator(op) {
    if (op === OperatorSymbol.ADD) return Operator.ADD
    if (op === OperatorSymbol.DIVIDE) return Operator.DIVIDE
    if (op === OperatorSymbol.MULTIPLY) return Operator.MULTIPLY
    if (op === OperatorSymbol.SUBTRACT) return Operator.SUBTRACT
}

function formatOperator(op) {
    if (op === Operator.MULTIPLY) return OperatorSymbol.MULTIPLY
    if (op === Operator.DIVIDE) return OperatorSymbol.DIVIDE
    if (op === Operator.SUBTRACT) return OperatorSymbol.SUBTRACT

    return op

}

function addToHistory(previousValue, operator, currentValue, result) {
    history.unshift(
        `${previousValue} ${formatOperator(operator)} ${currentValue} = ${result}`
    )

    if (history.length > 2) {
        history.pop()
    }
}

function calculate(a, operator, b) {
    if (operator === Operator.ADD) return a + b
    if (operator === Operator.SUBTRACT) return a - b
    if (operator === Operator.MULTIPLY) return a * b

    if (operator === Operator.DIVIDE) {
        if (b === 0) return "Erro"
        return a / b
    }
}

function calculateResult() {
    if (previousValue === null || operator === null) return

    const result = calculate(
        Number(previousValue),
        operator,
        Number(currentValue)
    )

    addToHistory(previousValue, operator, currentValue, result)

    currentValue = String(result)

    expression = currentValue

    previousValue = null
    operator = null
    shouldResetScreen = true

    updateDisplay()
}

numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText

        if (shouldResetScreen) {
            currentValue = value
            expression = value
            shouldResetScreen = false
        } else {
            if (currentValue === "0") {
                currentValue = value
            } else {
                currentValue += value
            }
        }

        if (previousValue !== null && operator !== null) {
            expression = `${previousValue} ${formatOperator(operator)} ${currentValue}`
        } else {
            expression = currentValue
        }

        updateDisplay()
    })
})

operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const op = mapOperator(btn.innerText)

        if (previousValue !== null && operator !== null) {
            const result = calculate(
                Number(previousValue),
                operator,
                Number(currentValue)
            )

            currentValue = String(result)

            addToHistory(previousValue, operator, currentValue, result)
        }

        previousValue = currentValue
        operator = op

        expression = `${previousValue} ${btn.innerText}`

        shouldResetScreen = true

        updateDisplay()
    })
})

equalsButton.addEventListener("click", calculateResult)

actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.innerText

        if (action === "AC") {
            previousValue = null
            currentValue = "0"
            operator = null
            history = []
            expression = ""
            shouldResetScreen = false
            updateDisplay()
        }
    })
})

updateDisplay()
