console.log("-------------- playground ------------------------");
let carro = "Gol"
carro = "Palio"
carro = 12

carro = ["caderno", "celular", "bolinho"]
carro.push("caneta")
console.log("carro   ", carro)
carro.pop()
console.log("carro   ", carro)

console.log("-------------- playground ------------------------");

let carro_objeto = {
    "nome": "Dolphin",
    "marca": "BYD",
    "ano": 2025
}

console.log("carro_objeto   ", carro_objeto)

carro_objeto.marca = "Fiat"

console.log("carro_objeto   ", carro_objeto)

carro_objeto = "banana"

console.log("carro_objeto   ", carro_objeto)

console.log("-------------- playground ------------------------");

let conjunto_de_carros = [{
    "nome": "Dolphin",
    "marca": "BYD",
    "ano": 2025
}, {
    "nome": "Uno",
    "marca": "Fiat",
    "ano": 1980
}, {
    "nome": "Mustang",
    "marca": "Ford",
    "ano": 2018
}]

console.log("conjunto_de_carros   ", conjunto_de_carros)

conjunto_de_carros.push({
    "nome": "500",
    "marca": "Fiat",
    "ano": 2022
})

console.log("conjunto_de_carros   ", conjunto_de_carros)

conjunto_de_carros.pop();

console.log("conjunto_de_carros   ", conjunto_de_carros)
console.log("carro 1???", conjunto_de_carros[1])

conjunto_de_carros[1].nome = "Uno Mille"

console.log("conjunto_de_carros   ", conjunto_de_carros)

let busca_carro = conjunto_de_carros.find((elem) => elem.nome === "Kombi")

console.log(">>> busca carro", busca_carro)

busca_carro = conjunto_de_carros.find((elem) => elem.nome === "Dolphin")

console.log(">>> busca carro", busca_carro)

conjunto_de_carros.map((carro) => {
    console.log("----quem é o carro da vez---", carro);
    carro.ano = carro.ano + 1;
    console.log("quem é o carro da vez", carro);
    console.log("----- fim do carro da vez--- ")
    document.getElementById("playground").innerHTML = document.getElementById("playground").innerHTML + ` <p>Carro: ${carro.nome}, ${carro.marca} - ${carro.ano}</p>`
})

