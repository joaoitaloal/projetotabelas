var maxEspera = 10000000;

//Função que substitui os simbolos da função por v ou f, pegando o valor da tabela previamente construida

function substituir(prop, simblen, y){
    for(let x = 0; x < simblen; x++){
        let val = document.getElementById(`x${x}y${y}`).innerText;
        let simb = document.getElementById(`sim${x}`).innerText;
        prop = prop.replace(new RegExp(simb, "g"), val);
    }
    return prop.replace(/v|\⊤/g,"1").replace(/f|\⊥/g,"0");
}

//função que recebe uma proposição(com v ou f no lugar dos simbolos) e retorna um valor final "1" ou "0"
function lerProp(prop){
    let controle = 0;
    //Loopar o algoritmo até a proposição retornar v ou f
    while(prop != "1" && prop != "0"){
        //Se o loop durar exageradamente muito, provavelmente ele não vai terminar então retorna um erro
        controle +=1;
        if(controle > maxEspera){
            window.alert("Tempo de espera excedido, provavelmente uma fórmula mal formada");
            return "";
        }
        //Os próximos ifs basicamente checam em sequência e em ordem de precedência do operador cada caractére que representa algum operador e resolve eles
        if(prop.includes("(")){
            if(!prop.includes(")")){window.alert("feche os parênteses!"); return "";}
            let iniparen = prop.indexOf("(")+1;
            let fimparen = prop.lastIndexOf(")")-1;
            
            //Entregar o conteudo do parentese para ser processado na própria função
            let newprop = prop.slice(iniparen,fimparen+1);
            newprop = lerProp(newprop);
            
            //Substituir o conteudo de prop pelo que foi processado dentro do parentese
            prop = prop.slice(0,iniparen-1)+newprop+prop.slice(fimparen+2,prop.length);
        }else if(prop.includes("¬")){
            let indexne = prop.indexOf("¬");
            let newprop1 = prop.slice(0,indexne);
            let newprop2 = prop.slice(indexne+2, prop.length);
            prop = newprop1+op.negacao(prop[indexne+1])+newprop2;
        }else if(prop.includes("∧")){
            //pegar os valores da esquerda e da direita da conjunção e mandar pra função conjuncao()
            let indexc = prop.indexOf("∧");
            let tempval = op.conjuncao(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a conjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("∨")){
            //pegar os valores da esquerda e da direita da disjunção e mandar pra função disjuncao()
            let indexc = prop.indexOf("∨");
            let tempval = op.disjuncao(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a disjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("⊻")){
            //pegar os valores da esquerda e da direita da disjunção e mandar pra função disjuncaoex()
            let indexc = prop.indexOf("⊻");
            let tempval = op.disjuncaoex(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a disjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("→")){
            //pegar os valores da esquerda e da direita da implicação e mandar pra função implicacao()
            let indexc = prop.indexOf("→");
            let tempval = op.implicacao(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a implicação e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("⇔")){
            //pegar os valores da esquerda e da direita da biimplicação e mandar pra função biimplicacao()
            let indexc = prop.indexOf("⇔");
            let tempval = op.biimplicacao(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a biimplicacao e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop != "1" && prop != "0"){
            //Se todos os operadores forem calculados e o resultado não for v nem f retornar um erro para evitar que loope pra sempre
            window.alert("Não foi possível calcular, provavelmente uma fórmula mal formada");
            return "";
        }
    }
    return prop;
}

//Substituir o texto do <td> de id fornecido pelo valor verdade fornecido
function escrever(state, id){
    let td = document.getElementById(id);
    if(state == "1") td.setAttribute("class", "verdadeiroprop");
    else td.setAttribute("class", "falsoprop");
    td.innerText = state == "1" ? "v" : "f";
}

//objeto com todas as operações utilizadas
const op = {
    conjuncao(x,y){
        if(x == "1" && y =="1"){
            return "1";
        }
        return "0";
    },
    disjuncao(x,y){
        if(x == "1" || y =="1"){
            return "1";
        }
        return "0";
    },
    negacao(x){
        if(x == "1"){
            return "0";
        }
        return "1"
    },
    disjuncaoex(x,y){
        return op.disjuncao(op.conjuncao(op.negacao(x),y),op.conjuncao(x,op.negacao(y)));
    },
    implicacao(x,y){
        if(x == "1" && y != "1") return "0";
        return "1";
    },
    biimplicacao(x,y){
        if(x == y) return "1";
        return "0";
    }
}