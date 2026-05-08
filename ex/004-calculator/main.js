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

// essa parte guarda a conta visual que aparece conforme vai digitando
let expression = ""

// controla quando a tela vai ser resetada, tipo quando der 10 ai vc vai colocar 8, deve ficar so o 8, e nao 108
let shouldResetScreen = false

//funcao que limpa a tela pra fzr novas continhas
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

//isso aqui traduz os operadores pra algo que o JS entenda
//mapOperator pra pegar o operador e traduzir ele
function mapOperator(op) {
  if (op === "÷") return "/"
  if (op === "×") return "*"
  if (op === "−") return "-"
  return op
}

//mesma coisa que o de cima mas ao contrario, o de cima traduz pro js, esse aqui traduz pra gente
function formatOperator(op) {
  if (op === "*") return "×"
  if (op === "/") return "÷"
  if (op === "-") return "−"

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
  // unshift eh um metodo de array que adiciona um item no comeco, pop eh pra tirar
  history.unshift(
    `${previousValue} ${formatOperator(operator)} ${currentValue} = ${result}`
  )

  //mantem no maximo 2 historicos
  if (history.length > 2) {
    history.pop()
  }

  currentValue = String(result)

  expression = currentValue

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
      history.unshift(
        `${previousValue} ${formatOperator(operator)} ${currentValue} = ${result}`
      )

      //mantem no maximo 2 historicos
      if (history.length > 2) {
        history.pop()
      }
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
      expression = ""
      shouldResetScreen = false
      updateDisplay()
    }
  })
})

//apaga tudo pra comecar novo calculo
updateDisplay()