function geral() {
    //dados pessoais
    let email = document.getElementById("email").value;
    let bancoDados = Object.keys(localStorage);
    //verificação de email
    if (email != "") {
        validarEmail(email);
    }

    function validarEmail(ex) {
        let usuario = ex.substring(0, ex.indexOf("@"));
        let dominio = ex.substring(ex.indexOf("@") + 1, ex.length);
        let test = bancoDados.includes(email);
        if (test == true) {
            document.getElementById("msgemail").innerHTML = "<font color='red'>Esse E-mail, já está cadastrado!!!</font>";
            document.getElementById("email").value = "";
        } else if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") == -1) &&
            (dominio.search("@") == -1) &&
            (usuario.search(" ") == -1) &&
            (dominio.search(" ") == -1) &&
            (dominio.search(".") != -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            document.getElementById("msgemail").innerHTML = "E-mail válido";
        } else {
            document.getElementById("msgemail").innerHTML = "<font color='red'>Email inválido </font>";
            document.getElementById("email").value = "";
        }
    }
}

function alterarDados(){
    let senha = document.getElementById("senha").value;
    let senhaConfirma = document.getElementById("senhaConfirma").value;

    //Verivicação de senha
    if (senha != "" && senhaConfirma != "") {
        confirmaçãoSenha(senha, senhaConfirma);
    }

    function confirmaçãoSenha(senha1, senha2) {
        if (senha1 != senha2) {
            document.getElementById("Psenha").innerHTML = "<font color='red'>Senhas não correspondentes!!!</font>";
            return document.getElementById("senha").value = "";
        }
        else{
            return senhaFort(senha);
        }
    }
}