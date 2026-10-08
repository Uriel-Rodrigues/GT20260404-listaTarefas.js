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
            alert("Error:", error.message)
    }
}

buscarTarefas()

function pegarTarefas(tarefas){
    cards.innerHTML = ""

    if (tarefas.length == 0) {
        cards.innerHTML = `<h3 class="font-bold mb-4">você ainda não tem tarefas clique em "nova tarefa"</h3>`
    }
    tarefas.map((tarefa) => {
        cards.innerHTML += 
        `
            <div class="bg-white p-4 rounded-lg">
                <h3 class="font-bold mb-4">${tarefa.titulo}</h3>
                <p>${tarefa.descricao}</p>
                <div class="flex justify-end gap-3">
                    <box-icon class="cursor-pointer hover:fill-purple-500" name='pencil' ></box-icon>
                    <box-icon onclick="deletarTarefa(${tarefa.id})" class="cursor-pointer hover:fill-purple-500" name='trash' ></box-icon>
                </div>
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
    event.preventDefault();
    try {
        let usuario = JSON.parse(sessionStorage.getItem("usuario"))
    
        let titulo = document.querySelector("#titulo").value;
        let conteudo = document.querySelector("#conteudo").value;
    
        let dados = {
            titulo: titulo,
            descricao: conteudo,
            usuario_id: usuario.id
        
        }
    
        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas`,{
            method:"post",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(dados)
        })
        .then((response) => {return response.json()})
        .then((json) => {
            if (json.tipo == "warning"){
                alert(json.mensagem)
            }
            alert(json.mensagem)
            fundoEscuro()
            buscarTarefas()

        })
        
    } catch (error) {
        alert("Error:", error.message)
    }
}

function deletarTarefa(id){
    if(confirm("deseja realmente deletar")){
         fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${id}`, {
            method: "delete",
            headers: {"Content-type":"application/json"}
        })
        .then((response) => {return response.json()})
        .then((json) => {
            alert(json.mensagem)   
            buscarTarefas()
        })
    }
}