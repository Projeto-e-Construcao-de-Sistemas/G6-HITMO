let text = "carregando";

//função para uma interface de carregamento
function laoding(text){
    //var load = $('#loading');

    const div = document.createElement('div');
    div.classList.add('laoding');
    const divBloco = document.createElement('div');
    const label = document.createElement('label');
    const button = document.createElement('button');
    button.classList.add('fab');
    button.innerText = "X"
   
    if (text) {
        divBloco.classList.add('bloco-msg');
        label.innerText = text;
        
        button.addEventListener('click', () =>{
            endLaoding();
        })

    }
    
    divBloco.appendChild(label);
    div.appendChild(divBloco);
    if (text != "carregando"){
        div.appendChild(button);
    }
    document.body.appendChild(div);
}

function endLaoding(){
    const laoding = document.getElementsByClassName('laoding');

    if(laoding.length){
        laoding[0].remove();
    }
}

