let tarefas = [
    {titulo:"cortar a grama", conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, enim! Porro iure, repellendus fugit fuga libero dignissimos sunt eos quasi quisquam incidunt quis nesciunt inventore illum rerum ad, est cum!"}, 
    {titulo:"compras", conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, enim! Porro iure, repellendus fugit fuga libero dignissimos sunt eos quasi quisquam incidunt quis nesciunt inventore illum rerum ad, est cum!"}, 
    {titulo:"veterinario", conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, enim! Porro iure, repellendus fugit fuga libero dignissimos sunt eos quasi quisquam incidunt quis nesciunt inventore illum rerum ad, est cum!"}, 
    {titulo:"almoço", conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, enim! Porro iure, repellendus fugit fuga libero dignissimos sunt eos quasi quisquam incidunt quis nesciunt inventore illum rerum ad, est cum!"}]

let cards = document.querySelector("#cards")

function pegarTarefas(tarefas){
    cards.innerHTML = ''
    tarefas.map((tarefa) => {
        cards.innerHTML += 
        `
            <div class="bg-white p-4 rounded-lg">
                <h3 class="font-bold mb-4">${tarefa.titulo}</h3>
                <p>${tarefa.conteudo}</p>
            </div>
        `
    })
}

pegarTarefas(tarefas)

function buscarTarefa(texto){
    if(texto.length == 0){
        pegarTarefas(tarefas)
    }else if (texto.length >=3){
        let tarefaFiltrada = tarefas.filter((tarefa) => {
            return tarefa.titulo.toLowerCase().includes(texto.toLowerCase())
        })
        pegarTarefas(tarefaFiltrada)
    }

}

function novaTarefa(){
    let escuro = document.querySelector("#escuro")
    let tarefa = document.querySelector("#tarefa")

    escuro.classList.remove("hidden")
    tarefa.classList.remove("hidden")
}

function fundoEscuro(){
    let escuro = document.querySelector("#escuro")
    let tarefa = document.querySelector("#tarefa")

    escuro.classList.add("hidden")
    tarefa.classList.add("hidden")
}


