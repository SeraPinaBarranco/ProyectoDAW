//*Busca el id del objetivo y lo asigna a id_objetivo_oculto
function buscaIdOBjetivo(){
    
    let url = "./controller/obtener_objetivo.php";
    // // //let d;
    // // //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch = { 
        method: "POST",
        body: `id_u=${id_usu}&fecha=${fecha.value}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion    
    promesa
        .then((res) => res.json())
        .then((datos) => {
        d = datos.id_objetivo;
        /*id_obj = datos.id_objetivo//^Cada vez que cambia la fecha tengo el id del objetivo*/
        //id_obj_oculto.innerHTML = datos.id_objetivo
        //id_obj = parseInt(id_obj_oculto.innerHTML)  
        id_obj_oculto.innerHTML = d             
    })
}


//* Trae valores a los inputs parametros=id_objetivo
function traeValoresAInputs(io){
    let url = "./controller/listar_objetivo_dia.php";
   
    let configFetch = { 
        method: "POST",
        body: `id_obj=${io}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion    
    promesa
        .then((res) => res.json())
        .then((datos) => {       
        //console.log(datos) 
        inputC.value = datos.objCal     
        inputG.value = datos.objGra
        inputH.value = datos.objHid
        inputP.value = datos.objPro
    })
}
      
//*Carga la tabla totales en el html
function cargaTablaTotales(io){
    let url = "./controller/lista_sumaobjs_tabla.php";
     
    let configFetch = { 
        method: "POST",
        body: `id_obj=${io}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion    
    promesa
        .then((res) => res.text())
        .then((datos) => {  
        if(datos){
            //si la consulta trae datos los muestra
            let mybody = document.querySelector('#myBody')
            //mybody.innerHTML = ""    
            mybody.innerHTML=datos
            col4.setAttribute('style','dispaly:flex')
            
        }else{ //si la consulta no trae datos, pone un mensage en la tabla           
            Swal.fire({
                icon: 'warning',
                title: 'Sin datos',
                text: 'Este día no tiene datos!'
              })
            //col4.setAttribute('style','display:none')
        }  

    })
}

//*Carga la tabla totales en el html sin BORRAR
function consultaTablaTotales(io){
    let url = "./controller/lista_sumaobjs_tabla_sinborrar.php";
     
    let configFetch = { 
        method: "POST",
        body: `id_obj=${io}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion    
    promesa
        .then((res) => res.text())
        .then((datos) => {  
        if(datos){
            //si la consulta trae datos los muestra
            let mybody = document.querySelector('#myBody')
            //mybody.innerHTML = ""    
            mybody.innerHTML=datos
            col4.setAttribute('style','dispaly:flex')
            
        }else{ //si la consulta no trae datos, pone un mensage en la tabla           
            Swal.fire({
                icon: 'warning',
                title: 'Sin datos',
                text: 'Este día no tiene datos!'
              })
            //col4.setAttribute('style','display:none')
        }  

    })
}


//*Borrar la fila seleccionada de la tabla totales
function borrarFilaDeTotalesBBDD(id){
    let url = "./controller/borra_fila_de_totales.php";
     
    let configFetch = { 
        method: "POST",
        body: `id_obj_detalle=${id}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion    
     promesa
        .then((res) => res.json())
        .then((datos) => {  
            console.log(datos)
    })
}


/**
 * *Almacena en base de datos cada fila de totales y la almacena
 * @param {int} io 
 * @param {int} iu 
 * @param {int} r 
 * @param {float} sc 
 * @param {float} sg 
 * @param {float} sh 
 * @param {float} sp 
 */
function addFila_a_sumaObjetivo(io, iu, r, sc, sg, sh, sp){
    //* agrega_edita_fila_nueva_totales.php
    let url = "./controller/agrega_edita_fila_nueva_totales.php"
    let body = `obj=${io}&usu=${iu}&r=${r}&c=${sc}&g=${sg}&h=${sh}&p=${sp}`

    let configFetch = { 
        method: "POST",
        body: body,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion    
     promesa
        .then((res) => res.json())
        .then((datos) => {  
            console.log(datos)
    })
}

/* Al dar al boton Guardar objetivo, 
//* 1- lo guarde en BD
//* 2- Almacenar el Id-del objetivo
//* 3- Mostrar botones de las tablas*/
function guardarObjetivoTraerIdObjetivo(texto){ 
    
    //^ 1º   
    let url = "./controller/guardar_objetivos.php";
    // // //let d;
    // // //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch = {
        method: "POST",
        body: `id_u=${id_usu}&fecha=${fecha.value}&inputC=${inputC.value}&inputG=${inputG.value}&inputH=${inputH.value}&inputP=${inputP.value}&boton=${texto}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    console.log(configFetch.body)
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion
    let d = "";
    promesa
        .then((res) => res.json())
        .then((datos) => {
        d = datos;
        console.log(datos);
        //^ 2º
        id_obj = datos.id_objetivo
        console.log(id_obj)

        //^3º
        //mostrarBotonesTablas()
        //Si hay error o exito al guardar el objetivo
        if (d.codigo == 1) {
            Swal.fire({
            icon: "success",
            title: "",
            text: "Objetivo Guardado!",
            });
            buscaIdOBjetivo()//Llama a buscar el objetivo                
            setTimeout(() => {
                textoBotonGuardarEditar()//Cambia el texto del boton                
            }, 500);
        } else {
            Swal.fire({
            icon: "error",
            title: "",
            text: "Error al guardar, ¿Datos duplicados? Puedes Editar",
            });
        }
    })

    //cambiaTextoBotonGuardaEdita()
    
   
}


//* Suma el total de la tabla de totales
function sumaTotalesTabla(){
    
    var total_col1 = 0;
    var total_col2 = 0;
    var total_col3 = 0;
    var total_col4 = 0;
    
    //Selecionar la tabla y el tfood  
    let t = document.getElementById('tablaADD')
    let tbody= document.querySelector('#myBody')
    let foot = document.querySelector('tfoot')
    let td = t.querySelectorAll('tbody tr')

    //* Añade las sumas de cada fila y almacena todos los valores para añadirlos al array para guardar los daos

    for (let i = 0; i < td.length; i++) {
        id_obj_detalle = td[i].querySelector('td').innerHTML
        id_recetas = td[i].querySelector('td + td').innerHTML
        nombre_receta = td[i].querySelector('td + td + td').innerHTML
        total_col1 += parseFloat(td[i].querySelector('td + td + td + td').innerHTML)
        total_col2 += parseFloat(td[i].querySelector('td + td + td + td + td').innerHTML)
        total_col3 += parseFloat(td[i].querySelector('td + td + td + td + td + td').innerHTML)
        total_col4 += parseFloat(td[i].querySelector('td + td + td + td + td + td + td').innerHTML)              
    }

    //* compara el valor de los inputs con el de las tablas
    let tdC=""   
    if(parseFloat(inputC.value) < total_col1){       
        tdC = `<span class='badge bg-danger'>${total_col1}</span>`
    }else if(parseFloat(inputC.value) > total_col1){       
        tdC = `<span class='badge bg-success'>${total_col1}</span>`
    }else{       
        tdC = `<span class='badge bg-warning'>${total_col1}</span>`   
    }

    let tdG=""    
    if(parseFloat(inputG.value) < total_col2){       
        tdG = `<span class='badge bg-danger'>${total_col2}</span>`
    }else if(parseFloat(inputG.value) > total_col2){       
        tdG = `<span class='badge bg-success'>${total_col2}</span>`
    }else{       
        tdG = `<span class='badge bg-warning'>${total_col2}</span>`
    }

    let tdH=""   
    if(parseFloat(inputH.value) < total_col3){       
        tdH = `<span class='badge bg-danger'>${total_col3}</span>`
    }else if(parseFloat(inputG.value) > total_col3){       
        tdH = `<span class='badge bg-success'>${total_col3}</span>`
    }else{        
        tdH =  `<span class='badge bg-warning'>${total_col3}</span>`
    }
    
    let tdP=""   
    if(parseFloat(inputP.value) < total_col4){       
        tdP = `<span class='badge bg-danger'>${total_col4}</span>`
    }else if(parseFloat(inputP.value) > total_col4){       
        tdP = `<span class='badge bg-success'>${total_col4}</span>`
    }else{      
        tdP = `<span class='badge bg-warning'>${total_col4}</span>`
    }

    //*Crea la tabla con las operaciones anteriores
    let h = `<tr>   
                <th></th>
                <th>Tot.Hidratos</th>
                <th>Tot.Proteinas</th>
                <th>Tot.Hidratos</th>
                <th>Tot.Proteinas</th>
                <th></th>
            </tr>

            `
    let d = `<tr>
                <td>Total</td><td>${tdC}</td><td>${tdG}</td><td>${tdH}</td><td>${tdP}</td><td></td>    
            </tr>`

    let pC =(total_col1*100)/(parseFloat(inputC.value))  
    let pG =(total_col2*100)/(parseFloat(inputG.value))
    let pH =(total_col3*100)/(parseFloat(inputH.value))
    let pP =(total_col4*100)/(parseFloat(inputP.value))

        d += `<tr>
                <td>% Alcanzado</td><td>${pC.toFixed(2)}%</td><td>${pG.toFixed(2)}%</td><td>${pH.toFixed(2)}%</td><td>${pP.toFixed(2)}%</td><td></td>    
            </tr>`


    foot.innerHTML = h + d
        
   
}


//*Version local
/**
  //^ 1º   
    let url = "./controller/guardar_objetivos.php";
    // // //let d;
    // // //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch = {
        method: "POST",
        body: `id_u=${id_usu}&fecha=${fecha.value}&inputC=${inputC.value}&inputG=${inputG.value}&inputH=${inputH.value}&inputP=${inputP.value}&boton=${this.innerHTML}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    console.log(configFetch.body)
    
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion
    let d = "";
    promesa
        .then((res) => res.json())
        .then((datos) => {
        d = datos;
        //console.log(datos);
        //^ 2º
        id_obj = datos.id_objetivo
        //console.log(id_obj)
        
        //^3º
        //mostrarBotonesTablas()
        //Si hay error o exito al guardar el objetivo
        if (d.codigo == 1) {
            Swal.fire({
            icon: "success",
            title: "",
            text: "Objetivo Guardado!",
            });
            buscaIdOBjetivo()//Llama a buscar el objetivo                
            setTimeout(() => {
                textoBotonGuardarEditar()//Cambia el texto del boton                
            }, 500);
        } else {
            Swal.fire({
            icon: "error",
            title: "",
            text: "Error al guardar, ¿Datos duplicados? Puedes Editar",
            });
        }
    })
  
    //cambiaTextoBotonGuardaEdita()


 */

//*Version github
/*
 //^ 1º   
    let url = "./controller/guardar_objetivos.php";
    // // //let d;
    // // //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch = {
        method: "POST",
        body: `id_u=${id_usu}&fecha=${fecha.value}&inputC=${inputC.value}&inputG=${inputG.value}&inputH=${inputH.value}&inputP=${inputP.value}&boton=${this.innerHTML}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    //console.log(configFetch.body)
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion
    let d = "";
    promesa
        .then((res) => res.json())
        .then((datos) => {
        d = datos;
        console.log(datos);
        //^ 2º
        id_obj = datos.id_objetivo
        console.log(id_obj)

        //^3º
        //mostrarBotonesTablas()
        //Si hay error o exito al guardar el objetivo
        if (d.codigo == 1) {
            Swal.fire({
            icon: "success",
            title: "",
            text: "Objetivo Guardado!",
            });
            buscaIdOBjetivo()//Llama a buscar el objetivo                
            setTimeout(() => {
                textoBotonGuardarEditar()//Cambia el texto del boton                
            }, 500);
        } else {
            Swal.fire({
            icon: "error",
            title: "",
            text: "Error al guardar, ¿Datos duplicados? Puedes Editar",
            });
        }
    })

    //cambiaTextoBotonGuardaEdita()
}


*/