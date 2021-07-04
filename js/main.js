import { criarPerguntasOBJ, listarPerguntas } from './perguntas/perguntas.js'
import { carregarElementoID, carregarJson, carregarElementosName, adicionarClasse, removerClasse } from './elementos/elementos.js';

var perguntasOBJ = [];

var perguntasTab1 = null;
var perguntasTab2 = null;

var antBtn = null;
var proxBtn = null;

var menus = null;
var menuAtivo = 0;

window.onload = (event) => {
    carregarElementosDOM();
    carregarPerguntas();
}

function carregarElementosDOM(){
    perguntasTab1 = carregarElementoID("pgtTbl1");
    perguntasTab2 = carregarElementoID("pgtTbl2");

    antBtn = carregarElementoID("antBtn");
    antBtn.onclick = function(){ trocarMenu("<") }

    proxBtn = carregarElementoID("proxBtn");
    proxBtn.onclick = function(){ trocarMenu(">") }

    menus = carregarElementosName("menu");
    
    adicionarClasse(menus[0], "menuAtivo")
    for(var i=1; i<menus.length; i++){
        adicionarClasse(menus[i], "menuOculto")
    }
}

function carregarPerguntas(){
    carregarJson('../json/perguntas.json', iniciarPerguntas);
}

function iniciarPerguntas(perguntas){
    perguntasOBJ = criarPerguntasOBJ(perguntas);
    listarPerguntas(perguntasOBJ, perguntasTab1, perguntasTab2);
}

function trocarMenu(dir){
    let menuAnterior = menuAtivo;
    switch(dir){
        case "<":
            if(menuAtivo > 0){
                menuAtivo--;
            }
            break;
        case ">":
            if(menuAtivo < (menus.length - 1)){
                menuAtivo++;
            }
            break;
    }

    if(menuAnterior != menuAtivo)
    {
        removerClasse(menus[menuAnterior], "menuAtivo")
        adicionarClasse(menus[menuAnterior], "menuOculto");

        removerClasse(menus[menuAtivo], "menuOculto")
        adicionarClasse(menus[menuAtivo], "menuAtivo");
    }
}