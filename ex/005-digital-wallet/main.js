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

function valorValido(valor) {
    if (isNaN(valor) || valor <= 0) {
        alert("digite um valor valido maior que 0!")
        return false
    }
    return true
}

function adicionarHistorico(conta, tipo, valor) {
    conta_do_banco[conta].historico.push ({
        tipo: tipo,
        valor: valor,
        data: new Date().toLocaleString()
    })
}

function adicionarDinheiro() {
    let valor = Number(prompt("Qual valor voce deseja adicionar?"))

    if (!valorValido(valor)) return

    conta_do_banco.conta_corrente.saldo += valor

    adicionarHistorico("conta_corrente", "entrada", valor)

    document.getElementById("conta_corrente").innerText = conta_do_banco.conta_corrente.saldo

    document.getElementById("conta_corrente_historico").innerHTML = ""    
    conta_do_banco.conta_corrente.historico.map((entrada) => {
        document.getElementById("conta_corrente_historico").innerHTML += `<p class="historico">Entrada: ${entrada.valor}</p>`
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
    conta_do_banco[caixinha].saldo += valor

    adicionarHistorico("conta_corrente", "saida", valor)
    adicionarHistorico(caixinha, "entrada", valor)

    document.getElementById(caixinha).innerText = conta_do_banco[caixinha].saldo
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

function retirar(categoria) {
    let valor = parseFloat(prompt("qual valor voce quer retirar?"))
    //manter esse parsefloat pq ele que deixa ser numero e n string tipo 10 + 2 = 102

    if (!valorValido(valor)) return

    if (valor > conta_do_banco[categoria].saldo) return alert("saldo insuficiente, adicione mais dinheiro!!")
    conta_do_banco[categoria].saldo -= valor
    conta_do_banco.conta_corrente.saldo += valor

    adicionarHistorico(categoria, "saida", valor)
    adicionarHistorico("conta_corrente", "entrada", valor)

    document.getElementById(categoria).innerText = conta_do_banco[categoria].saldo
    document.getElementById("conta_corrente").innerText = conta_do_banco.conta_corrente.saldo

    alert("dinheiro retirado com sucesso!!!")   
}

function mostrarHistorico() {
    let div = document.getElementById("lista_historico")
    div.innerHTML = ""

    conta_do_banco.conta_corrente.historico.map((elemento, index) => {
        div.innerHTML += `<p class=historico> ${elemento.tipo} - R$ ${elemento.valor} <br> ${elemento.data} </p>`
    })

    document.getElementById("tela_historico").style.display = "block"
}

function fecharHistorico() {
    document.getElementById("tela_historico").style.display = "none"
}