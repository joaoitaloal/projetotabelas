const enterHandler = (e) =>{
    if(e.code === "Enter"){
        inserirSimbolo();
    }else if(e.code === "ArrowDown"){
        selecionar();
        //Perder o foco do input
        //Não sei jquery, achei isso no stack overflow
        let el = document.querySelector( ':focus' );
        if( el ) el.blur();
    }
}
const seletor = (e) =>{
    if(e.code === "ArrowRight"){
        btts[x][y].removeAttribute("id");
        if(y+1 < btts[x].length){
            y+=1;
        }else if(x+1 <= 2){
            y = 0;
            x+=1;
        }
        btts[x][y].setAttribute("id", "opmarcada");
    }else if(e.code === "ArrowLeft"){
        btts[x][y].removeAttribute("id");
        if(y-1 >= 0){
            y-=1;
        }else if(x-1 >= 0){
            x-=1;
            y = btts[x].length - 1;
        }
        btts[x][y].setAttribute("id", "opmarcada");
    }else if(e.code === "ArrowUp"){
        btts[x][y].removeAttribute("id");
        if(x-1 >= 0){
            y = 0;
            x-=1;
            btts[x][y].setAttribute("id", "opmarcada");
        }else{
            deselecionar();
            let input = document.getElementById("simb");
            input.focus();
        }
    }else if(e.code === "ArrowDown"){
        btts[x][y].removeAttribute("id");
        if(x+1 <= 2){
            y = 0;
            x+=1;
        }
        btts[x][y].setAttribute("id", "opmarcada");
    }
    if(e.code === "Enter"){
        if(x == 0 && y == 0){
            inserirProposicao();
        }else if(x == 0 && y == 1){
            criarTabela();
        }else if(x == 1){
            adicionaraProp(btts[x][y].value);
        }else if(x == 2 && y == 0){
            apagar();
        }else if(x == 2 && y == 1){
            limpar();
        }
    }
    if(e.code === "Backspace"){
        apagar();
    }
}

function entrada(){
    document.addEventListener('keyup', enterHandler)
}
function saida(){
    document.removeEventListener('keyup', enterHandler)
}

function apagar(){
    let apagar = document.getElementById("prop");
    apagar.value = apagar.value.slice(0, apagar.value.length -1);
}
function limpar(){
    let limpar = document.getElementById("prop");
    limpar.value = "";
}

var selecionado = false;
var x = 0;
var y = 0;
var tec = document.getElementById("teclado");
var tecinput = document.getElementById("prop");
tec.addEventListener("click", selecionar);
//O eventlistener do input não funciona, provavelmente pq ele tá desativado, se colocar uma div invisivel por cima e botar o eventlistener nela deve funcionar mas não acho que seja um grande problema
tecinput.addEventListener("click", selecionar);
tec.addEventListener("mouseleave", deselecionar);
var btts = document.getElementsByClassName("inserir");
btts = Array.prototype.concat(btts, document.getElementsByClassName("ops"));
btts = Array.prototype.concat(btts, document.getElementsByClassName("apagar"));

function selecionar(){
    if(!selecionado){
        selecionado = true;
        x = 0;
        y = 0;
        btts[x][y].setAttribute("id", "opmarcada");
        document.addEventListener("keydown", seletor)
        
    }
}
function deselecionar(){
    if(selecionado){
        btts[x][y].removeAttribute("id");
        x = 0;
        y = 0;
        document.removeEventListener("keydown", seletor);
        selecionado = false;
    }
}

//testar o metodo .focus(); pra fazer o movimento de teclado