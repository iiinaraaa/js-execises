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

    atualizarHistorico()
}

function pegarIcone(descricao, tipo) {
    if (tipo === "saida") return ("assets/img/historyIcons/takeMoneyHistory.svg")

    if (tipo === "rendimento") return ("./assets/img/historyIcons/renderHistory.svg")

    if (tipo === "entrada") {
        //includes > se a descricao for recebido de lazer, acha a palavra lazer e retorna true :D
        if (descricao.includes("lazer")) return ("./assets/img/historyIcons/lazerHistory.svg")

        if (descricao.includes("pet")) return ("./assets/img/historyIcons/petHistory.svg")

        if (descricao.includes("faculdade")) return "assets/img/historyIcons/faculdadeHistory.svg"

        return "assets/img/historyIcons/putMoneyHistory.svg"
    }
    return "assets/img/historyIcons/walletHistory.svg"
}

//historico 
function atualizarHistorico() {
    if (!historicoAberto) return

    let div = document.getElementById("lista_historico")
    div.innerHTML = ""

    //isso pega TODAS as chaves do objeto, coisa nova!!
    Object.keys(conta_do_banco).map((conta) => {

        conta_do_banco[conta].historico.map((elemento) => {

            // mesma coisa que esse map:
            // let chaves = Object.keys(conta_do_banco)

            // for (let i = 0; i < chaves.length; i++) {
            //     let conta = chaves[i]
            // }

            let textoDesc = elemento.descricao || elemento.tipo
            let iconeItem = pegarIcone(textoDesc, elemento.tipo)

            div.innerHTML += `
                <div class="historico-item ${elemento.tipo}">
                    <div class="historico-left">
                        <img class="historico-icon" src="${iconeItem}">
                        <div class="historico-texto">
                            <span class="historico-descricao">
                                ${textoDesc}
                            </span>
                            <span class="historico-data">${elemento.data}</span>
                        </div>
                    </div>

                    <div class="historico-valor">
                        R$ ${elemento.valor}
                    </div>
                </div>
            `
        })
    })
}

//function de transacao de dinheiro
function transacao_financeira(de_conta, para_conta, valor) {

    //saida
    if (de_conta) {
        conta_do_banco[de_conta].saldo -= valor

        let descricaoSaida = ""

        if (!para_conta) {
            // saque da conta
            descricaoSaida = "saque"
        } else if (de_conta === "conta_corrente") {
            // mandando pra caixinha
            descricaoSaida = `deposito em caixinha ${para_conta}`
        } else {
            // retirando da caixinha
            descricaoSaida = `retirado da caixinha ${de_conta}`
        }

        adicionarHistorico(de_conta, "saida", valor, descricaoSaida)
    }

    //entrada
    if (para_conta) {
        conta_do_banco[para_conta].saldo += valor

        let descricaoEntrada = ""

        if (!de_conta) {
            // dinheiro vindo de fora
            descricaoEntrada = "recebido na conta"
        } else if (para_conta === "conta_corrente") {
            // veio da caixinha
            descricaoEntrada = `recebido da caixinha ${de_conta}`
        } else {
            // entrou na caixinha
            descricaoEntrada = `deposito em caixinha ${para_conta}`
        }

        adicionarHistorico(para_conta, "entrada", valor, descricaoEntrada)
    }

    //atualizando a tela
    if (de_conta) {
        document.getElementById(de_conta).innerText = conta_do_banco[de_conta].saldo.toFixed(2)
    }

    if(para_conta) {
        document.getElementById(para_conta).innerText = conta_do_banco[para_conta].saldo.toFixed(2)
    }
}

function adicionarDinheiro() {
    let valor = parseFloat(prompt("Qual valor voce deseja adicionar?"))

    if (!valorValido(valor)) return

    //function que faz a transacao funcionar
    transacao_financeira(null, "conta_corrente", valor)
}

function sacarDinheiro() {
    let valor = parseFloat(prompt("Qual valor voce deseja sacar?"))

    if (!valorValido(valor)) return

    if (valor > conta_do_banco.conta_corrente.saldo) {
        alert("saldo insuficiente")
        return
    }

    transacao_financeira("conta_corrente", null, valor)

    alert("dinheiro sacado com sucesso!")
}

function separar(caixinha) {
    let valor = parseFloat(prompt("quanto voce deseja separar?"))

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

    conta_do_banco[caixinha].saldo += valorRendido

    adicionarHistorico(
        caixinha,
        "rendimento",
        valorRendido,
        `rendimento na caixinha ${caixinha}`
    )
}

//parte de render
function render() {

    //aplica rendimento nas caixinhas
    function aplicarRendimento(caixinha) {
        let saldoAntes = conta_do_banco[caixinha].saldo
        
        if (saldoAntes <= 0) return

        let rendimento = parseFloat((saldoAntes * 0.10).toFixed(2))

        //essa parte eh responsavel pra mandar pro historico
        registrarRendimento(caixinha, rendimento) 
    }

    //aplica a function nas caixinhas
    aplicarRendimento("lazer")
    aplicarRendimento("pet")
    aplicarRendimento("faculdade")

    //aqui so atualiza :)
    document.getElementById("lazer").innerText = conta_do_banco.lazer.saldo.toFixed(2)
    document.getElementById("pet").innerText = conta_do_banco.pet.saldo.toFixed(2)
    document.getElementById("faculdade").innerText = conta_do_banco.faculdade.saldo.toFixed(2)

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

    //isso faz com que o valor nao quebre quando for retirado da caixinha
    valor = parseFloat(valor.toFixed(2))

    //function que faz a transacao funcionar
    transacao_financeira(categoria, "conta_corrente", valor)

    alert("dinheiro retirado com sucesso!!!")   
}

//false == fechado
//true == aberto
//tipo um interruptor
let historicoAberto = false

//essa funcao acontece quando se clica no botao
//toggle == alterar em ingles (palavra nova)
function toggleHistorico() {
    let tela = document.getElementById("tela_historico")
    let texto = document.getElementById("textoHistorico")
    let icone = document.getElementById("iconHistorico")

    historicoAberto = !historicoAberto
    //se era false, vira true
    //se era true vira false (muito legal isso)

    if (historicoAberto) {

        atualizarHistorico()

        tela.style.display = "flex"
        texto.textContent = "Fechar histórico"
        icone.src = "assets/img/close.svg"

    } else {
        //se fechar o historico >>>>
        tela.style.display = "none"
        texto.textContent = "Ver Historico"
        icone.src = "assets/img/history.svg"
    }
}