function preencherCampos(){
    let key = localStorage.getItem("ultimoLogin");
    if( key !=undefined && key != ""){
    let objeto = JSON.parse(localStorage.getItem(key));
    let pNome = objeto.nome;
    let pEmail = objeto.email;
    let pCpf = objeto.cpf;
    let pMatricula = objeto.matricula;


    document.getElementById("nome").value = pNome;
    document.getElementById("email").value = pEmail;
    document.getElementById("cpf").value = pCpf;
    document.getElementById("matricula").value = pMatricula;
    }
}
function fazerLogOff(){
    localStorage.setItem("ultimoLogin","");
    window.location.href = "index.html";
}
function mudarSenha(){

    let novaSenha = document.getElementById("novaSenha").value;
    let key = localStorage.getItem("ultimoLogin");
    let objeto = JSON.parse(localStorage.getItem(key));
    let pSenha = objeto.senha;

    if(pSenha == document.getElementById("senha")){}
        if(novaSenha != ""){
        objeto.senha = document.getElementById("novaSenha").value;
        let objetoJson = JSON.stringify(objeto);
        localStorage.setItem(key,objetoJson);
        
        document.getElementById("atention").innerHTML = "<font color='red'>Senha alterada com exito!!</font>";
        }
}
