//no README coloquei a diferenca de const x let
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
let shouldResetScreen = false

//funcao que limpa a tela pra fzr novas continhas
function updateDisplay() {
  resultElement.innerText = currentValue
  historyElement.innerText = history
}

//isso aqui traduz os operadores pra algo que o JS entenda
//mapOperator pra pegar o operador e traduzir ele
function mapOperator(op) {
  if (op === "÷") return "/"
  if (op === "×") return "*"
  if (op === "−") return "-"
  return op
}

//parte que calcula
function calculate(a, b, operator) {
  if (operator === "+") return a + b
  if (operator === "-") return a - b
  if (operator === "*") return a * b

  if (operator === "/") {
    if (b === 0) return "Erro"
    return a / b
  }
}

//quando clica no =
function calculateResult() {
  if (previousValue === null || operator === null) return

  const result = calculate(
    Number(previousValue),
    Number(currentValue),
    operator
  )

  //obviamente parte que puxa pro historico
  history.push(`${previousValue} ${operator} ${currentValue} = ${result}`)

  currentValue = String(result)
  previousValue = null
  operator = null
  shouldResetScreen = true

  updateDisplay()
}

//nao sei como posso explicar isso, mas ele atualiza o valor dependendo do numero que tu clica na calculadora
numberButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.innerText

    if (shouldResetScreen) {
      currentValue = value
      shouldResetScreen = false
    } else {
        //nao deixa zero na frente
      if (currentValue === "0") {
        currentValue = value
      } else {
        currentValue += value
      }
    }

    updateDisplay()
  })
})














//essa parte eh a mesma coisa de cima, mas eh com os operadores
operatorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    //essa parte que atualiza, vai virar o operador que vc clicar
    const op = mapOperator(btn.innerText)

    //se ja existir um numero anterior e um operador, calcula a operação antes de continuar
    if (previousValue !== null && operator !== null) {
      const result = calculate(
        Number(previousValue),
        Number(currentValue),
        operator
      )

      //transformar em string pq na hora do innerText parece que fica certo assim
      currentValue = String(result)

      //essa parte manda pro history
      history.push(`${previousValue} ${operator} ${btn.innerText} ${currentValue} = ${result}`)
    }

    //guarda o primeiro numero e o operador, e prepara a tela pra digitar o segundo numero
    previousValue = currentValue
    operator = op
    shouldResetScreen = true
  })
})

//quando clica ele mostra o resultado
equalsButton.addEventListener("click", calculateResult)

//isso faz parte de um bloco todo de botoes que fazem acoes, o AC eh um caso diferente, mas ainda esta nessa lista, se fosse fazer de outra forma, teria que fazer de cada um dos botoes... ate onde eu entendi ne
actionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.innerText

    //quando clica no AC limpa tudo, deixa tudo limpinho pro novo calculo
    if (action === "AC") {
      previousValue = null
      currentValue = "0"
      operator = null
      history = []
      shouldResetScreen = false
      updateDisplay()
    }
  })
})

//apaga tudo pra comecar novo calculo
updateDisplay()