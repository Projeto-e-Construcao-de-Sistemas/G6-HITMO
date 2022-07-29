//Pegadno os dados do tipo ALUNO no firestore
firebase.firestore().collection("user").where('tipo', '==', 'aluno').get().then((snapshot) =>{
    const users = snapshot.docs.map((doc) => ({...doc.data(), uid: doc.id}));

    mostraAlunos(users);
    
}).catch(error =>{
        laoding("erro: " + error);
})

//função para criar as divs dos alunos no firestore
function mostraAlunos(aluno){

    aluno.forEach(aluno => {
        let bloco = document.querySelector('#alunos');
    
        let div = document.createElement('div');
        div.classList.add('bloco-cont');
        div.id = aluno.uid;

        //criando os botões
        let btnAlterar = document.createElement('button');
        btnAlterar.innerHTML = "Alterar";

        let btnExcluir = document.createElement('button');
        btnExcluir.innerHTML = "Excluir";

        btnExcluir.classList.add('btn-medio');
        btnAlterar.classList.add('btn-medio');

        div.innerHTML = `
            <h1>${aluno.nome}</h1>
            <h4>${aluno.email}</h4>
            <h4>${aluno.cpf}</h4>
        `
        div.appendChild(btnAlterar);
        div.appendChild(btnExcluir);

        bloco.append(div);

        //especificando o evento de click para o botão editar
        btnAlterar.addEventListener('click', () =>{
            window.location.href = "../cadastro.html?uid=" + aluno.uid;
        });

        //Exclui a div-usuario
        btnExcluir.addEventListener('click', (event) =>{
            event.stopPropagation();

            confirmDelet(aluno);
        });
    });

}

//função para deletar o aluno
function removerAluno(aluno){
    firebase.firestore().collection('user').doc(aluno.uid).delete().then(()=>{
        document.getElementById(aluno.uid).remove();
    })
}

//confirma o delete
function confirmDelet(aluno){
    confirmarAluno(`Deseja excluir o Aluno: ${aluno.nome} ?`, aluno);
    setTimeout(() => { endLaoding(); }, 9000);
}

function confirmarAluno(text, dado){
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
        removerAluno(dado);
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