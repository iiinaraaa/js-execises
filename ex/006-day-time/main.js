//precisei por dentro de uma function pra rodar sempre, nao so uma vez
//setTimeOut - COISA NOVA, ele diz "depois desse tempo, faz dnv essa funcao" ele recarrega... acho que eh isso
//pesquisando formas de fzr isso vi que nao eh recomendado usar while, pq ele roda infinitamente sem parar, sem dar tempo como o settimeout faz, e parece que so funciona dentro de uma function. - mas nesse caso funcionaria pq o site todo eh sobre esse relogiozinho, mas num conjunto todo essa forma nao eh indicada!!!!!!
// tem que chamar relogio() fora da function, pra mim isso n faz o menor SENTIDO, mas se n fizer assim n funciona... nao entendi pq.. mas ta funcionando


function relogio() {
    
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

    setTimeout(relogio, 1000)
}

relogio()