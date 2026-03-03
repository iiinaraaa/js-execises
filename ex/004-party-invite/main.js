function verificarEntrada() {
    let idade = Number(document.getElementById("idade").value)

    let opcaoSelecionada = document.querySelector('input[name="convite"]:checked')

    let resultado = document.getElementById("resultado")

    // ver se a idade foi colocada ou nao 
    if (!idade) {
        resultado.innerText = "Por favor, informe sua idade."
        return
    }

    //nessa parte verifica se nenhum ratio foi selecionado!
    if (!opcaoSelecionada) {
        resultado.innerText = "Por favor, selecione se tem convite."
        return
    }

    let convite = opcaoSelecionada.value

    if (idade < 18) {
        resultado.innerText = "voce e menor de idade, entrada proibida."
    }

    else if (idade >= 25 && convite === "sim") {
        resultado.innerText = "Bem vind@, voce e VIP!"
    }

    else if (idade >= 18 && convite === "sim") {
        resultado.innerText = "Bem vind@, entrada liberada!"
    }

    else if (idade >= 18 && convite === "nao") {
        resultado.innerText = "voce pode entrar, mas precisa comprar o ingresso"
    }


}