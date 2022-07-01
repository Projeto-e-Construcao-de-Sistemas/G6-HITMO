function registrarUsuario() {

    //dados user
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cpf = document.getElementById("cpf").value;
    let matricula = document.getElementById("matricula").value;
    let senha = cpf;
    let tipo = document.getElementById("tipo").value;



    //Banco de dados
    if(nome == ""|| email == ""|| cpf == ""|| matricula ==""){
        document.getElementById("atention").innerHTML = "<font color='red'>Preencha todos os campos!!</font>";
    }else{
    let dados = {
        "nome": nome,
        "email": email,
        "cpf": cpf,
        "matricula": matricula,
        "senha": senha,
        "serie": "",
        "tipo": tipo,
    };
    let dadosJson;
    let bancoDados = Object.keys(localStorage);


    gravarUsuarios(dados);

    function gravarUsuarios(usuarios) {
        return dadosJson = JSON.stringify(usuarios);
    }
    
    localStorage.setItem(email, dadosJson);

    
    }
    window.location.href = "../cadastro.html"
}