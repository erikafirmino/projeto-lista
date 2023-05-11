const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//função para criar a tag 'li'
function criaLi(){
    const li = document.createElement('li');
    return li;
}
//verifica se o Enter foi pressionado e cria uma tarefa
inputTarefa.addEventListener('keypress', function(e){
    //keyCode = código da tecla
    //Se o keyCode for = 13 = 'Enter'
    //Verifica se o input tem valores
    //Cria uma nova tarefa
    if(e.keyCode === 13) {
        if(!inputTarefa.value) return;
        criarTarefa(inputTarefa.value);
    }
});
//para limpar o input
//focu() = função que returna o cursor para caixa de texto
function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}
//função que cria o botão de apagar
function criaBotaoApagar(li){
    li.innerHTML += ' ';
    //cria o elemento 'button'
    const botaoApagar = document.createElement('button');
    //insere o nome no botão
    botaoApagar.innerHTML = 'Apagar';
    //adiciona uma class ao elemento 'button'
    botaoApagar.setAttribute('class', 'apagar');
    //adiciona um title ao elemento 'button'
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    //faz com que o botão seja filho de 'li'
    li.appendChild(botaoApagar);
}

//função para exibir a tarefa criada
//faz com que o texto digitado seja filho de 'li' assim como o botão apagar.
function criarTarefa(textoInput){
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvaTarefas();
}

//captura o evento click
// verifica se o input tem texto
btnTarefa.addEventListener('click', function() {
    if(!inputTarefa.value) return;
    criarTarefa(inputTarefa.value);
});

//Captura o evento click do botão apagar
document.addEventListener('click', function(e) {
    //cria uma variavel para armazenar qual o elemento foi clicado
    const el = e.target;
    //Se o clicado for o elemento com a class 'apagar', então remova o elemento pai.
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvaTarefas();
    }
});

//criar uma lista com as tarefas
//cria uma variavel para selecionar as tarefa criadas
//cria um array vázio
function salvaTarefas( ){
    const liTarefas = tarefas.querySelectorAll('li');
    const listasDeTarefas = [];
    //Faz uma 'for' das tarefas que foram criadas
    //E coloca as tarefas dentro do array que foi criado
    for(let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listasDeTarefas.push(tarefaTexto);
    }
    //transforma o array em JSON (string) 
    //e guarda o valor localStorage (local no navegador que podemos salvar coisas)
    //No '.setItem ( colocar o nome que iremos recuperas as coisas)
    const tarefasJSON = JSON.stringify(listasDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}
//captura as tarefas salvas no localStorage
function adicionaTarefasSalvas() {
    //cria uma variavel para recuperar as tarefas no localStorage
    const tarefas = localStorage .getItem ('tarefas')
    //converte de volta para um array
    const listasDeTarefas = JSON.parse(tarefas);

    //faz com que a lista salva volte a virar uma tarefa
    for(let tarefa of listasDeTarefas){
        criarTarefa(tarefa);
    }
}
adicionaTarefasSalvas();