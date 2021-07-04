export function carregarJson(rota, callback){
    var json = null

    fetch(rota)
    .then(resposta => resposta.json())
    .then(rpt => json = rpt).then(() => callback(json)); 
}

export function limparFilhos(elementoPai){
    while (elementoPai.firstChild) {
        elementoPai.removeChild(elementoPai.firstChild);
    }
}

export function carregarElementoID(id){
    return document.getElementById(id);
}

export function carregarElementosName(name){
    return document.getElementsByName(name);
}

export function criarElemento(tag, elementoPai){
    var elementoFilho = document.createElement(tag)
    elementoPai.appendChild(elementoFilho)

    return elementoFilho;
}

export function adicionarClasse(elemento, classe){
    elemento.classList.add(classe);
}

export function removerClasse(elemento, classe){
    elemento.classList.remove(classe);
}