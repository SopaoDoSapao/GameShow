import { criarElemento, carregarElementoID, adicionarClasse, removerClasse } from '../elementos/elementos.js'

export function listarRodadas(rodadasOBJ, rdTab){
    let ind = 1;

    rodadasOBJ.forEach(rod => {
            let tableRow = criarElemento("tr", rdTab);
            let tableData = criarElemento("td", tableRow);
            adicionarClasse(tableData, "perguntaBTN");

            tableData.innerText = `Rodada ${ind}`;
            tableData.onclick = function() { onClickRodada(rod) }
            ind++;
    });
}

function onClickRodada(rod){
    console.log(rod)
}

/*let palavras = carregarElementoID("palavra")

let str = "Macaco-Prego";

for(let x=0; x<str.length; x++){
    console.log(str[x]);
    //let p = criarElemento("td", palavras);
    
    if(str[x]==" "){
        //p.innerText = "";
    }
    else{
        //p.innerText = str[x];
    }
}*/