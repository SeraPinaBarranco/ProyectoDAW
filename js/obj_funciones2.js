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
        console.log(datos) 
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
        .then((res) => res.json())
        .then((datos) => {       
        console.log(datos) 
        let pie = document.querySelector('#pieTabla')
        //pie.innerHTML(datos)
    })
}

