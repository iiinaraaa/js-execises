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

function registrarRendimento(caixinha, valorRendido) {
    if (valorRendido <= 0) return

    conta_do_banco.conta_corrente.historico.push ({
        tipo: "rendimento",
        valor: valorRendido,
        //essa origem esta sendo usada na parte do historico!
        data: new Date().toLocaleString()
    })
}

//parte de render
function render() {

    //aplica rendimento nas caixinhas
    function aplicarRendimento(caixinha) {
        let saldoAntes = conta_do_banco[caixinha].saldo
        
        if (saldoAntes <= 0) return

        let saldoDepois = Number((saldoAntes * 1.10).toFixed(2))
        let rendimento = Number((saldoDepois - saldoAntes).toFixed(2))

        conta_do_banco[caixinha].saldo = saldoDepois

        //essa parte eh responsavel pra mandar pro historico
        registrarRendimento(caixinha, rendimento) 
    }

    //aplica a function nas caixinhas
    aplicarRendimento("lazer")
    aplicarRendimento("pet")
    aplicarRendimento("faculdade")

    //aqui so atualiza :)
    document.getElementById("lazer").innerText = conta_do_banco.lazer.saldo
    document.getElementById("pet").innerText = conta_do_banco.pet.saldo
    document.getElementById("faculdade").innerText = conta_do_banco.faculdade.saldo

    //obviamente se for zero alerta
    if (conta_do_banco.lazer.saldo === 0 && conta_do_banco.pet.saldo === 0 && conta_do_banco.faculdade.saldo === 0) {
        alert("saldo insuficiente para render, adicione mais dinheiro!")
    }
}

//retirada de dinheiro da caixinha
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

//parte que mostra o historico, e tudo que nele funciona
function mostrarHistorico() {
    let div = document.getElementById("lista_historico")
    div.innerHTML = ""


    //map its an for but its maaaagic, better then for
    conta_do_banco.conta_corrente.historico.map((elemento, index) => {
        let texto = ""

        if (elemento.tipo === "entrada") {
            div.innerHTML += `<p class="historico entrada"> Entrada: R$ ${elemento.valor} <br> ${elemento.data} </p>`
        }

        if (elemento.tipo === "saida") {
            div.innerHTML += `<p class="historico saida"> Saida: R$ ${elemento.valor} <br> ${elemento.data} </p>`
        }

        if (elemento.tipo === "rendimento") {
            div.innerHTML += `<p class="historico rendimento"> Rendimento: R$ ${elemento.valor} <br> ${elemento.data} </p>`
        }
    })

    document.getElementById("tela_historico").style.display = "flex"
}

function fecharHistorico() {
    document.getElementById("tela_historico").style.display = "none"
}