const keyHandler = (e) =>{
    if(e.code === "Enter"){
        inserirSimbolo();
    }
}

function entrada(){
    document.addEventListener('keyup', keyHandler)
}
function saida(){
    document.removeEventListener('keyup', keyHandler)
}

function apagar(){
    let apagar = document.getElementById("prop");
    apagar.value = apagar.value.slice(0, apagar.value.length -1);
}
function limpar(){
    let limpar = document.getElementById("prop");
    limpar.value = "";
}