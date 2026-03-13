let agora = new Date()

let diaSemana = agora.getDay()
let dia = agora.getDate()
let mes = agora.getMonth() +1 
//ah pq tem esse +1? eh pq comeca no 0, entao no mes tem que add +1
let ano = agora.getFullYear()

let hora = agora.getHours()
let minuto = agora.getMinutes()

let nomeDia = ""

switch (diaSemana) {

    case 0:
        nomeDia = "Domingo"
        break

    case 1:
        nomeDia = "Segunda-feira"
        break

    case 2: 
        nomeDia = "Terca-feira"
        break
    
    case 3:
        nomeDia = "Quarta-feira"
        break

    case 4:
        nomeDia = "Quinta-feira"
        break

    case 5:
        nomeDia = "Sexta-feira"
        break
    
    case 6:
        nomeDia = "Sabado"
        break
        //SEMPRE POR BREAK
}

document.getElementById("diaSemana").innerText = `${nomeDia}`
document.getElementById("data").innerText = `${dia}/${mes}/${ano}`
document.getElementById("hora").innerText = `${hora}:${minuto}`