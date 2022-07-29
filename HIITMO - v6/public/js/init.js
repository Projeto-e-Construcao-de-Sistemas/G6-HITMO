//variavel para pegar o e-mail do usuario
var emailGlobal, tipoGlobal;
firebase.auth().onAuthStateChanged(user =>{
    if(user){
        emailGlobal = user;
        pegarInfoDB(emailGlobal);  
    }
});


//pegando as informações do BD com base no email logado
function pegarInfoDB(email){

    firebase.firestore().collection("user").where("email", "==", email.email).get().then(snapshot =>{
        const users = snapshot.docs.map(doc => doc.data()); 
        tipoUser(users[0].tipo);

        //alterando o valor da variavel global para obter o cpf do usuario
        emailGlobal = users[0].email;

    }).catch(error =>{
        laoding("erro: " , error);
    })
}

function verificaTipo(aula){
    firebase.firestore().collection("user").where("email", "==", emailGlobal.email).get().then(snapshot =>{
        const users = snapshot.docs.map(doc => doc.data()); 
        mostraAula(aula, users[0].tipo);
    })
}


//Motrando as aulas
firebase.firestore().collection("aulas").get().then((snapshot) =>{
    const aula = snapshot.docs.map((doc) => ({...doc.data(), uid: doc.id}));
    verificaTipo(aula);
}).catch(error =>{
        console.log("erro" , error);
})


function mostraAula(aula, tipo){

    aula.forEach(aula => {
        //declarando as variaveis a serem usadas
        let date = new Date();
        let bloco = document.querySelector('.bloco-inicio');
        let blocoLateral = document.querySelector('.bloco-inicio-lateral');
        
        //criando os elementos do HTML
        let aulaEn = document.createElement('p');
        let div = document.createElement('div');
        
        //inserindo o valor do uid na div
        div.id = aula.uid;

        //criando os botões
        let btnInscrever= document.createElement('button');
        btnInscrever.innerHTML = "Inscrever";

        
        //nomeando
        div.classList.add('bloco-cont');
        btnInscrever.classList.add('btn-medio');

        //contando o nuemro de inscritos
        let i, cont = 0;
        for(i in aula.inscritos){
            cont++;
        }

        //formulando o lboco de aula
        div.innerHTML = `
            <h1>${aula.aula}</h1>
            <h4>${aula.date}</h4>
            <h4>${aula.hInicio} - ${aula.hFim}</h4>
            <h3>${cont} / ${aula.lotacao}</h2>
        `;

    
        //verificando se a aula está terminada ou lotada
        if(aula.date >= date.toLocaleDateString()){
            bloco.append(div);
            aulaEn.innerHTML = "Aula Encerrada";
            

            if(aula.lotacao > cont && tipo == "aluno"){
                div.appendChild(btnInscrever);
            }
            
        } else if(aula.date < date.toLocaleDateString()){
            blocoLateral.append(div);
            div.appendChild(aulaEn);
        } else if(!(aula.lotacao > cont)){
            blocoLateral.append(div);
            aulaEn.innerHTML = "Aula Lotada";
            div.appendChild(aulaEn);
        }
        
        div.addEventListener('click', () =>{
            laoding(aula.descAula);
        })
        btnInscrever.addEventListener('click', () =>{
            inscreverAula(aula);
        })
    });

    endLaoding();
}

function inscreverAula(aula){
    //declarando as variaveis para uso e atribuindo valores a ela
    let inscricao = aula.inscritos;
    let maximo = aula.lotacao;
    let numeroInscritos = aula.numeroInscritos+1;

    //verificando se o a aula está lotada
    if(maximo > numeroInscritos){
        let checkCPF = false;
        for(let i = 1; i <= numeroInscritos; i++){
            if(inscricao[i] == emailGlobal){
                laoding("Você já está inscrito nessa aula *-*");
                checkCPF = true;
            }
        }
        //verificnado se o CPF existe no bd
        if(checkCPF == false){
            inscricao[numeroInscritos] = emailGlobal;

            const dadosIn = {
                aula: aula.aula,
                descAula: aula.descAula,
                date: aula.date,
                numeroInscritos: numeroInscritos,
                lotacao: aula.lotacao,
                inscritos: inscricao

            }
        //adicioando a inscritos no bd
        firebase.firestore().collection("aulas").doc(aula.uid).update(dadosIn).then(() =>{
            laoding("Inscrito na Aula ^^");
        }).catch(()=>{
            laoding("Falha ao inscrever, tente novamente T-T");
        });
        }
    } else{
        laoding("Aula lotada -_-");
    }
}