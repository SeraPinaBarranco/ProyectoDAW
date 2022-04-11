
window.addEventListener('load', traerDatos);
//document.getElementById('guardarNombreReceta').addEventListener('click', guardarReceta, false);
let buscador = document.querySelector('#btn-buscador');

//llama a la funcion de cargar datos y le pasa el valor del input como argumeto
buscador.addEventListener('keyup',()=>{
    traerDatos(buscador.value)
});


function traerDatos(dato){    
    //URL de la peticion
    let url= "./controller/lista_productos.php";
    //let d;   
    //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch={
        method:'POST',
        body:`nombre=${dato}`,       
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    };

    //mandar la peticion
    let promesa = fetch(url,configFetch);

    //Ejecutar la promesa que devuelve la peticion
    promesa.then( res => res.json())
            .then(datos => {         
            let d = datos;
            llenarTabla(d)                
    });
}


function eventoBoton(e){
    console.log(e.target)
}

function llenarTabla(d){
    //limitador de elementos mostrados
    let elem = 10;
    let n= 0;
    
    let tbody = document.querySelector('#tabla tbody');
    tbody.innerHTML ="";
    let tr;

   

    for (let i = 0; i < d.length; i++) {
        if(i == elem)break;
        tr=document.createElement('tr');
        tr.setAttribute('id',d[i].id_producto)
        let td = document.createElement('td');
        //td.setAttribute('id', d[i].id_producto)
        td.setAttribute('id', 'fila')
        td.innerHTML= d[i].nombre_p;
        tr.appendChild(td);
        
       
        td = document.createElement('td');        
        
        let img = document.createElement('img');
        img.setAttribute('src','./assets/plus.png');
        img.addEventListener('click', addFila,false);

        td.appendChild(img);
        tr.appendChild(td);
        
      
        n++;
        tbody.appendChild(tr);
    }

    let tfoot = document.querySelector('tfoot');
    tfoot.innerHTML ="";
    tr=document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = "Registros: <strong>" + n + "</strong> de <strong>" + d.length + "</strong>";
    tr.appendChild(td);
    tfoot.appendChild(tr);    
}

let arrayProductos = new Array();
function addFila(img){
    //capturar la fila del elemento padre, que contiene el ID
    let id_producto = img.target.parentNode.parentNode.id;
    //capturar la fila hermana, que contiene el nombre del producto
    let producto= img.target.parentNode.previousSibling.textContent;
    let p = new Array(id_producto,producto);
    //Agregar la fila al listado de recetas en un array
    arrayProductos.push(p);
    agregaIngrediente(p);
}

function agregaIngrediente(p){
    
    let ul = document.getElementById('ingredientes');
    let elem = document.createElement('li');
    elem.textContent= p[1];

    ul.appendChild(elem);
}



let formulario = document.getElementById('frm');

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    form = new FormData(formulario);

    //console.log(form.get('receta'));
    //URL de la peticion
    let url= "./controller/guardar_receta.php";
    //let d;   
    //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch={
        method:'POST',
        body:`receta=${form.get('receta')}`,       
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    };

    //mandar la peticion
    let promesa = fetch(url,configFetch);

    //Ejecutar la promesa que devuelve la peticion
    promesa.then( res => res.json())
        .then(datos => {         
            let d = datos;
            //llenarTabla(d)     
            console.log(d.error); 
            mostarMensaje(d)          
     });
})




function mostarMensaje(msj){
    if(msj.error == "Receta duplicada"){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: msj.error
        })
    }else{
        Swal.fire(
            msj.guardado + ", Busca ingredientes para añadirlos ",
            '',            
            'success'
          )
        document.getElementById('receta').disabled = true;
        document.getElementById('guardarNombreReceta').disabled = true;
        llenarTabla;
    }
}