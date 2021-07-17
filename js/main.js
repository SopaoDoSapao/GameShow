import { criarPerguntasOBJ, listarPerguntas } from './perguntas/perguntas.js'
import { carregarElementoID, carregarJson, carregarElementosName, adicionarClasse, removerClasse } from './elementos/elementos.js';

let perguntasOBJ = [];

let roletaCanvas = null;
let roletaOBJ = [];
let palavrasOBJ = [];

let perguntasTab1 = null;
let perguntasTab2 = null;

let antBtn = null;
let proxBtn = null;

let menus = null;
let tabelas = null;
let menuAtivo = 0;

window.onload = (event) => {
    carregarElementosDOM();
    carregarPerguntas();
}

function carregarElementosDOM(){
    perguntasTab1 = carregarElementoID("pgtTbl1");
    perguntasTab2 = carregarElementoID("pgtTbl2");

    roletaCanvas = carregarElementoID("canvas");

    antBtn = carregarElementoID("antBtn");
    antBtn.onclick = function(){ trocarMenu("<") }

    proxBtn = carregarElementoID("proxBtn");
    proxBtn.onclick = function(){ trocarMenu(">") }

    menus = carregarElementosName("menu");
    tabelas = carregarElementosName("tabela");
    
    adicionarClasse(menus[0], "menuAtivo");
    adicionarClasse(tabelas[0], "menuAtivo")
    for(let i=1; i<menus.length; i++){
        adicionarClasse(menus[i], "menuOculto");
        adicionarClasse(tabelas[i], "menuOculto");
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
        removerClasse(menus[menuAnterior], "menuAtivo");
        removerClasse(tabelas[menuAnterior], "menuAtivo");
        adicionarClasse(menus[menuAnterior], "menuOculto");
        adicionarClasse(tabelas[menuAnterior], "menuOculto");

        removerClasse(menus[menuAtivo], "menuOculto");
        removerClasse(tabelas[menuAtivo], "menuOculto");
        adicionarClasse(menus[menuAtivo], "menuAtivo");
        adicionarClasse(tabelas[menuAtivo], "menuAtivo");
    }
}