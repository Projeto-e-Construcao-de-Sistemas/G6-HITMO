function tipoUsuario(){
    let key = localStorage.getItem("ultimoLogin");
    let objeto = JSON.parse(localStorage.getItem(key));
    let usuario = objeto.tipo;

    console.log(usuario);
    if(usuario == "gerenteG"){
        let div = document.getElementsByClassName("gerenteG");
        div[0].style.display = 'block';
    }
    else if(usuario == "instrutor"){
        let div = document.getElementsByClassName("instrutor");
        div[0].style.display = 'block';

    }else if(usuario == "aluno"){
        let div = document.getElementsByClassName("aluno");
        div[0].style.display = 'block';
    }
    }
