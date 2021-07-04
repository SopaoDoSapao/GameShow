import Pergunta from '../classes/pergunta.js';
import { criarElemento, carregarElementoID, adicionarClasse, removerClasse } from '../elementos/elementos.js'

var perguntas = null;

var perguntaId = carregarElementoID("perguntaId");
var respostaId = carregarElementoID("respostaId");
var perguntaPainel = carregarElementoID("pergunta");
var alternativaA = carregarElementoID("A");
var alternativaB = carregarElementoID("B");
var alternativaC = carregarElementoID("C");
var alternativaD = carregarElementoID("D");
var respostaBtn = carregarElementoID("btn");;

export function criarPerguntasOBJ(perguntasJSON){
    var retorno = [];
    var id = 0;

    perguntasJSON.perguntas.forEach(el => {
        var pgt = new Pergunta(
            el.pergunta,
            el.alternativas,
            el.resposta,
            el.participante,
            id
        );

        id++;
        retorno.push(pgt);
    });

    perguntas = retorno;
    return retorno;
}

export function listarPerguntas(perguntasOBJ, perguntasTab1, perguntasTab2){

    var ind1 = 1;
    var ind2 = 1;

    respostaBtn.onclick = function() { mostrarResposta() }

    perguntasOBJ.forEach(pgt => {
        if(pgt.participante == 1){
            var tableRow = criarElemento("tr", perguntasTab1);
            var tableData = criarElemento("td", tableRow);
            adicionarClasse(tableData, "perguntaBTN");

            tableData.innerText = `Pergunta ${ind1}`;
            tableData.onclick = function() { onClickPergunta(pgt) }
            ind1++;
        }
        else if(pgt.participante == 2){
            var tableRow = criarElemento("tr", perguntasTab2);
            var tableData = criarElemento("td", tableRow);
            adicionarClasse(tableData, "perguntaBTN");

            tableData.innerText = `Pergunta ${ind2}`;
            tableData.onclick = function() { onClickPergunta(pgt) }
            ind2++;
        }
    });
}

function onClickPergunta(pergunta){
    if(perguntaId.value == pergunta.id)
    {
        ocultarPergunta()

        setTimeout(function(){ 
            limparTextoPergunta();
            ocultarResposta();
        }, 1000);
            
        return;
    }

    if(perguntaPainel.innerText == ""){
        mostrarPergunta(pergunta);
    }
    else{
        ocultarPergunta();

        setTimeout(function(){ 
            mostrarPergunta(pergunta);
            ocultarResposta();
        }, 1000);
    }
}

function mostrarPergunta(pergunta){
    perguntaId.value = pergunta.id;
    respostaId.value = pergunta.resposta;
    perguntaPainel.innerText = pergunta.pergunta;
    alternativaA.innerText = pergunta.alternativas[0];
    alternativaB.innerText = pergunta.alternativas[1];
    alternativaC.innerText = pergunta.alternativas[2];
    alternativaD.innerText = pergunta.alternativas[3];
    adicionarClasse(perguntaPainel, "mostrarPergunta");
    adicionarClasse(alternativaA, "mostrarAlternativa");
    adicionarClasse(alternativaB, "mostrarAlternativa");
    adicionarClasse(alternativaC, "mostrarAlternativa");
    adicionarClasse(alternativaD, "mostrarAlternativa");
}

function ocultarPergunta(){
    removerClasse(perguntaPainel, "mostrarPergunta");
    removerClasse(alternativaA, "mostrarAlternativa");
    removerClasse(alternativaB, "mostrarAlternativa");
    removerClasse(alternativaC, "mostrarAlternativa");
    removerClasse(alternativaD, "mostrarAlternativa");
}

function limparTextoPergunta(){
    perguntaId.value = "null";
    respostaId.value = "null";
    perguntaPainel.innerText = ""; 
    alternativaA.innerText=""; 
    alternativaB.innerText=""; 
    alternativaC.innerText=""; 
    alternativaD.innerText="";
}

function mostrarResposta(){
    switch(respostaId.value) {
        case "0":
            adicionarClasse(alternativaA, "respostaCerta");
            break;
        case "1":
            adicionarClasse(alternativaB, "respostaCerta");
            break;
        case "2":
            adicionarClasse(alternativaC, "respostaCerta");
            break;
        case "3":
            adicionarClasse(alternativaD, "respostaCerta");
            break;
    }

    var audio = new Audio('../media/audio/respostaCerta.mp3');
    audio.play();
}

function ocultarResposta(){
    removerClasse(alternativaA, "respostaCerta")
    removerClasse(alternativaB, "respostaCerta")
    removerClasse(alternativaC, "respostaCerta")
    removerClasse(alternativaD, "respostaCerta")
}