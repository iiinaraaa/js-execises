const resultElement = document.querySelector(".calculator__display-result")
const historyElement = document.querySelector(".calculator__display-history")

const numberButtons = document.querySelectorAll(".btn-number")
const operatorButtons = document.querySelectorAll(".btn-operator")
const equalsButton = document.querySelector(".btn-equals")
const actionButtons = document.querySelectorAll(".btn-action")

// eh let pq pode mudar o valor, nesse caso o valor1, operador e valor2
let previousValue = null
let currentValue = "0"
let operator = null
let history = []

let expression = ""

let shouldResetScreen = false

// essa parte guarda a conta visual que aparece conforme vai digitando
let expression = ""

// controla quando a tela vai ser resetada, tipo quando der 10 ai vc vai colocar 8, deve ficar so o 8, e nao 108
let shouldResetScreen = false

// os operadores que o JS entende (o que vai pra conta)
const Operator = Object.freeze({
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "*",
    DIVIDE: "/"
})

// os simbolos que aparecem pra gente na calculadora
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

//funcao que atualiza a tela pra fzr novas continhas
function updateDisplay() {
    //mostra a conta inteira enquanto digita
    // || usa o da esquerda se existir
    resultElement.innerText = expression || currentValue

    //historico em colunas
    historyElement.innerHTML = history
        //map aqui vai percorrer por cada item do array, tipo 1 + 1 = 2
        .map(item => `<div class="history-item">${item}</div>`)
        //join junta tudo numa string so
        .join("")
}

//isso aqui traduz os simbolos da tela pra algo que o JS entenda
function mapOperator(op) {
    if (op === OperatorSymbol.ADD) return Operator.ADD
    if (op === OperatorSymbol.DIVIDE) return Operator.DIVIDE
    if (op === OperatorSymbol.MULTIPLY) return Operator.MULTIPLY
    if (op === OperatorSymbol.SUBTRACT) return Operator.SUBTRACT
}

//mesma coisa que o de cima mas ao contrario, esse aqui traduz pra gente
function formatOperator(op) {
    if (op === Operator.MULTIPLY) return OperatorSymbol.MULTIPLY
    if (op === Operator.DIVIDE) return OperatorSymbol.DIVIDE
    if (op === Operator.SUBTRACT) return OperatorSymbol.SUBTRACT

    return op

}

}

//joga a conta feita pro historico
// unshift adiciona no comeco, pop tira do final
function addToHistory(previousValue, operator, currentValue, result) {
    history.unshift(
        `${previousValue} ${formatOperator(operator)} ${currentValue} = ${result}`
    )

    //mantem no maximo 2 historicos
    if (history.length > 2) {
        history.pop()
    }
}

//parte que calcula
function calculate(a, operator, b) {
    if (operator === Operator.ADD) return a + b
    if (operator === Operator.SUBTRACT) return a - b
    if (operator === Operator.MULTIPLY) return a * b

    if (operator === Operator.DIVIDE) {
        if (b === 0) return "Erro"
        return a / b
    }
}

//quando clica no =
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

//atualiza o valor dependendo do numero que tu clica na calculadora
numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText

        if (shouldResetScreen) {
            currentValue = value
            expression = value
            shouldResetScreen = false
        } else {
            //nao deixa zero na frente
            if (currentValue === "0") {
                currentValue = value
            } else {
                currentValue += value
            }
        }

        if (previousValue !== null && operator !== null) {
        //monta a conta visualmente enquanto digita
        if (previousValue !== null && operator !== null) {
            // expression eh oq guarda visualmente o numero, ai nesse caso ele printa essas coisas aqui
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

//essa parte eh a mesma coisa de cima, mas eh com os operadores
operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        //essa parte que atualiza, vai virar o operador que vc clicar
        const op = mapOperator(btn.innerText)

        //se ja existir um numero anterior e um operador, calcula a operação antes de continuar
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

            //manda pro historico ANTES de sobrescrever o currentValue, senao a conta sai errada
            addToHistory(previousValue, operator, currentValue, result)

            //transformar em string pq na hora do innerText parece que fica certo assim
            currentValue = String(result)
        }

        //guarda o primeiro numero e o operador, e prepara a tela pra digitar o segundo numero
        previousValue = currentValue
        operator = op

        //mantem aparecendo a conta
        expression = `${previousValue} ${btn.innerText}`

        shouldResetScreen = true

        updateDisplay()
    })
})

equalsButton.addEventListener("click", calculateResult)

//quando clica ele mostra o resultado
equalsButton.addEventListener("click", calculateResult)

//bloco de botoes de acao. o AC eh um caso especial, mas ta nessa lista junto
actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.innerText

        //quando clica no AC limpa tudo, deixa tudo limpinho pro novo calculo
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

//mostra o estado inicial assim que carrega
updateDisplay()
