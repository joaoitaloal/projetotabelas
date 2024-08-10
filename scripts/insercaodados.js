const cabecalho = document.getElementById('cabecalho');
const corpo = document.getElementById('corpo'); 
var simbols = [];
var props = [];
var simblen = simbols.length;
var proplen = props.length;
var xMax;
var yMax;

function inserirSimbolo(){
    let simbolo = document.getElementById('simb');
    if(simbolo.value.search(/[∧∨¬⊻→⇔()vf ]/) != -1){
        window.alert("simbolo inválido");
    }else if(simbolo.value.length > 1){
        window.alert("apenas um caractere por simbolo")
    }else{
        if(simbolo.value != ""){
            if(simbols.includes(simbolo.value)){
                window.alert("simbolo já inserido");
            }else if(simbols.length < 6){
                simbols.push(simbolo.value);
                document.getElementById("adicionador").innerHTML+= `<input id="bt${simbolo.value}" class="ops" type="button" value="${simbolo.value}" onclick="adicionaraProp(value)">`;
                document.getElementById("simbinseridos").innerHTML+= `<div id="divs${simbolo.value}"><p class="btsimb">${simbolo.value}</p><input id="${simbolo.value}" type="button" value="apagar" onclick="apagarSimb(id)"></div>`;
            }else{
                window.alert("no máximo seis simbolos!");
            }
        }else{
            window.alert("insira um simbolo!");
        }
    }
    simbolo.value = "";
}
function apagarSimb(id){
    //apaga o simbolo do array, do teclado e das proposições inseridas se ele tiver lá
    let apagar = simbols.indexOf(id);
    let prop = document.getElementById('prop');
    props.forEach((element) =>{
        if(element.indexOf(id) != -1){
            props = props.slice(props.indexOf(element));
            apagarProp(element);
        }
    })
    simbols.splice(apagar, 1)
    document.getElementById(`adicionador`).getElementsByClassName(`ops`)[apagar].remove();
    document.getElementById(`divs${id}`).remove();
    if(prop.value.indexOf(id) != -1){
        prop.value = prop.value.slice(0, prop.value.indexOf(id))+prop.value.slice(prop.value.indexOf(id)+1)
    }
}

function inserirProposicao(){
    var prop = document.getElementById('prop');
    if(prop.value != ""){
        props.push(prop.value);
        //Isso aqui poderia(seria melhor de entender) ser substituido por alguns .createElement, setAttribute etc
        document.getElementById("propinseridos").innerHTML+= `<div id="divp${prop.value}"><p class="btprop">${prop.value}</p><input id="${prop.value}" type="button" value="apagar" onclick="apagarProp(id)"></div>`;
    }else{
        window.alert("insira uma proposição lógica!")
    }
    prop.value = "";
}
function apagarProp(id){
    let apagar = props.indexOf(id);
    props.splice(apagar,1);
    document.getElementById(`divp${id}`).remove();
}

function adicionaraProp(valor){
    var prop = document.getElementById('prop');
    prop.value += valor;
}

function criarTabela(){
    //Resetar as variáveis
    simblen = simbols.length;
    proplen = props.length;
    xMax = simblen+proplen;
    yMax = 2**simblen;
    cabecalho.innerHTML = "";
    corpo.innerHTML = "";
    
    //inserir os simbolos em thead
    for(let i = 0; i < simblen; i++){
        let th = document.createElement("th");
        th.setAttribute("id",`sim${i}`);
        th.setAttribute("scope", "col");
        th.innerText = simbols[i];
        cabecalho.appendChild(th);
    }
    //inserir as props em thead
    for(let i = 0; i < proplen; i++){
        let th = document.createElement("th");
        th.setAttribute("id", `prop${i}`);
        th.innerText = props[i];
        cabecalho.appendChild(th);
    }
    //criar e indexar cada linha da tabela
    for(let i = 0; i < yMax; i++){
        let tr = document.createElement("tr");
        tr.setAttribute("id",`row${i}`);
        tr.setAttribute("class", "row");
        corpo.appendChild(tr);
    }
    arrayTabela();
    popularTabelasim();

    //Variável que tá sendo usada pra indicar erros manualmente
    var error = false;

    //substituir e processar a proposição e escrever na célula correspondente da tabela
    for(let x = 0; x < proplen; x++){
        if(error) break;
        for(let y = 0; y < yMax; y++){
            if(error) break;
            let prop;

            //Chamar a função dependendo da quantidade de simbolos inseridos
            switch(simblen){
                case(0): 
                    window.alert("nenhum simbolo inserido")
                    break;
                case(1):
                    prop = substituir(props[x],`x${0}y${y}`);
                    break;
                case(2):
                    prop = substituir(props[x],`x${0}y${y}`,`x${1}y${y}`);
                    break;
                case(3):
                    prop = substituir(props[x],`x${0}y${y}`,`x${1}y${y}`,`x${2}y${y}`);
                    break;
                case(4):
                    prop = substituir(props[x],`x${0}y${y}`,`x${1}y${y}`,`x${2}y${y}`,`x${3}y${y}`);
                    break;
                case(5):
                    prop = substituir(props[x],`x${0}y${y}`,`x${1}y${y}`,`x${2}y${y}`,`x${3}y${y}`,`x${4}y${y}`);
                    break;
                case(6):
                    prop = substituir(props[x],`x${0}y${y}`,`x${1}y${y}`,`x${2}y${y}`,`x${3}y${y}`,`x${4}y${y}`,`x${5}y${y}`);
                    break;                            
            }
            prop = lerProp(prop);
            if(prop == "") error = true;
            escrever(prop,`x${x+simblen}y${y}`);
        }
    }
}

//Criar e indexar cada td da tabela
function arrayTabela(){
    //rodar todas as colunas
    for(let x = 0; x < xMax; x++){
        //rodar todas as linhas da coluna
        for(let y = 0; y < yMax; y++){
            let row = document.getElementById(`row${y}`);
            row.innerHTML+= `<td id="x${x}y${y}"></td>`
        }
    }
}

//colocar todas as possibilidades de valores verdade para os simbolos na tabela
function popularTabelasim(){
    //coluna
    for(let x = 0; x < xMax - proplen; x++){
        let primeiraslinhas = 0;
        //linha
        for(let y = 0; y < yMax; y++){
            let states = "f";

            if(y < yMax/((2**x)*2)){
                //se a linha atual for metade do total de linhas multiplicado pela coluna, estado é V
                states = "v";
            }else if (y >= yMax/(2**x)){
                //se não, repetir os primeiros estados até o fim
                if(x != 0){
                states = document.getElementById(`x${x}y${primeiraslinhas}`).innerText;
                primeiraslinhas++;
                }
            }
            let td = document.getElementById(`x${x}y${y}`);
            if(states == "v") td.setAttribute("class", "verdadeiro");
            else td.setAttribute("class", "falso");
            td.innerText = states;
        }
    }
}
