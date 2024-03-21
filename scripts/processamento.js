var maxEspera = 10000000;

//Função que substitui os simbolos da função por v ou f, pegando o valor da tabela previamente construida
function substituir(prop,simb1,simb2 = "",simb3 = "",simb4 = "",simb5 = "",simb6 = ""){
    var val1 = document.getElementById(simb1).innerText;
    simb1 = document.getElementById("sim0").innerText;
    prop = prop.replaceAll(simb1,val1);
    //Aqui ele tá vendo quantos simbolos existem e substituindo eles caso existam
    //Apesar de não ser o código mais bonito ele é simples então não tem perigo de dar qualquer bug
    if(simb2 != ""){
        var val2 = document.getElementById(simb2).innerText;
        simb2 = document.getElementById("sim1").innerText;
        prop = prop.replaceAll(simb2,val2);
        if(simb3 != ""){
            var val3 = document.getElementById(simb3).innerText;
            simb3 = document.getElementById("sim2").innerText;
            prop = prop.replaceAll(simb3,val3);
            if(simb4 != ""){
                var val4 = document.getElementById(simb4).innerText;
                simb4 = document.getElementById("sim3").innerText;
                prop = prop.replaceAll(simb4,val4);
                if(simb5 != ""){
                    var val5 = document.getElementById(simb5).innerText;
                    simb5 = document.getElementById("sim4").innerText;
                    prop = prop.replaceAll(simb5,val5);
                    if(simb6 != ""){
                        var val6 = document.getElementById(simb6).innerText;
                        simb6 = document.getElementById("sim5").innerText;
                        prop = prop.replaceAll(simb6,val6);
                    } 
                }
            }
        }
    }
    return prop;
}

//função que recebe uma proposição(com v ou f no lugar dos simbolos) e retorna um valor final
function lerProp(prop){
    var controle = 0;
    //Loopar o algoritmo até a proposição retornar v ou f
    while(prop != "v" && prop != "f"){
        //Se o loop durar exageradamente muito, provavelmente ele não vai terminar então retorna um erro
        controle +=1;
        if(controle > maxEspera){
            window.alert("Tempo de espera excedido, provavelmente uma fórmula mal formulada");
            return "";
        }
        //Os próximos ifs basicamente checam em sequência e em ordem de precedência do operador cada caractére que representa algum operador e resolve eles
        if(prop.includes("(")){
            if(!prop.includes(")")){window.alert("feche os parênteses!"); return "";}
            var iniparen = prop.indexOf("(")+1;
            var fimparen = prop.lastIndexOf(")")-1;
            
            //Entregar o conteudo do parentese para ser processado na própria função
            var newprop = prop.slice(iniparen,fimparen+1);
            newprop = lerProp(newprop);
            
            //Substituir o conteudo de prop pelo que foi processado dentro do parentese
            prop = prop.slice(0,iniparen-1)+newprop+prop.slice(fimparen+2,prop.length);
        }else if(prop.includes("¬")){
            indexne = prop.indexOf("¬");
            //Pegar o valor do primeiro v e do primeiro f e ver qual vem primeiro para ser invertido
            indexv = prop.indexOf("v");
            indexf = prop.indexOf("f");

            if(indexf != -1 && indexv != -1){
                if(indexf > indexv){
                    let newprop1 = prop.slice(0,indexv);
                    let newprop2 = prop.slice(indexv+1, prop.length);
                    prop = newprop1+"f"+newprop2;
                    newprop1 = prop.slice(0,indexne);
                    newprop2 = prop.slice(indexne+1, prop.length);
                    prop = newprop1+newprop2;
                }else{
                    let newprop1 = prop.slice(0,indexf);
                    let newprop2 = prop.slice(indexf+1, prop.length);
                    prop = newprop1+"v"+newprop2;
                    newprop1 = prop.slice(0,indexne);
                    newprop2 = prop.slice(indexne+1, prop.length);
                    prop = newprop1+newprop2;
                }
            }else if(indexf != -1){
                let newprop1 = prop.slice(0,indexf);
                let newprop2 = prop.slice(indexf+1, prop.length);
                prop = newprop1+"v"+newprop2;
                newprop1 = prop.slice(0,indexne);
                newprop2 = prop.slice(indexne+1, prop.length);
                prop = newprop1+newprop2;
            }else{
                let newprop1 = prop.slice(0,indexv);
                let newprop2 = prop.slice(indexv+1, prop.length);
                prop = newprop1+"f"+newprop2;
                newprop1 = prop.slice(0,indexne);
                newprop2 = prop.slice(indexne+1, prop.length);
                prop = newprop1+newprop2;
            }
            
        }else if(prop.includes("∧")){
            //pegar os valores da esquerda e da direita da conjunção e mandar pra função conjuncao()
            indexc = prop.indexOf("∧");
            let tempval = op.conjuncao(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a conjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("∨")){
            //pegar os valores da esquerda e da direita da disjunção e mandar pra função disjuncao()
            indexc = prop.indexOf("∨");
            let tempval = op.disjuncao(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a disjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("⊻")){
            //pegar os valores da esquerda e da direita da disjunção e mandar pra função disjuncaoex()
            indexc = prop.indexOf("⊻");
            let tempval = op.disjuncaoex(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a disjunção e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("→")){
            //pegar os valores da esquerda e da direita da implicação e mandar pra função implicacao()
            indexc = prop.indexOf("→");
            let tempval = op.implicacao(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a implicação e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop.includes("⇔")){
            //pegar os valores da esquerda e da direita da biimplicação e mandar pra função biimplicacao()
            indexc = prop.indexOf("⇔");
            let tempval = op.biimplicacao(prop[indexc-1],prop[indexc+1]);
            
            //cortar fora a biimplicacao e os valores e inserir o valor processado
            let newprop1 = prop.slice(0,indexc-1);
            let newprop2 = prop.slice(indexc+2, prop.length);
            prop = newprop1+tempval+newprop2;
        }else if(prop != "v" && prop != "f"){
            //Se todos os operadores forem calculados e o resultado não for v nem f retornar um erro para evitar que loope pra sempre
            window.alert("Não foi possível calcular, provavelmente uma fórmula mal formulada");
            return "";
        }
    }
    return prop;
}

//Substituir o texto do <td> de id fornecido pelo valor verdade fornecido
function escrever(state, id){
    td = document.getElementById(id);
    if(state == "v") td.setAttribute("class", "verdadeiroprop");
    else td.setAttribute("class", "falsoprop");
    td.innerText = state;
}

//objeto com todas as operações utilizadas
const op = {
    conjuncao(x,y){
        if(x == "v" && y =="v"){
            return "v";
        }
        return "f";
    },
    disjuncao(x,y){
        if(x == "v" || y =="v"){
            return "v";
        }
        return "f";
    },
    negacao(x){
        if(x == "v"){
            return "f";
        }
        return "v"
    },
    disjuncaoex(x,y){
        return op.disjuncao(op.conjuncao(op.negacao(x),y),op.conjuncao(x,op.negacao(y)));
    },
    implicacao(x,y){
        if(x == "v" && y != "v") return "f";
        return "v";
    },
    biimplicacao(x,y){
        if(x == y) return "v";
        return "f";
    }
}