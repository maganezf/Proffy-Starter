//procurar botao
document.querySelector("#add-time")
.addEventListener("click", cloneField)
//quando clicar no botao


//executar a acao

function cloneField(){
    //duplicar os campos
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true)          //sempre se usa 'node' pra se referir a tags/estruturas html
    
    //pegar campos
    const fields = newFieldContainer.querySelectorAll("input")                                  //todos inputs que tiver ele vai pegar

    //para cada campo, limpar
    fields.forEach(function(field){         //for each = pra cada | function ta refereciando a propria funcao acima
        //pegar field do momento e limpa
        field.value = ""
    })

    //colocar na pagina
    document.querySelector("#schedule-items").appendChild(newFieldContainer)
}