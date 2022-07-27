//pegando as series no db
firebase.firestore().collection("series").get().then((snapshot) =>{
    const serie = snapshot.docs.map((doc) => ({...doc.data(), uid: doc.id}));
    
    mostraSerie(serie);

}).catch(error =>{
        console.log("erro" , error);
})

//pegando os valores do form de serie
const form = document.querySelector("[id=form-serie]");

//passando para a pagina de cadastro de serie
function verificaSerie(series){

    //declarando e atribuidno valores as variaves
    let cpf = form.cpf.value, serie = form.serie.value,
    uid = form.uid.value, exercicio, quantidade, repeticoes, id, ficha = {}, cont = 0;

    //atribuindo ao obj exercicio dentro de serie os valores do form
    series.forEach(series => {
        exercicio = series.exercicio, quantidade = series.quantidade, repeticoes = series.repeticoes, id = series.id;

        ficha[cont] = {exercicio, quantidade, repeticoes, id};
        cont++;
    })

    //verificando o usuario e o nome da serie
    if(cpf != "" || serie != ""){

        //verificando se é uma nova serie ou se é uma atualização
        if(uid == "null"){
            const dados = {
                cpf: cpf,
                serie: serie,
                ficha: ficha
            }
            cadastraSerie(dados, uid);
        } else {
            const dados = {
            serie: serie,
            ficha: ficha
            }
            cadastraSerie(dados, uid);
        }
    } else{
        alert("Preencha todos os campos");
    }
}

//mostra a series
function mostraSerie(serie, tipo){
    
    //percorrendo todas as series do banco de dados
    serie.forEach(fichas => {

        //declarando as variaves e pegando as etiquetas no HTML
        let bloco = document.querySelector('.bloco-serie');
        let div = document.createElement('div');
        
        //atribuindo o uid do BD na div
        div.id = fichas.uid;
        
        //criando os botões
        let btnAlterar = document.createElement('button');
        btnAlterar.innerHTML = "Alterar";

        let btnExcluir = document.createElement('button');
        btnExcluir.innerHTML = "Excluir";

        //nomeando as classes das criações feitas no HTML
        div.classList.add('bloco-cont');
        btnExcluir.classList.add('btn-medio');
        btnAlterar.classList.add('btn-medio');
        

        div.innerHTML = `
            <h1>${fichas.serie}</h1>
            <h1>${fichas.cpf}</h1>
        `

        //inserindo no HTML
        bloco.append(div);
        div.appendChild(btnAlterar);
        div.appendChild(btnExcluir);
        

        //especificando o evento de click para o botão editar
        btnAlterar.addEventListener('click', () =>{
            document.getElementsByClassName("bloco-serie")[0].style.display = 'none';
            document.getElementById("div-form-serie").style.display = 'block';

            pegarDadoSerie(fichas.uid);
        });

        //Exclui a div-usuario
        btnExcluir.addEventListener('click', (event) =>{
            event.stopPropagation();

            confirmDelet(fichas);
        });
    
    });

}

//checa se o cpf existe e cadastra serie
function cadastraSerie(dados, uid){

    //checando se o CPF consta no BD
    firebase.firestore().collection('user').where('cpf', '==', cpf.value).get().then((snapshot) =>{
        const user = snapshot.docs.map((doc) => doc.data());
        if(user.length > 0){

            //checando sé é uma alteração ou nova serie
            if(uid == "null"){
                firebase.firestore().collection('series').add(dados).then(() =>{
                    console.log("nava serie cadastrada");
                    window.location.reload();
                }).catch(()=>{
                    console.log("falha ao cadastrar nova serie");
                });
            } else {
                firebase.firestore().collection('series').doc(uid).update(dados).then(() =>{
                    console.log("seire atualizada");
                    window.location.reload();
                }).catch(()=>{
                    console.log("falha ao atualizar serie");
                });
            }

        }else{
            console.log("cpf não cadastrado");
            return true;
        }
    })

}

//função para pegar os dados no db apartir do uid
function pegarDadoSerie(uid){


    firebase.firestore().collection("series").doc(uid).get().then(doc =>{

        //checando se o documento com o uid especificado existe
        if(doc.exists){
            preencherSerie(doc.data(), uid);
        }else{
            console.log("Não existe");
            window.location.href = "../../serie-instrutor.html";
        }
    }).catch(error =>{
            console.log("erro" , error);
    }
    )
}

//funções de preenchimento de form
function preencherSerie(dados, uid){

    //preencher os dados em caso de alteração de serie
    document.getElementById("cpf").value = dados.cpf;
    document.getElementById("cpf").disabled = true;
    document.getElementById("serie").value = dados.serie;
    document.getElementById("uid").value = uid;

    //passando os valores da serie no DB para a class serie
    let serie = {};
    let fichaSerie = dados.ficha;

    for(let i in fichaSerie){
        serie[i] = {exercicio: fichaSerie[i].exercicio, quantidade: fichaSerie[i].quantidade, repeticoes: fichaSerie[i].repeticoes, id: fichaSerie[i].id};
        
        serieA.adicionar(serie[i]);
        serieA.listarTabela();
    }
}
//funções para deletar a serie selecionada
function removerSerie(serie){
    
    //deletnado com base no uid da serie clicada
    firebase.firestore().collection('series').doc(serie.uid).delete().then(()=>{
        document.getElementById(serie.uid).remove();
        window.location.reload();
    })
}

//confirma o delete
function confirmDelet(dado){
    console.log(dado);
    const showRemover = confirm(`Deseja excluir o ${dado.serie}`);

    if(showRemover){
        removerSerie(dado);

    }
}

//EVENTOS DO BOTOES DE SERIES/AULAS
document.getElementById("btn-novaSerie").onclick = function() {
    let divSerie = document.getElementsByClassName("bloco-serie");
    divSerie[0].style.display = 'none';

    let divPrincipal = document.getElementById("div-form-serie");
    divPrincipal.style.display = 'block';
}