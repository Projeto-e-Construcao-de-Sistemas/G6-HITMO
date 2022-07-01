function exibirInstrutor(){
    let key = localStorage.getItem("ultimoLogin");
    if( key !=undefined && key != ""){
    let objeto = JSON.parse(localStorage.getItem(key));

    return document.getElementById("instrutores").innerHTML = `
    <div id="Instrutor">
    <h1>${objeto.name}</h1>
    <h4><${objeto.cpf}/h4>
    <h4>${objeto.matricula}</h4>
    <button type="button">Excluir</button>
    <button type="button">Alterar</button>
    </div>
    `
    }
}