function verificarLogin() {
    let key = localStorage.getItem("ultimoLogin");
    let login = document.getElementById("login").value;
    let senhaDigitada = document.getElementById("senhaLogin").value;
    let dadosUsuario;
    let dadosJson;
    let bancoDados = Object.keys(localStorage);
    let div;


    if (bancoDados.includes(login) == true) {
        localStorage.getItem(login);
    } else {
        return document.getElementById("textoLogin").innerHTML = "<font color = 'red'>Usuario não encontrado </font>"
    }
    //senhas
    dadosUsuario = localStorage.getItem(login);
    dadosJson = JSON.parse(dadosUsuario);
    if (login == "Admin") {
        if (dadosJson.senha == senhaDigitada || senhaDigitada == "Admin" && login == "Admin") {
            localStorage.ultimoLogin = login;
            window.location.href = "perfil.html";

        } else {
            document.getElementById("textoLogin").innerHTML = "<font color = 'red'>Senha Incorreta </font>";
        }
    } else {
        if (dadosJson.senha == senhaDigitada) {
            localStorage.ultimoLogin = login;
            window.location.href = "perfil.html";
        } else {
            document.getElementById("textoLogin").innerHTML = "<font color = 'red'>Senha Incorreta </font>";
        }
    }
    bancoDados.includes(login);

    function tipoUsuario(){
        if(login == "Admin"){
            div = document.getElementsByClassName("aluno");
            div.style.display = "none";

        }
    }
    //localStorage.getItem();
    console.log(login);
}