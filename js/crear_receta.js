
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

//Llena la tabla de alimentos
function llenarTabla(d=[]){
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
        let input = document.createElement('input');
        input.setAttribute('type','number');
        input.setAttribute('id','cant');
        input.setAttribute('value','0');
        input.setAttribute('min','0');
        td.appendChild(input);
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
    let producto= img.target.parentNode.previousSibling.previousSibling.textContent;
    //capturar la fila hermana, que contiene la cantidad del producto
    let cantidad= img.target.parentNode.previousSibling.lastChild.value;
   
    let p = new Array(id_producto,producto,cantidad);
    //Agregar la fila al listado de recetas en un array
    arrayProductos.push(p);
    agregaIngrediente(p);
}

let btnFinalizar = document.getElementById('finalizar');
btnFinalizar.addEventListener('click', finalizarReceta);
let ul = document.getElementById('ingredientes');
function agregaIngrediente(p){
    
    btnFinalizar.hidden = false;
    
    let elem = document.createElement('li');
    elem.textContent= p[1] + ": " + p[2];

    ul.appendChild(elem);
}


//GUARDA LA RECETA (A??ADIDO EL ID USUARIO)
let formulario = document.getElementById('frm');
let form;
let myReceta="";
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    form = new FormData(formulario);
    myReceta= form.get('receta');
    if(myReceta == "")return;

    //URL de la peticion
    let url= "./controller/guardar_receta.php";
     
    //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch={
        method:'POST',
        body:`receta=${form.get('receta')}&id_usuario=${form.get('usuario')}`,       
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    };
    
    //mandar la peticion
    let promesa = fetch(url,configFetch);

    //Ejecutar la promesa que devuelve la peticion
    promesa.then( res => res.json())
        .then(datos => {         
           let d = datos;
           //console.log(d);
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
            msj.guardado + ", Busca ingredientes para a??adirlos ",
            '',            
            'success'
          )
        document.getElementById('btn-buscador').disabled =false;
        document.getElementById('receta').disabled = true;
        document.getElementById('guardarNombreReceta').disabled = true;
        llenarTabla;
        
    }
}

//Finaliza la receta recorriendo el array de los productos
//y guardarlos junto con el nombre de la receta
function finalizarReceta(){
    //Nombre de la receta
    let r = myReceta;
   
    //OBtener el id de la receta
    let url= "./controller/lista_recetas.php";       
    //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch={
        method:'POST',
        body:`nombre=${r}`,       
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    };
    //mandar la peticion
    var d;
    fetch(url,configFetch)
        .then( res => res.json())
        .then(datos => {         
            d = datos;
            addIngredientesReceta(d[0].id_recetas);
            myReceta = "";
            addIngredientesReceta= [];
            //ir al listado de recetas
            setTimeout(() => {
                window.location.replace("./listar_recetas.php");                
            }, 2000);

        });

}

function addIngredientesReceta(cook){
    url= "./controller/graba_receta_producto.php"; 
    let codigo=0;
    for (let i = 0; i < arrayProductos.length; i++) {
    
        configFetch={
            method:'POST',
            body:`receta=${cook}&id_p=${arrayProductos[i][0]}&cantidad=${arrayProductos[i][2]}`,       
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        };
        fetch(url,configFetch)
            .then( res => res.json())
            .then(datos => {         
                console.log(datos);  
                codigo = datos.codigo; 
                
                if(codigo == 1){
                    Swal.fire(
                        "Receta creada con ??xito",
                        '',            
                        'success'
                    )
            
                    //si la receta se creado bien
                    //reiniciar formulario
                    ul.innerHTML ="";
                    document.getElementById('finalizar').hidden = true;
                    document.getElementById('frm').reset();
                    document.getElementById('btn-buscador').disabled=true;
                    document.getElementById('receta').disabled=false;
                    llenarTabla();
                }                
        });
    }
}
