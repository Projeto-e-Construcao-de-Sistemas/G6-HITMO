function cadastrarSerie(){
    
    let email = document.getElementById("email-solicitante");
    JSON.stringify(email);

    localStorage.aluno = email.value;
    let key = localStorage.getItem("aluno");
    let objeto = JSON.parse(localStorage.getItem(key));
    

    
        objeto.serie = document.getElementById("nova-serie").value;
        let objetoJson = JSON.stringify(objeto);
        localStorage.setItem(key, objetoJson);
        
        document.getElementById("msgSeries").innerHTML = "<font color='red'>Serie cadastrada com exito!!</font>";

    
}

function exibirSeries(){
    let key = localStorage.getItem("ultimoLogin");
    if( key !=undefined && key != ""){
    let objeto = JSON.parse(localStorage.getItem(key));
    key = JSON.parse(localStorage.getItem(objeto));

    return document.getElementById("instrutores").innerHTML = `
    <div id="Instrutor">
    <h1>kay.name.value</h1>
    <h4><${kay.cpf.value}/h4>
    <h4>${kay.matricula}</h4>
    <button type="button">Excluir</button>
    <button type="button">Alterar</button>
    </div>
    `
    }
}