function geral() {
    //dados pessoais
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cpf = document.getElementById("cpf").value;
    let matricula = document.getElementById("matricula").value;
    let senha = document.getElementById("senha").value;
    let senhaConfirma = document.getElementById("senhaConfirma").value;

    //Banco de dados
    let dados = {
        "nome": nome,
        "email": email,
        "cpf": cpf,
        "matricula": matricula,
        "senha": senha,
    };
    let dadosJson;
    let bancoDados = Object.keys(localStorage);

    //Verivicação de senha
    if (senha != "" && senhaConfirma != "") {
        confirmaçãoSenha(senha, senhaConfirma);
    }

    function confirmaçãoSenha(senha1, senha2) {
        if (senha1 != senha2) {
            document.getElementById("Psenha").innerHTML = "<font color='red'>Senhas não correspondentes!!!</font>";
            document.getElementById("senhaConfirma").value = "";
            return document.getElementById("senha").value = "";
        }
        else{
            return senhaFort(senha);
        }
    }

    function senhaFort(test) {
        var d = document.getElementById("Psenha");
        ERaz = /[a-z]/;
        ERAZ = /[A-Z]/;
        ER09 = /[0-9]/;
        ERxx = /[@!#$%&*+=?|-]/;
    
        if (test.length == "") {
            d.innerHTML = "Segurança da senha: !";
        } else {
            if (test.length < 5) {
                d.innerHTML = "Segurança da senha: <font color=\'red\'> BAIXA</font>";
            } else {
                if (test.length > 7 && test.search(ERaz) != -1 && test.search(ERAZ) != -1 && test.search(ER09) != -1 || test.length > 7 && test.search(ERaz) != -1 && test.search(ERAZ) != -1 && test.search(ERxx) || test.length > 7 && test.search(ERaz) != -1 && test.search(ERxx) != -1 && test.search(ER09) || test.length > 7 && test.search(ERxx) != -1 && test.search(ERAZ) != -1 && test.search(ER09)) {
                    d.innerHTML = "Segurança da senha: <font color=\'green\'> ALTA</font>";
                } else {
                    if (test.search(ERaz) != -1 && test.search(ERAZ) != -1 || test.search(ERaz) != -1 && test.search(ER09) != -1 || test.search(ERaz) != -1 && test.search(ERxx) != -1 || test.search(ERAZ) != -1 && test.search(ER09) != -1 || test.search(ERAZ) != -1 && test.search(ERxx) != -1 || test.search(ER09) != -1 && test.search(ERxx) != -1) {
                        d.innerHTML = "Seguranca da senha: <font color=\'orange\'> MEDIA</font>";
                    } else {
                        d.innerHTML = "Segurança da senha: <font color=\'red\'> BAIXA</font>";
                    }
                }
            }
        }
    }
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