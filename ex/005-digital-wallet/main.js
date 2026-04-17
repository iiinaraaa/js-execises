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

//isso adiciona historico, conta, tipo, valor e a descricao vai mandar o papo de onde que ta vindo
function adicionarHistorico(conta, tipo, valor, descricao = "") {
    conta_do_banco[conta].historico.push ({
        tipo: tipo,
        valor: valor,
        descricao,
        conta,
        data: new Date().toLocaleString()
    })
}

function pegarIcone(descricao, tipo) {
    if (tipo === "saida") return "assets/img/historyIcons/arrowTakeMoneyHistory.svg"

    if (tipo === "rendimento") return "assets/img/historyIcons/renderHistory.svg"

    if (tipo === "entrada") {
        //includes > se a descricao for recebido de lazer, acha a palavra lazer e retorna true :D
        if (descricao.includes("lazer")) return "assets/img/historyIcons/lazerHistory.svg"

        if (descricao.includes("pet")) return "assets/img/historyIcons/petHistory.svg"

        if (descricao.includes("faculdade")) return "assets/img/historyIcons/faculdadeHistory.svg"

        return "assets/img/historyIcons/putMoneyHistory.svg"
    }
    return "assets/img/historyIcons/walletHistory.svg"
}

//function de transacao de dinheiro
function transacao_financeira(de_conta, para_conta, valor) {
    //saida
    if (de_conta) {
        conta_do_banco[de_conta].saldo -= valor
        adicionarHistorico(de_conta, "saida", valor, `enviado para ${para_conta || "fora do sistema"}`)
    }

    //entrada
    if (para_conta) {
        conta_do_banco[para_conta].saldo += valor
        adicionarHistorico(para_conta, "entrada", valor, `recebido de ${de_conta || "deposito"}`)
    }

    //atualizando a tela
    if (de_conta) {
        document.getElementById(de_conta).innerText = conta_do_banco[de_conta].saldo
    }

    if(para_conta) {
        document.getElementById(para_conta).innerText = conta_do_banco[para_conta].saldo
    }
}

function adicionarDinheiro() {
    let valor = Number(prompt("Qual valor voce deseja adicionar?"))

    if (!valorValido(valor)) return

    //function que faz a transacao funcionar
    transacao_financeira(null, "conta_corrente", valor)
}

function separar(caixinha) {
    let valor = Number(prompt("quanto voce deseja separar?"))

    if (!valorValido(valor)) return

    if (valor > conta_do_banco.conta_corrente.saldo) {
        alert("voce nao tem dinheiro suficiente!")
        return
    }

    //function que faz a transacao funcionar
    transacao_financeira("conta_corrente", caixinha, valor)
}

function registrarRendimento(caixinha, valorRendido) {
    if (valorRendido <= 0) return

    conta_do_banco.conta_corrente.historico.push ({
        tipo: "rendimento",
        valor: valorRendido,
        descricao: `rendimento na caixinha ${caixinha}`,
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

    if (valor > conta_do_banco[categoria].saldo) {
        alert("saldo insuficiente, adicione mais dinheiro!!")
        return
    }

    //function que faz a transacao funcionar
    transacao_financeira(categoria, "conta_corrente", valor)

    alert("dinheiro retirado com sucesso!!!")   
}

//parte que mostra o historico, e tudo que nele funciona
function mostrarHistorico() {
    let div = document.getElementById("lista_historico")
    div.innerHTML = ""

    conta_do_banco.conta_corrente.historico.map((elemento) => {

    let texto = elemento.descricao || elemento.tipo

    let icone = pegarIcone(texto, elemento.tipo)

    
    div.innerHTML += `
        <div class="historico-item ${elemento.tipo}">

        <div class="historico-left">

            <img class="historico-icon src="${icone}>

            <div class="historico-texto"> 
                <span class="historico-descricao">${texto}</span>
                <span class="historico-data">${elemento.data}</span>
            </div>
            
        </div>

        <div class="historico-valor">
            R$ ${elemento.valor}
        </div>

        </div>
        `
    })

    document.getElementById("tela_historico").style.display = "flex"
}

function fecharHistorico() {
    document.getElementById("tela_historico").style.display = "none"
}