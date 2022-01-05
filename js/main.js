import { criarPerguntasOBJ, listarPerguntas } from './perguntas/perguntas.js'
import { carregarElementoID, carregarJson, carregarElementosName, adicionarClasse, removerClasse, criarElemento } from './elementos/elementos.js';
import { listarRodadas } from './rodaRoda/rodadas.js'

let roletaCanvas = null;
let rdTab = null
let rodadasOBJ = [];

let perguntasTab1 = null;
let perguntasTab2 = null;
let perguntasOBJ = [];

let antBtn = null;
let proxBtn = null;

let menus = null;
let tabelas = null;
let menuAtivo = 0;

window.onload = (event) => {
    carregarElementosDOM();
    carregarPerguntas();
    carregarRodaRoda();
    //A roleta é carregada diretamente no overlay.html pois foi o único jeito que consegui fazer ela retornar
    //o valor sorteado.
}

function carregarElementosDOM(){
    perguntasTab1 = carregarElementoID("pgtTbl1");
    perguntasTab2 = carregarElementoID("pgtTbl2");

    roletaCanvas = carregarElementoID("canvas");
    rdTab = carregarElementoID("rdTbl");

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

function carregarRodaRoda(){
    //Carrega as rodadas, cada grupo de palavras com a respectiva dica
    carregarJson('../json/rodaRoda/rodadas.json', iniciarRodadas);
}

function iniciarPerguntas(perguntas){
    perguntasOBJ = criarPerguntasOBJ(perguntas);
    listarPerguntas(perguntasOBJ, perguntasTab1, perguntasTab2);
}

function iniciarRodadas(rodadas){
    rodadasOBJ = rodadas.rodadas;
    listarRodadas(rodadasOBJ, rdTab);
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