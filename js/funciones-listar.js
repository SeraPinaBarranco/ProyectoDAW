window.onload = function(){
    fetchText();
}



async function fetchText() {
    let response = await fetch('./controller/lista_productos.php');
    let misdatos;
    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.json();
        misdatos= data[0];//objeto json con los datos de la consulta
        // handle data

        //mostrar datos de la consulta        
        data.forEach(producto => {
            //console.log(producto);
            //mostar la lista
            crearLista(producto)
        });
        
    }

}

function crearLista(lista) {
    console.log(lista);
    let div = document.getElementsByClassName('div-lista');
        
    let card = document.createElement("div");
    card.setAttribute('class','card');

    let h4=document.createElement("h4");
    h4.innerHTML = lista.nombre_p;
    let hr=document.createElement("hr");
    let ul=document.createElement("ul");
    let li1=document.createElement("li");
    let li2=document.createElement("li");
    let li3=document.createElement("li");
    let li4=document.createElement("li");

    li1.innerHTML ="Calorias: " + lista.calorias;
    li2.innerHTML = "Grasas: " + lista.grasas;
    li3.innerHTML = "Hidratos" + lista.hidratos;
    li3.innerHTML = "Proteinas: " + lista.proteinas;
    
    div[0].appendChild(card);
    card.appendChild(h4);
    card.appendChild(hr);
    card.appendChild(ul);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);

    div_img = document.createElement("div");
    div_img.setAttribute("class","botones");

    div_btn_delete = document.createElement("div");
    div_btn_delete.setAttribute("class","div-btn");
    a_delete= document.createElement("a");
    a_delete.setAttribute("href","#")
    div_btn_delete.appendChild(a_delete)
    img_delete= document.createElement("img");
    img_delete.setAttribute("class","icon");
    img_delete.setAttribute("src","assets/delete.png")
    a_delete.appendChild(img_delete);

    div_btn_edit = document.createElement("div");
    div_btn_edit.setAttribute("class","div-btn");
    a_edit= document.createElement("a");
    div_btn_edit.appendChild(a_edit)
    img_edit= document.createElement("img");
    img_edit.setAttribute("class","icon");
    img_edit.setAttribute("src","assets/pencil.png")
    a_edit.appendChild(img_edit);

    div_img.appendChild(div_btn_delete);
    div_img.appendChild(div_btn_edit);

   
    card.appendChild(div_img)

}

/*
<div class="card">
<h4>Producto</h4>
            <hr>
            <ul>
                <li>Calorias: 0</li>
                <li>Grasas: 0</li>
                <li>Hidratos: 0</li>
                <li>Proteinas: 0</li>
            </ul>
            <div class="botones">
                <div class="div-btn"><a href=""></a><img class="icon" src="assets/pencil.png" alt="Editar" srcset=""></div>
                <div class="div-btn"><a href=""><img class="icon" src="assets/delete.png" alt="Eliminar" srcset=""></a></div>
            </div>

            <div class="botones">
                <div class="div-btn"><a href=""></a><img class="icon" src="assets/pencil.png" alt="Editar" srcset=""></div>
                <div class="div-btn"><a href=""><img class="icon" src="assets/delete.png" alt="Eliminar" srcset=""></a></div>
            </div>
*/