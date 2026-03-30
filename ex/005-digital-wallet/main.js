let conta_do_banco = {
    "conta_corrente" : {
        "nome": "Conta Corrente",
        "saldo": 0,
        "historico": []
    },
    "lazer" :{
        "nome": "Caixinha - Lazer",
        "saldo": 0,
        "historico": []
    },
    "pet": {
        "nome": "Caixinha - Pet",
        "saldo": 0,
        "historico": []
    },
    "faculdade": {
        "nome": "Caixinha - Faculdade",
        "saldo": 0,
        "historico": []
    },
}

console.log(">>>>>>>>>>>> conta_do_banco", conta_do_banco);
// conta_do_banco["conta_corrente"].saldo += 10;
console.log(">>>>>>>>>>>> conta_do_banco", conta_do_banco);

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

    conta_do_banco.conta_corrente.saldo += valor
    conta_do_banco.conta_corrente.historico.push(valor);
    document.getElementById("conta_corrente").innerText = conta_do_banco.conta_corrente.saldo

    document.getElementById("conta_corrente_historico").innerHTML = ""    
    conta_do_banco.conta_corrente.historico.map((entrada) => {
        document.getElementById("conta_corrente_historico").innerHTML = document.getElementById("conta_corrente_historico").innerHTML + ` <p class="historico">Entrada: ${entrada}</p>`
    })
}

function separar(caixinha) {
    let valor = Number(prompt("quanto voce deseja separar?"))

    if (!valorValido(valor)) return

    if (valor > conta_do_banco.conta_corrente.saldo) {
        alert("voce nao tem dinheiro suficiente!")
        return
    }

    conta_do_banco.conta_corrente.saldo -= valor

    //se usa switch quando tem varias coisas de uma mesma coisa! nesse caso a caixinha tem 3 coisas
    //isso muda dependendo de algo? sim: switch, nao: fora/sem switch
    switch (caixinha) {
        case "lazer":
            conta_do_banco.lazer.saldo += valor
            document.getElementById("lazer").innerText = conta_do_banco.lazer.saldo
            break

        case "pet":
            conta_do_banco.pet.saldo += valor
            document.getElementById("pet").innerText = conta_do_banco.pet.saldo
            break

        case "faculdade":
            conta_do_banco.faculdade.saldo += valor
            document.getElementById("faculdade").innerText = conta_do_banco.faculdade.saldo
            break
    }

    document.getElementById("conta_corrente").innerText = conta_do_banco.conta_corrente.saldo
}

function render() {
    if (conta_do_banco.lazer.saldo > 0) {
        conta_do_banco.lazer.saldo = Number((conta_do_banco.lazer.saldo * 1.10).toFixed(2))
        //manti dentro de number pra continuar sendo numero e n virar string com o tofixed
    }

    if (conta_do_banco.pet.saldo > 0) {
        conta_do_banco.pet.saldo = Number((conta_do_banco.pet.saldo * 1.10).toFixed(2))
    }

    if (conta_do_banco.faculdade.saldo > 0) {
        conta_do_banco.faculdade.saldo = Number((conta_do_banco.faculdade.saldo * 1.10).toFixed(2))
    }

    document.getElementById("lazer").innerText = conta_do_banco.lazer.saldo
    document.getElementById("pet").innerText = conta_do_banco.pet.saldo
    document.getElementById("faculdade").innerText = conta_do_banco.faculdade.saldo

    if (conta_do_banco.lazer.saldo === 0 && conta_do_banco.pet.saldo === 0 && conta_do_banco.faculdade.saldo === 0) {
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
    // switch (categoria) {
    //     case "lazer":
    //         if (valor > conta_do_banco.lazer.saldo) return alert("saldo insuficiente, adicione mais dinheiro!!")
    //         conta_do_banco.lazer.saldo -= valor
    //         document.getElementById("lazer").innerText = conta_do_banco.lazer.saldo
    //         break

    //     case "pet":
    //         if (valor > conta_do_banco.pet.saldo) return alert("saldo insuficiente, adicione mais dinheiro!!")
    //         conta_do_banco.pet.saldo -= valor
    //         document.getElementById("pet").innerText = conta_do_banco.pet.saldo
    //         break

    //     case "faculdade":
    //         if (valor > conta_do_banco.faculdade.saldo) return alert("saldo insuficiente, adicione mais dinheiro!!")
    //         conta_do_banco.faculdade.saldo -= valor
    //         document.getElementById("faculdade").innerText = conta_do_banco.faculdade.saldo
    //         break
    //         //guanabara disse pra sempre por break mesmo no final
    // }

    if (valor > conta_do_banco[categoria].saldo) return alert("saldo insuficiente, adicione mais dinheiro!!")
    conta_do_banco[categoria].saldo -= valor
    document.getElementById(categoria).innerText = conta_do_banco[categoria].saldo



    conta_do_banco.conta_corrente.saldo += valor
    //mesma coisa que saldo = saldo + valor!!!
    document.getElementById("conta_corrente").innerText = conta_do_banco.conta_corrente.saldo

    alert("dinheiro retirado com sucesso!!!")
}
