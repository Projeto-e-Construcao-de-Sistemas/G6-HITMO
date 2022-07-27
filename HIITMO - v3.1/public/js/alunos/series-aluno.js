firebase.auth().onAuthStateChanged(user =>{
    if(user){
      pegarInfoDB(user);  
    }
});

//pegando as informações do BD
function pegarInfoDB(email){

    firebase.firestore().collection("user").where("email", "==", email.email).get().then(snapshot =>{
        const users = snapshot.docs.map(doc => doc.data());

        infoSerie(users[0]);
        
    }).catch(error =>{
            console.log("erro" , error);
    })

}

function infoSerie(cpf){

    firebase.firestore().collection("series").where('cpf', '==', cpf.cpf).get().then((snapshot) =>{
        const serie = snapshot.docs.map((doc) => ({...doc.data(), uid: doc.id}));

        mostraSerie(serie);
        
    }).catch(error =>{
            console.log("erro" , error);
    })
}

//mostra a series
function mostraSerie(serie){

    serie.forEach(serie => {
        let bloco = document.querySelector('.bloco-serie');
        let divDesc = document.createElement('div');
        let div = document.createElement('div');
        let tableSerie = document.createElement('div');
        div.classList.add('bloco-desc');
        divDesc.classList.add('bloco-cont-desc');
        div.id = serie.uid;

        console.log(serie);
        console.log(serie.ficha);
        console.log(serie.ficha.exercicio);
        
        div.innerHTML = `
            <h1>${serie.serie}</h1>
            <h4>${serie.cpf}</h4>
        `
        bloco.append(div);
        div.appendChild(divDesc);

        
        ///////////////Tabela///////////////
        for (let i in serie.ficha) {
            tableSerie.innerHTML+=`

                <table border="3">
                <thead>
                <tr>
                    <th>Exercicio</th>
                    <th>Quantidade</th>
                    <th>Repetições</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>${serie.ficha[i].exercicio}</td>
                    <td>${serie.ficha[i].quantidade}</td>
                    <td>${serie.ficha[i].repeticoes}</td>
                </tr>
                </table>
                `;

            bloco.append(tableSerie);
        }

        ////////////

    });

}

//função para pegar os dados no db apartir do uid
function pegarDadoSerie(uid){

    firebase.firestore().collection("series").doc(uid).get().then(doc =>{

        if(doc.exists){
            preencherSerie(doc.data(), uid);
        }else{
            console.log("Não existe");
            window.location.href = "../instrutores.html";
        }
    }).catch(error =>{
            console.log("erro" , error);
    }
    )
}

