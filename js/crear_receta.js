// var  d = [{nombre:"ACE"}];
// console.log( typeof d)
// //Inicializa datatables
// $(document).ready(function() {

//     //let d = traerDatos();
    
//     $('#example').DataTable( { 
//         data: d[0],   
//         columns:[{
//             title:"Producto"
//         }]
//     } );
// } );

window.addEventListener('load', traerDatos);
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
    let pag = Math.round(d.length / 10);//paginador
    console.log( d.length + " -- " + pag)
    let tbody = document.querySelector('#tabla tbody');
    tbody.innerHTML ="";
    let tr;

   

    for (let i = 0; i < d.length; i++) {
        if(i == elem)break;
        tr=document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML= d[i].nombre_p;
        tr.appendChild(td);
        //console.log(d[i].nombre_p)
        
        tbody.appendChild(tr);
    }

    let tfoot = document.querySelector('tfoot');
    tfoot.innerHTML ="";
    for (let i = 0; i < pag; i+=10) {
        
        tr=document.createElement('tr');
        let td = document.createElement('td');
        let btn = document.createElement('button');
        btn.setAttribute('id','btn'+i)
        btn.innerHTML = i;
        td.appendChild(btn);
        tr.appendChild(td);
        tfoot.appendChild(tr);
    }
}


