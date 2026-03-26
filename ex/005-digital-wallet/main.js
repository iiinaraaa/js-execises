let saldo = 0
let lazer = 0
let pet = 0
let faculdade = 0

function adicionarDinheiro() {
    let valor = Number(prompt("Qual valor voce deseja adicionar?"))

    if (ehNumeroValido(valor) && !ehNumeroNegativo(valor)) {
        saldo = saldo + valor
        document.getElementById("saldo").innerText = saldo
    }
}

function ehNumeroValido(numero) {
    if (isNaN(numero)) {
        alert("isso nao eh um numero valido")
        
        return false
    } 
    return true
}

function ehNumeroNegativo(numero) {
    if (numero <= 0) {
        alert("Adicione um valor que nao seja negativo")
        return true
    }
    return false

}

function separar(caixinha) {
    let valor = Number(prompt("quanto voce deseja separar?"))

    if (!ehNumeroValido(valor) || ehNumeroNegativo(valor)) {
        return
    } 

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

function render() {
    let lazer = Number(document.getElementById("lazer").innerText)
    let pet = Number(document.getElementById("pet").innerText)
    let faculdade = Number(document.getElementById("faculdade").innerText)

    lazer = Number((lazer + lazer * 0.10).toFixed(2))
    pet = Number((pet + pet * 0.10).toFixed(2))
    faculdade = Number((faculdade + faculdade * 0.10).toFixed(2))
    //esse toFixed transforma em STRING se n estiver dentro de NUMBER!!!!!!
    //precisa estar dentro se n, n vai funcionar e vai quebrar

    document.getElementById("lazer").innerText = lazer
    document.getElementById("pet").innerText = pet
    document.getElementById("faculdade").innerText = faculdade

    if (pet === 0 || faculdade === 0 || lazer === 0) {
        alert("adicione dinheiro!")
        //ah pq nao "" e sim 0? PQ TRANSFORMEI EM NUMEROOOOOOO!!!!!!!!! nao eh mais string!!!
        //STRING = ""
        //NUMBER = 0
    }
}

function mostrarOpcoes() {
    document.getElementById("opcoes").style.display = "block"
    //isso tbm podia fzr no css mas agr sou javascripter
}

function retirar(categoria) {
    let valor = parseFloat(prompt("qual valor voce quer retirar?"))

    if (isNaN(valor) || valor <= 0) {
        alert("digite um valor valido")
        return
    }

    if (categoria === "lazer") {
        if (valor > lazer) return alert("saldo insuficiente!")
        lazer -= valor
    }

    else if (categoria === "pet") {
        if (valor > pet) return alert("saldo insuficiente!")
        pet -= valor
    }

    else if (categoria === "faculdade") {
        if (valor > faculdade) return alert("saldo insuficiente!")
        faculdade -= valor
    }

    saldo += valor

    document.getElementById("lazer").innerText = lazer
    document.getElementById("pet").innerText = pet
    document.getElementById("faculdade").innerText = faculdade
    document.getElementById("saldo").innerText = saldo

    alert("retirado com sucesso")

}




//ele tira mas o valor da caixinha continua o mesmo....