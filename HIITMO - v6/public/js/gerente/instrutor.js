//Pegadno os dados do tipo INSTRUTOR no firestore
firebase.firestore().collection("user").where('tipo', '==', 'instrutor').get().then((snapshot) =>{
    const users = snapshot.docs.map((doc) => ({...doc.data(), uid: doc.id}));
    laoding("carregando");
    mostraInstrutores(users);
    
}).catch(error =>{
        laoding("Erro:" + error);
})

//função para criar as divs dos INSTRUTORES no firestore
function mostraInstrutores(instrutor){
    instrutor.forEach(instrutor => {
        let bloco = document.querySelector('#instrutores');
    
        let div = document.createElement('div');
        div.id = instrutor.uid;
        
        //criando os botões
        let btnAlterar = document.createElement('button');
        btnAlterar.innerHTML = "Alterar";

        let btnExcluir = document.createElement('button');
        btnExcluir.innerHTML = "Excluir";

        div.classList.add('bloco-cont');
        btnExcluir.classList.add('btn-medio');
        btnAlterar.classList.add('btn-medio');

        div.innerHTML = `
            <h1>${instrutor.nome}</h1>
            <h4>${instrutor.email}</h4>
            <h4>${instrutor.cpf}</h4>
        `
        div.appendChild(btnAlterar);
        div.appendChild(btnExcluir);
        bloco.append(div);

            //especificando o evento de click para o botão editar
            btnAlterar.addEventListener('click', () =>{
                window.location.href = "../cadastro.html?uid=" + instrutor.uid;
            });

            //Exclui a div-usuario
            btnExcluir.addEventListener('click', (event) =>{
                event.stopPropagation();

                confirmDelet(instrutor);
            });
    });

    endLaoding();
}

//função para deletar o instrutor
function removerInstrutor(instrutor){
    firebase.firestore().collection('user').doc(instrutor.uid).delete().then(()=>{
        document.getElementById(instrutor.uid).remove();
    })
}

//confirma o delete
function confirmDelet(instrutor){
    confirmarInstrutor(`Deseja excluir o Instrutor: ${instrutor.nome} ?`,instrutor);
    setTimeout(() => { endLaoding(); }, 9000);
}

function confirmarInstrutor(text, dado){
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
        removerInstrutor(dado);
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

