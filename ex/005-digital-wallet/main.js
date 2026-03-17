let saldo = 0
let lazer = 0
let pet = 0
let faculdade = 0

function adicionarDinheiro() {
    let valor = Number(prompt("Qual valor voce deseja adicionar?"))

    saldo = saldo + valor

    document.getElementById("saldo").innerText = saldo

    if (valor <= 0) {
        alert("Adicione um valor que nao seja negativo")

        document.getElementById("saldo").innerText = 0
    }

    if (valor !=Number) {
        alert("Por favor, digite um valor")

        document.getElementById("saldo").innerText = 0
    }
}

function separar(caixinha) {
    let valor = Number(prompt("quanto voce deseja separar?"))

    if (valor > saldo) {
        alert("voce nao tem dinheiro suficiente!")
        return
    }

    saldo = saldo - valor

    if (caixinha === "lazer") {
        lazer = lazer + valor
        document.getElementById("lazer").innerText = lazer
    }

    if (caixinha === "pet") {
        pet = pet + valor
        document.getElementById("pet").innerText = pet
    }

    if (caixinha === "faculdade") {
        faculdade = faculdade +  valor
        document.getElementById("faculdade").innerText = faculdade
    }

    document.getElementById("saldo").innerText = saldo
}

//if dinheiro < saldo = nao tem money ✅
//if dinheiro <= zero = vc nao tem dinheiro suficiente, adicione mais dinheiro, e tbm n deixar numero negativo ✅
// if dinheiro !number = adicione um valor, letras nao sao numeros... ✅


// mas deixar escrever . ex: 15.50?????????????????????????
//regex


//fzr um botao que resgata dinheiro das caixinhas e devolve pro saldo