//  let tarefas = [
//      {titulo:"cortar a grama", conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, enim! Porro iure, repellendus fugit fuga libero dignissimos sunt eos quasi quisquam incidunt quis nesciunt inventore illum rerum ad, est cum!"}, 
//      {titulo:"compras", conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, enim! Porro iure, repellendus fugit fuga libero dignissimos sunt eos quasi quisquam incidunt quis nesciunt inventore illum rerum ad, est cum!"}, 
//      {titulo:"veterinario", conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, enim! Porro iure, repellendus fugit fuga libero dignissimos sunt eos quasi quisquam incidunt quis nesciunt inventore illum rerum ad, est cum!"}, 
//      {titulo:"almoço", conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, enim! Porro iure, repellendus fugit fuga libero dignissimos sunt eos quasi quisquam incidunt quis nesciunt inventore illum rerum ad, est cum!"}]

let tarefas = []

let cards = document.querySelector("#cards")

 function buscarTarefas(){

    try {

        let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;

        if (!usuario){
            window.location.href = "index.html"
        }

        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${usuario.id}`, {
            method: "get",
            headers: {"Content-type":"application/json"}
        })
        .then((response) => {return response.json()})
        .then((json) => {
            if(json.tipo == "error") {
                throw json.mensagem //throw ja funciona com um return embutido, no caso, se tiver erro  ele para de executar 
            }
            tarefas = json
            pegarTarefas(tarefas)
        })
        
    } catch (error) {
        
    }
 }

 buscarTarefas()

function pegarTarefas(tarefas){

    let cards = document.querySelector("#cards")

    if (tarefas.length == 0) {
        cards.innerHTML = `<h3 class="font-bold mb-4">você ainda não tem tarefas clique em "nova tarefa"</h3>`
    }
    
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

function procurarTarefa(texto){
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

function criarTarefas(){
    
    event.preventDefault()

    let usuario = JSON.parse(sessionStorage.getItem("usuario"))

    let titulo = document.querySelector("#tirulo").value;
    let conteudo = document.querySelector("#conteudo").value;

    let dados = {
        titulo: titulo,
        descricao: conteudo,
        usuario_id: usuario.id
        
    }

    fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${usuario.id}`,{
        method:"post",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(dados)
    })
    .then((response) => {return response.json()})
    .then((json) => {
        if (json.tipo == "error"){
            alert(json.mensagem)
        }
        alert(json.mensagem)
    })
    .catch(error => {
        alert(error.message)
    })
}
