//pegando das aulass no db
firebase.firestore().collection("aulas").get().then((snapshot) =>{
    const aula = snapshot.docs.map((doc) => ({...doc.data(), uid: doc.id}));
    
    mostraAula(aula);

}).catch(error =>{
        console.log("erro" , error);
})

//pegando o formAula de aula
const formAula = document.querySelector("[id=form-aula]");

//passando para a pagina de cadastro de aula
formAula.addEventListener('submit', (event)=>{

    event.preventDefault();

    //verificando se a data está correta e atribuindo as variaveis os valores do form
    if(verificaDate()){
        let aula = formAula.aula.value, descAula = formAula.descricao-aula.value, date = formAula.date.value, lotacao = formAula.lotacao.value, hInicio = formAula.hInicio.value, hFim = formAula.hFim.value, uid = formAula.uid.value;
        uid = formAula.uid.value;

        //ajustando o formato da data para salvar no BD
        let data = date.split('-').reverse().join('/');

        const dados = {
            aula: aula,
            descAula: descAula,
            date: data,
            hInicio: hInicio,
            hFim: hFim,
            lotacao: lotacao,
            numeroInscritos: 0,
            inscritos: inscritos = {}
        }
        cadastraAula(dados, uid);
    }
})

//Função para checar a data
function verificaDate(){

    //declarando as variaveis e atribuindo valores // date é para checar a data atual
    let date = new Date();
    let dataNova = document.getElementById('date').value;
    let hInicio = document.getElementById('hInicio').value;
    let hFim = document.getElementById('hFim').value;
    let dataExist;

    firebase.firestore().collection("aulas").get().then((snapshot) =>{
        const aula = snapshot.docs.map((doc) => ({...doc.data(), uid: doc.id}));
        dataExist = aula;
    })

    //checando se a tada está preenchida
    for(let i in dataExist){
        if(dataNova == dataExist[i].data){
            if(hInicio == dataExist[i].hInicio && hFim == dataExist[i].hFim || hFim > dataExist[i].hInicio && hFim < dataExist[i].hFim || hInicio > dataExist[i].hInicio && hInicio < dataExist[i].hFim){
                alert("Aula já cadastrada para esse horario");
                document.getElementById('date').value = "";
                document.getElementById('hInicio').value = "";
                document.getElementById('hFim').value = "";
                return false;
            }
        }
    }

    return true;
}

//função para verificar os campos de data
function verificaDateCampo(){

    //declarando as variaveis e pegando os valores do HTML
    let date = new Date();
    let dataNova = document.getElementById('date').value.split('-').reverse().join('/');
    let hInicio = document.getElementById('hInicio').value;
    let hFim = document.getElementById('hFim').value;
    let dataAtual = date.toLocaleDateString();

    //checando se o horario está no formato correto
    if( hInicio != "" && hFim != "" && hFim <= hInicio){
        alert("Horário inválido");
        document.getElementById('hFim').value = "";
        document.getElementById('hFim').focus();

    }

    //testando se a data esta no formato correto
    if(dataNova != "" && dataNova == dataAtual){
        console.log("Data invalida, mesmo dia");
        document.getElementById('date').value = "";
    } else if(dataNova != "" && dataNova < dataAtual){
        console.log("Data invalida, data passou");
        document.getElementById('date').value = "";
    }else if(dataNova != "" && dataNova > dataAtual){
        console.log("Data valida");
    }
}

//FUNÇÕES PARA CRIAR AS aula NO .BLOCO-aula
function mostraAula(aula, tipo){
    let date = new Date();
    console.log(date.toLocaleDateString());

    aula.forEach(aula => {
    
        let bloco = document.querySelector('.bloco-aula');
        let div = document.createElement('div');
        div.id = aula.uid;
        
        //criando os botões
        let btnAlterar = document.createElement('button');
        btnAlterar.innerHTML = "Alterar";

        let btnExcluir = document.createElement('button');
        btnExcluir.innerHTML = "Excluir";

        //nomeando os botões com classes
        div.classList.add('bloco-cont');
        btnExcluir.classList.add('btn-medio');
        btnAlterar.classList.add('btn-medio');

        let i, cont = 0;
        for(i in aula.inscritos){
            cont++;
        }

        div.innerHTML = `
            <h1>${aula.aula}</h1>
            <h4>${aula.date}</h4>
            <h4>${aula.hInicio} - ${aula.hFim}</h4>
            <h3>${cont} / ${aula.lotacao}</h2>
        `;
    
        bloco.append(div);
        div.appendChild(btnAlterar);
        div.appendChild(btnExcluir);

        if(date.toLocaleDateString() > aula.date){
            div.style.background = "#808080";
            div.removeChild(btnAlterar);
            div.removeChild(btnExcluir);
        }
        

        //especificando o evento de click para o botão editar
        btnAlterar.addEventListener('click', () =>{
            document.getElementsByClassName("bloco-aula")[0].style.display = 'none';

            document.getElementById("div-form-aula").style.display = 'block';

            pegarDadoAula(aula.uid);
        });

        //Exclui a div-usuario
        btnExcluir.addEventListener('click', (event) =>{
            event.stopPropagation();

            confirmDelet(aula);
        });
    });

}

//Função para cadastra aula
function cadastraAula(dados, uid){

    //verificando se é um cadastro de nova aoula ou uma atualização
    if(uid == "null"){

        firebase.firestore().collection('aulas').add(dados).then(() =>{
            console.log("cadastrada");
            window.location.reload();
        }).catch(()=>{
            console.log("falhou1");
        });
    } else {
        firebase.firestore().collection('aulas').doc(uid).update(dados).then(() =>{
            console.log("atualizada");
            window.location.reload();
        }).catch(()=>{
            console.log("falhou2");
        });
    }
}

//Função para pegar os dado no db apartir do uid
function pegarDadoAula(uid){
    firebase.firestore().collection("aulas").doc(uid).get().then(doc =>{

        //verificando se o documento pesquisado no BD pelo uid Existe
        if(doc.exists){
            preencherAula(doc.data(), uid);
        }else{
            console.log("Não existe");
            window.location.href = "../../aula-instrutores.html";
        }
    }).catch(error =>{
            console.log("erro" , error);
    }
    )
}


//função para preenchimendo do formAula no caso de alteração
function preencherAula(dados, uid){
    document.getElementById("aula").value = dados.aula;
    document.getElementById("hInicio").value = dados.hInicio;
    document.getElementById("hFim").value = dados.hFim;
    document.getElementById("descAula").value = dados.descAula;
    document.getElementById("date").value = dados.date.split('/').reverse().join('-');
    document.getElementById("lotacao").value = dados.lotacao;
    document.getElementById("uid").value = uid;
}

//funções para deletar a aula selecionada
function removerAula(aula){
    firebase.firestore().collection('aulas').doc(aula.uid).delete().then(()=>{
        document.getElementById(aula.uid).remove();
        window.location.reload();
    })
}

//confirma o delete
function confirmDelet(dado){
    console.log(dado);
    const showRemover = confirm(`Deseja excluir o ${dado.aula}`);

    if(showRemover){
        removerAula(dado);
    }
}

//Evento do botão que leva para o formAula de adicionar no bd
document.getElementById("btn-novaAula").onclick = function() {
    let divaula = document.getElementsByClassName("bloco-aula");
    divaula[0].style.display = 'none';

    let divPrincipal = document.getElementById("div-form-aula");
    divPrincipal.style.display = 'block';
}