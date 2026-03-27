let saldo = 0
let lazer = 0
let pet = 0
let faculdade = 0

function valorValido(valor) {
    if (isNaN(valor) || valor <= 0) {
        alert("digite um valor valido maior que 0!")
        return false
    }
    return true
}

function adicionarDinheiro() {
    let valor = Number(prompt("Qual valor voce deseja adicionar?"))

    if (!valorValido(valor)) return

    saldo += valor
    document.getElementById("saldo").innerText = saldo
}

function separar(caixinha) {
    let valor = Number(prompt("quanto voce deseja separar?"))

    if (!valorValido(valor)) return

    if (valor > saldo) {
        alert("voce nao tem dinheiro suficiente!")
        return
    }

    saldo = saldo - valor

    //se usa switch quando tem varias coisas de uma mesma coisa! nesse caso a caixinha tem 3 coisas
    //isso muda dependendo de algo? sim: switch, nao: fora/sem switch
    switch (caixinha) {
        case "lazer":
            lazer += valor
            document.getElementById("lazer").innerText = lazer
            break

        case "pet":
            pet += valor
            document.getElementById("pet").innerText = pet
            break

        case "faculdade":
            faculdade += valor
            document.getElementById("faculdade").innerText = faculdade
            break
    }

    document.getElementById("saldo").innerText = saldo
}

function render() {
    if (lazer > 0) {
        lazer = Number((lazer * 1.10).toFixed(2))
        //manti dentro de number pra continuar sendo numero e n virar string com o tofixed
    }

    if (pet > 0) {
        pet = Number((pet * 1.10).toFixed(2))
    }

    if (faculdade > 0) {
        faculdade = Number((faculdade * 1.10).toFixed(2))
    }

    document.getElementById("lazer").innerText = lazer
    document.getElementById("pet").innerText = pet
    document.getElementById("faculdade").innerText = faculdade

    if (lazer === 0 && pet === 0 && faculdade === 0) {
        alert("saldo insuficiente para render, adicione mais dinheiro!")
    }
}

function mostrarOpcoes() {
    document.getElementById("opcoes").style.display = "block"
    //isso tbm podia fzr no css mas agr sou javascripter
}

function retirar(categoria) {
    let valor = parseFloat(prompt("qual valor voce quer retirar?"))
    //manter esse parsefloat pq ele que deixa ser numero e n string tipo 10 + 2 = 102

    if (!valorValido(valor)) return

    //add switch deixa mais legivel e menos repetitivo com if else if else if elseee
    switch (categoria) {
        case "lazer":
            if (valor > lazer) return alert("saldo insuficiente, adicione mais dinheiro!!")
            lazer -= valor
            document.getElementById("lazer").innerText = lazer
            break

        case "pet":
            if (valor > pet) return alert("saldo insuficiente, adicione mais dinheiro!!")
            pet -= valor
            document.getElementById("pet").innerText = pet
            break

        case "faculdade":
            if (valor > faculdade) return alert("saldo insuficiente, adicione mais dinheiro!!")
            faculdade -= valor
            document.getElementById("faculdade").innerText = faculdade
            break
            //guanabara disse pra sempre por break mesmo no final
    }

    saldo += valor
    //mesma coisa que saldo = saldo + valor!!!
    document.getElementById("saldo").innerText = saldo

    alert("dinheiro retirado com sucesso!!!")
}