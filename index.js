let tarefas = []

let idEditandoTarefa = null

let cards = document.querySelector("#cards")


// listar as tarefas cadastradas
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

// criar nova tarefa
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
// deletar tarefa 
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


function editarTarefa(){
    event.preventDefault()
    
    try {

        let usuario = JSON.parse(sessionStorage.getItem("usuario"))
    
        let tituloEditado = document.querySelector("#tituloEditado").value;
        let descricao = document.querySelector("#descricao").value;
    
        let dados = {
            titulo: tituloEditado,
            descricao: descricao,
            usuario_id: usuario.id
        }

        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${idEditandoTarefa}`, {
             method: "put",
             headers: {"content-type": "application/json"},
             body: JSON.stringify(dados)
         })
         .then((response) =>{return response.json()})
         .then((json) => {
             if(json.tipo == "waring"){
                 alert(json.mensagem)
             }
             alert(json.mensagem)
             buscarTarefas()
             idEditandoTarefa = null
             fundoEscuro()

         })
    } catch (error) {
         alert(error.mensage)
    }
}

// percorrer array de tarefas para exibir
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
                    <box-icon onclick="formeditarTarefa(${tarefa.id})" class="cursor-pointer hover:fill-purple-500" name='pencil' ></box-icon>
                    <box-icon onclick="deletarTarefa(${tarefa.id})" class="cursor-pointer hover:fill-purple-500" name='trash' ></box-icon>
                </div>
            </div>
        `
    })
}

pegarTarefas(tarefas)


// procurar tarefas barra de pesquisa
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

//abrir formulario editar tarefa e carregar valores nos campos  
function formeditarTarefa(id){

    let tarefaEncontrada = tarefas.find(tarefa => tarefa.id === id)
    
    idEditandoTarefa = id
        
    let escuro = document.querySelector("#escuro")
    let editarTrefa = document.querySelector("#editarTrefa")

    let idEdicao = document.querySelector("#idEdicao")
    let tituloEditado = document.querySelector("#tituloEditado")
    let descricao = document.querySelector("#descricao")

    idEdicao.value = tarefaEncontrada.id
    tituloEditado.value = tarefaEncontrada.titulo
    descricao.value = tarefaEncontrada.descricao

    escuro.classList.remove("opacity-0", "invisible")
    editarTrefa.classList.remove("opacity-0", "invisible")
}

// formulario nova tarefa
function novaTarefa(){
    let escuro = document.querySelector("#escuro")
    let tarefa = document.querySelector("#tarefa")

    escuro.classList.remove("opacity-0", "invisible")
    tarefa.classList.remove("opacity-0", "invisible")
}
  
// camada escura overlay
function fundoEscuro(){
    let escuro = document.querySelector("#escuro")
    let tarefa = document.querySelector("#tarefa")
    let editarTrefa = document.querySelector("#editarTrefa")


    escuro.classList.add("opacity-0", "invisible")
    tarefa.classList.add("opacity-0", "invisible")
    editarTrefa.classList.add("opacity-0", "invisible")

}

