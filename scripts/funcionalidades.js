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

function listrar(){
    let tr = document.getElementsByClassName("row");
    if(tr.length != 0){
        tr.array.forEach(element => {
            element.style.backgroundcolor = "black";
        });
    }
}