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
        let aula = formAula.aula.value, descAula = document.getElementById('descAula').value, date = formAula.date.value, lotacao = formAula.lotacao.value, hInicio = formAula.hInicio.value, hFim = formAula.hFim.value, uid = formAula.uid.value;
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
                laoding("Aula já cadastrada para esse horario");
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
        laoding("Horário inválido");
        document.getElementById('hFim').value = "";
        document.getElementById('hFim').focus();

    }

    //testando se a data esta no formato correto
    if(dataNova != "" && dataNova == dataAtual){
        console.log("Data invalida. Aula não pode ocorrer no mesmo dia");
        document.getElementById('date').value = "";
    } else if(dataNova != "" && dataNova < dataAtual){
        console.log("Data invalida. A data digitada já passou");
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
            document.getElementById('aula').value = "";
            document.getElementById('date').value = "";
            document.getElementById('hInicio').value = "";
            document.getElementById('hFim').value = "";
            document.getElementById('lotacao').value = "";
            laoding("Aula cadastrada ^^");
        }).catch(()=>{
            laoding("Cadastro de Aula falhou");
        });
    } else {
        firebase.firestore().collection('aulas').doc(uid).update(dados).then(() =>{
            laoding("Aula atualizada ^^");
            
        }).catch(()=>{
            laoding("Atualização falhou");
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
            laoding("A aula que deseja acessar não existe");
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
   
    confirmarAula(`Deseja excluir a Aula: ${dado.aula} ?`, dado);

    setTimeout(() => { endLaoding(); }, 9000);
}

function confirmarAula(text, dado){
    const div = document.createElement('div');
    div.classList.add('laoding');
    const divBloco = document.createElement('div');
    const label = document.createElement('label');
    const divButtun = document.createElement('div');

    //botões para cancelar e confirmar
    const button = document.createElement('button');
    button.classList.add('btn-medio');
    button.innerText = "Cancelar"

    const buttonConfirm = document.createElement('button');
    buttonConfirm.classList.add('btn-medio', 'confirm');
    buttonConfirm.innerText = "Confirmar"
   
    
    divBloco.classList.add('bloco-msg');
    label.innerText = text;
    
    buttonConfirm.addEventListener('click', () =>{
        endLaoding();
        removerAula(dado);
    })

    button.addEventListener('click', () =>{
        endLaoding();
        return false;
    })

    divButtun.appendChild(buttonConfirm);
    divButtun.appendChild(button);
    divBloco.appendChild(label);

    div.appendChild(divBloco);
    div.appendChild(divButtun);
    
    
    document.body.appendChild(div);
}

//Evento do botão que leva para o formAula de adicionar no bd
document.getElementById("btn-novaAula").onclick = function() {
    let divaula = document.getElementsByClassName("bloco-aula");
    divaula[0].style.display = 'none';

    let divPrincipal = document.getElementById("div-form-aula");
    divPrincipal.style.display = 'block';
}