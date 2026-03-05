let saldo = 0
let lazer = 0
let pet = 0
let faculdade = 0

function adicionarDinheiro() {
    let valor = Number(prompt("Qual valor voce deseja adicionar?"))

    saldo = saldo + valor

    document.getElementById("saldo").innerText = saldo
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