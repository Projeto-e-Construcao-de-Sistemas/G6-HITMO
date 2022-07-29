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
        let divBtn = document.createElement('div');
        let tableSerie = document.createElement('div');

        let btnPdf = document.createElement('button');
        btnPdf.innerHTML = "Gerar PDF";
        btnPdf.classList.add('btn-medio');
        let btnSeries = document.createElement('button');
        btnSeries.innerHTML = "Ver serie";
        btnSeries.classList.add('btn-medio');

        div.classList.add('bloco-desc');
        divDesc.classList.add('bloco-cont-desc');
        div.id = serie.uid;

        div.innerHTML= `
            <h1>${serie.serie}</h1>
            <h4>${serie.cpf}</h4>
        `

        divBtn.appendChild(btnPdf);
        divBtn.appendChild(btnSeries);
        bloco.append(div);
        div.appendChild(divBtn);
        
        ///////////////Tabela///////////////
        for (let i in serie.ficha) {
            tableSerie.innerText+=`

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
        }
        ///////////////Tabela///////////////

        btnPdf.addEventListener('click', () => {
            pegarSerie(serie);
        })

        btnSeries.addEventListener('click', () => {
            verSerie(serie);
        });
    });

}

//função para pegar os dados no db apartir do uid
function pegarDadoSerie(uid){

    firebase.firestore().collection("series").doc(uid).get().then(doc =>{

        if(doc.exists){
            preencherSerie(doc.data(), uid);
        }else{
            laoding("Serie que esta tentando acessar não existe");
            window.location.href = "../instrutores.html";
        }
    }).catch(error =>{
            console.log("erro" , error);
    }
    )
}

//Função para ver a serie
function verSerie(serie){
    let bloco = document.querySelector('.bloco-serie');
    ficha = serie.ficha;
    let btnFechar = document.createElement('button');
    btnFechar.innerHTML = "Fechar";
    btnFechar.classList.add('fab');
    let tbody = document.createElement('table');;
    tbody.innerText='';

    let tr = tbody.insertRow();

        let td_serie = tr.insertCell();
        let td_quantidade = tr.insertCell();
        let td_repeticao = tr.insertCell();

        td_serie.innerText = "exercicio";
        td_quantidade.innerText = "quantidade";
        td_repeticao.innerText = "repeticao";

    for (let i in serie.ficha) {
        
        tr = tbody.insertRow();

        td_serie = tr.insertCell();
        td_quantidade = tr.insertCell();
        td_repeticao = tr.insertCell();
    

        td_serie.innerText = ficha[i].exercicio;
        td_quantidade.innerText = ficha[i].quantidade;
        td_repeticao.innerText = ficha[i].repeticoes;

    }
    bloco.append(tbody);
    bloco.append(btnFechar);

    btnFechar.addEventListener('click', () => {
        tbody.remove();
        btnFechar.remove();
    });

}

//gerar pdf da serie
function pegarSerie(serie){
    let bloco = document.querySelector('.bloco-serie');
    ficha = serie.ficha;
    let tbody = document.createElement('table');;
    tbody.innerText='';

    let tr = tbody.insertRow();

        let td_serie = tr.insertCell();
        let td_quantidade = tr.insertCell();
        let td_repeticao = tr.insertCell();

        td_serie.innerText = "exercicio";
        td_quantidade.innerText = "quantidade";
        td_repeticao.innerText = "repeticao";

    for (let i in serie.ficha) {
        
        tr = tbody.insertRow();

        td_serie = tr.insertCell();
        td_quantidade = tr.insertCell();
        td_repeticao = tr.insertCell();
    

        td_serie.innerText = ficha[i].exercicio;
        td_quantidade.innerText = ficha[i].quantidade;
        td_repeticao.innerText = ficha[i].repeticoes;
    }
    gerarPdf(tbody);
}
function gerarPdf(serie){
    const { jsPDF } = window.jspdf;

    console.log(serie);
    console.log(serie.innerText);

    let documento = serie.innerText;
    const doc = new jsPDF();
    doc.text(documento, 20, 20);
    doc.save("serie.pdf");
}

