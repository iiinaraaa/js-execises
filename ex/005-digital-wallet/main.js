//salvar no localStorage
function salvarDados() {
    localStorage.setItem("carteira", JSON.stringify(conta_do_banco));
}

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

//carregar dados salvos
let dadosSalvos = JSON.parse(localStorage.getItem("carteira"));

if (dadosSalvos) {
    conta_do_banco = dadosSalvos;
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
    salvarDados() //salva sempre que mexe no historico
}

function pegarIcone(descricao, tipo) {
    if (tipo === "saida") return ("assets/img/historyIcons/takeMoneyHistory.svg")

    if (tipo === "rendimento") return ("./assets/img/historyIcons/renderHistory.svg")

    if (tipo === "entrada") {
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

    Object.keys(conta_do_banco).map((conta) => {

        conta_do_banco[conta].historico.map((elemento) => {

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
            descricaoSaida = "saque"
        } else if (de_conta === "conta_corrente") {
            descricaoSaida = `deposito em caixinha ${para_conta}`
        } else {
            descricaoSaida = `retirado da caixinha ${de_conta}`
        }

        adicionarHistorico(de_conta, "saida", valor, descricaoSaida)
    }

    //entrada
    if (para_conta) {
        conta_do_banco[para_conta].saldo += valor

        let descricaoEntrada = ""

        if (!de_conta) {
            descricaoEntrada = "recebido na conta"
        } else if (para_conta === "conta_corrente") {
            descricaoEntrada = `recebido da caixinha ${de_conta}`
        } else {
            descricaoEntrada = `deposito em caixinha ${para_conta}`
        }

        adicionarHistorico(para_conta, "entrada", valor, descricaoEntrada)
    }

    if (de_conta) {
        document.getElementById(de_conta).innerText = conta_do_banco[de_conta].saldo.toFixed(2)
    }

    if(para_conta) {
        document.getElementById(para_conta).innerText = conta_do_banco[para_conta].saldo.toFixed(2)
    }

    salvarDados() //salva depois de qualquer transacao
}

function adicionarDinheiro() {
    let valor = parseFloat(prompt("Qual valor voce deseja adicionar?"))

    if (!valorValido(valor)) return

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

    salvarDados() //salva rendimento
}

//parte de render
function render() {

    function aplicarRendimento(caixinha) {
        let saldoAntes = conta_do_banco[caixinha].saldo
        
        if (saldoAntes <= 0) return

        let rendimento = parseFloat((saldoAntes * 0.10).toFixed(2))

        registrarRendimento(caixinha, rendimento) 
    }

    aplicarRendimento("lazer")
    aplicarRendimento("pet")
    aplicarRendimento("faculdade")

    document.getElementById("lazer").innerText = conta_do_banco.lazer.saldo.toFixed(2)
    document.getElementById("pet").innerText = conta_do_banco.pet.saldo.toFixed(2)
    document.getElementById("faculdade").innerText = conta_do_banco.faculdade.saldo.toFixed(2)

    if (conta_do_banco.lazer.saldo === 0 && conta_do_banco.pet.saldo === 0 && conta_do_banco.faculdade.saldo === 0) {
        alert("saldo insuficiente para render, adicione mais dinheiro!")
    }
}

//retirada de dinheiro da caixinha
function retirar(categoria) {
    let valor = parseFloat(prompt("qual valor voce quer retirar?")) 

    if (!valorValido(valor)) return

    if (valor > conta_do_banco[categoria].saldo) {
        alert("saldo insuficiente, adicione mais dinheiro!!")
        return
    }

    valor = parseFloat(valor.toFixed(2))

    transacao_financeira(categoria, "conta_corrente", valor)

    alert("dinheiro retirado com sucesso!!!")   
}

let historicoAberto = false

function toggleHistorico() {
    let tela = document.getElementById("tela_historico")
    let texto = document.getElementById("textoHistorico")
    let icone = document.getElementById("iconHistorico")

    historicoAberto = !historicoAberto

    if (historicoAberto) {

        atualizarHistorico()

        tela.style.display = "flex"
        texto.textContent = "Fechar histórico"
        icone.src = "assets/img/close.svg"

    } else {
        tela.style.display = "none"
        texto.textContent = "Ver Historico"
        icone.src = "assets/img/history.svg"
    }
}

//atualizar tela ao carregar
function atualizarTela() {
    document.getElementById("conta_corrente").innerText = conta_do_banco.conta_corrente.saldo.toFixed(2)
    document.getElementById("lazer").innerText = conta_do_banco.lazer.saldo.toFixed(2)
    document.getElementById("pet").innerText = conta_do_banco.pet.saldo.toFixed(2)
    document.getElementById("faculdade").innerText = conta_do_banco.faculdade.saldo.toFixed(2)
}

//roda quando abre o site
atualizarTela()