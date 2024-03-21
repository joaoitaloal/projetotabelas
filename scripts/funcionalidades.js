var selecionado = false;
var bttPosX = 0;
var bttPosY = 0;
var tec = document.getElementById("teclado");
var tecinput = document.getElementById("prop");
var btts = document.getElementsByClassName("inserir");

const enterHandler = (e) =>{
    //Aceitar o enter como forma de inserir simbolo se estiver com foco
    if(e.code === "Enter"){
        inserirSimbolo();
    }else if(e.code === "ArrowDown"){
        selecionar();
        //Perder o foco do input
        let input = document.getElementById("simb");
        input.blur();
    }
}

const seletor = (e) =>{
    //Selecionar e chamar as funções correspondentes de cada botão da div "teclado"
    if(e.code === "ArrowRight"){
        btts[bttPosX][bttPosY].removeAttribute("id");
        if(bttPosY+1 < btts[bttPosX].length){
            bttPosY+=1;
        }else if(bttPosX+1 <= 2){
            bttPosY = 0;
            bttPosX+=1;
        }
        btts[bttPosX][bttPosY].setAttribute("id", "opmarcada");
    }else if(e.code === "ArrowLeft"){
        btts[bttPosX][bttPosY].removeAttribute("id");
        if(bttPosY-1 >= 0){
            bttPosY-=1;
        }else if(bttPosX-1 >= 0){
            bttPosX-=1;
            bttPosY = btts[bttPosX].length - 1;
        }
        btts[bttPosX][bttPosY].setAttribute("id", "opmarcada");
    }else if(e.code === "ArrowUp"){
        btts[bttPosX][bttPosY].removeAttribute("id");
        if(bttPosX-1 >= 0){
            bttPosY = 0;
            bttPosX-=1;
            btts[bttPosX][bttPosY].setAttribute("id", "opmarcada");
        }else{
            deselecionar();
            let input = document.getElementById("simb");
            input.focus();
        }
    }else if(e.code === "ArrowDown"){
        btts[bttPosX][bttPosY].removeAttribute("id");
        if(bttPosX+1 <= 2){
            bttPosY = 0;
            bttPosX+=1;
        }
        btts[bttPosX][bttPosY].setAttribute("id", "opmarcada");
    }
    if(e.code === "Enter"){
        if(bttPosX == 0 && bttPosY == 0){
            inserirProposicao();
        }else if(bttPosX == 0 && bttPosY == 1){
            criarTabela();
        }else if(bttPosX == 1){
            adicionaraProp(btts[bttPosX][bttPosY].value);
        }else if(bttPosX == 2 && bttPosY == 0){
            apagar();
        }else if(bttPosX == 2 && bttPosY == 1){
            limpar();
        }
    }
    if(e.code === "Backspace"){
        apagar();
    }
}

//criar e remover eventListener quando o input ganha e perde foco
function entrada(){
    document.addEventListener('keyup', enterHandler)
}
function saida(){
    document.removeEventListener('keyup', enterHandler)
}

//apagar último caractere do input e limpar input
function apagar(){
    let apagar = document.getElementById("prop");
    apagar.value = apagar.value.slice(0, apagar.value.length -1);
}
function limpar(){
    let limpar = document.getElementById("prop");
    limpar.value = "";
}

//Ver quando a div "teclado" é clicado e iniciar opção de movimento por teclado
tec.addEventListener("click", selecionar);
tec.addEventListener("mouseleave", deselecionar);
btts = Array.prototype.concat(btts, document.getElementsByClassName("ops"));
btts = Array.prototype.concat(btts, document.getElementsByClassName("apagar"));
//btts: coleção de todos os objetos html que são botões dentro da div "teclado"

function selecionar(){
    //Resetar seleção e chamar o listener do seletor
    if(!selecionado){
        selecionado = true;
        bttPosX = 0;
        bttPosY = 0;
        btts[bttPosX][bttPosY].setAttribute("id", "opmarcada");
        document.addEventListener("keydown", seletor)
    }
}
function deselecionar(){
    //Resetar a seleção e remover o listener do seletor
    if(selecionado){
        btts[bttPosX][bttPosY].removeAttribute("id");
        document.removeEventListener("keydown", seletor);
        selecionado = false;
    }
}