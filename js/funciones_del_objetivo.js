//*Botones y variables globales
let form = document.getElementById('form')
let fecha = document.getElementById('fecha')
let fecha_actual = ""
fecha.addEventListener('change',comprobarId_Guarda_Edita)

let btnGuardarObjetivo= document.getElementById('guardar')
btnGuardarObjetivo.addEventListener('click',guardarObjetivoTraerIdObjetivo)
let inputC = document.getElementById("objCal");
inputC.addEventListener("keyup", sumarTablaADD); 
//inputC.addEventListener("blur", mostrarBotones);
let inputG = document.getElementById("objGra");
inputG.addEventListener("keyup", sumarTablaADD);
//inputG.addEventListener("blur", mostrarBotones);
let inputH = document.getElementById("objHid");
inputH.addEventListener("keyup", sumarTablaADD);
//inputH.addEventListener("blur", mostrarBotones);
let inputP = document.getElementById("objPro");
inputP.addEventListener("keyup", sumarTablaADD);
//inputP.addEventListener("blur", mostrarBotones);
let id_obj = ""
let mis = document.getElementById("mis")
//mis.addEventListener('click', addRecetaListado)
let fav = document.getElementById("fav")

let tabla = document.getElementById('tabla')
//tabla.addEventListener('click', addRecetaListado)
let tablaADD = document.querySelector('#tablaADD')
tablaADD.addEventListener('change', sumarTablaADD)


window.addEventListener("load", function () {
    establecerFechaActual()
})

//*Establecer fecha actual cuando se carga la pagina
function establecerFechaActual(){
    const d = new Date();
    let mes = d.getMonth();
    let dia = d.getDate();
    arrayTotales= []
    if (mes.toString().length == 1) {
        // * Devuelve el mes actual condos digitos
        mes = "0" + (mes + 1);
    }
    if (dia.toString().length == 1) {
        // * Devuelve el dia actual condos digitos
        dia = "0" + dia;
    }
    fecha_actual = `${d.getFullYear()}-${mes}-${dia}`;
    fecha.value = fecha_actual;
}

//* Al dar al boton Guardar objetivo, 
//* 1- lo guarde en BD
//* 2- Almacenar el Id-del objetivo
//* 3- Mostrar botones de las tablas
function guardarObjetivoTraerIdObjetivo(){ 
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
        mostrarBotonesTablas()
        //Si hay error o exito al guardar el objetivo
        if (d.codigo == 1) {
            Swal.fire({
            icon: "success",
            title: "",
            text: "Objetivo Guardado!",
            });
        } else {
            Swal.fire({
            icon: "error",
            title: "",
            text: "Error al guardar, ¿Datos duplicados? Puedes Editar",
            });
        }
    })
      
    cambiaTextoBotonGuardaEdita()
}

//*1- Combrueba si en ese dia hay objetivo y trae el ID
function comprobarId_Guarda_Edita(){
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
    let d = "";
    promesa
        .then((res) => res.json())
        .then((datos) => {
        d = datos;
        //console.log(datos);
        id_obj = datos.id_objetivo//^Cada vez que cambia la fecha tengo el id del objetivo
        cambiaTextoBotonGuardaEdita()
        mostrarBotonesTablas() // ^22 
    })   
}

function cambiaTextoBotonGuardaEdita(){
    if( id_obj == -1){
        btnGuardarObjetivo.innerHTML = "Guardar"
        vaciarHabilitarInputs()
    }else{
        btnGuardarObjetivo.innerHTML = "Editar"
        //^Traer los datos del objetivo y ponerlos en los inputs
        listarInputObjetivoDia()
        
    }
}

//*Trae a los inputs el valor del objetivo
//* para mostrarlos
function listarInputObjetivoDia(){
    let url = "./controller/listar_objetivo_dia.php";
    // // //let d;
    // // //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch = {
        method: "POST",
        body: `id_obj=${id_obj}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion
    let d = "";
    promesa
        .then((res) => res.json())
        .then((datos) => {
        d = datos;
        //console.log(datos);
        //Si la fecha del input es menos a la actual
        if(Date.parse(fecha.value) < Date.parse(fecha_actual)){
            llenarInhabilitarInputs(datos)
        }
        if(Date.parse(fecha.value) > Date.parse(fecha_actual)){
            btnGuardarObjetivo.setAttribute("style", "display:inline-block");
            llenarHabilitarInputs(datos)
        }

    })  
}

//*Pone en blanco inputs y los habilita
function vaciarHabilitarInputs(obj){     
    btnGuardarObjetivo.setAttribute("style", "display:inline-block");
    inputC.value = "";
    inputG.value = "";
    inputH.value = "";
    inputP.value = "";     
    inputC.removeAttribute('disabled')  
    inputG.removeAttribute('disabled')   
    inputH.removeAttribute('disabled')  
    inputP.removeAttribute('disabled')
}
//*Carga datos en los inputs y los deshabilita
function llenarInhabilitarInputs(obj){ 
    btnGuardarObjetivo.setAttribute("style", "display:none");   
    inputC.value = obj.objCal;
    inputC.setAttribute('disabled','true')
    inputG.value = obj.objGra;
    inputG.setAttribute('disabled','true')
    inputH.value = obj.objHid;
    inputH.setAttribute('disabled','true')
    inputP.value = obj.objPro;  
    inputP.setAttribute('disabled','true') 
}
//*Carga datos en los inputs y los habilita
function llenarHabilitarInputs(obj){
    inputC.value = obj.objCal;
    inputC.removeAttribute('disabled')
    inputG.value = obj.objGra;
    inputG.removeAttribute('disabled')
    inputH.value = obj.objHid;
    inputH.removeAttribute('disabled')
    inputP.value = obj.objPro;  
    inputP.removeAttribute('disabled')
}


//^ 3º 
//* Mostrar botones de las tablas
function mostrarBotonesTablas(){
    if(Date.parse(fecha.value) < Date.parse(fecha_actual)){
        mis.setAttribute("style", "display:none;");
        fav.setAttribute("style", "display:none;");
        return
    }
    
    if(Date.parse(fecha.value) > Date.parse(fecha_actual)){
        if (parseInt(id_obj) > 0) {
            console.log("ww: " + id_obj)
            mis.setAttribute("style", "display:block;");
            fav.setAttribute("style", "display:block;"); 
            inputC.removeAttribute('disabled')  
            inputG.removeAttribute('disabled')   
            inputH.removeAttribute('disabled')  
            inputP.removeAttribute('disabled')
            return
        } 
    }
    
    // else {
    //     document.getElementById("mis").setAttribute("style", "display:block;");
    //     document.getElementById("fav").setAttribute("style", "display:block;");
    //   }
}

form.addEventListener('submit', function(evt){
    evt.preventDefault()
})

//!Funciones de las tablas de favoritos y propias
//*Al dar en DeMisRecetas o DeFavoritos, muestra o oculta las tablas
$(document).ready(function () {
    $(".btn-fav").click(function () {
      $(".col2").fadeToggle("slow");
      $(".col3").hide();
    });
    $(".btn-mis").click(function () {
      $(".col3").fadeToggle("slow");
      $(".col2").hide();
    });

    // ^ Cuando se pulse en + añadir al array para guardar los datos
    // ^ de la receta
    //let arrayFila = [];
    //* AÑADE LA RECETA PULSADA AL LISTADO
    $("td>a").click(function (e) {
        let tr = e.target.parentNode.parentNode.parentNode; //fila de la tabla

        let aux = [];
        for (let i = 0; i < tr.cells.length - 1 ; i++) {            
                aux.push(tr.cells[i].innerHTML); // * array para guardar los datos de la receta que trae de la tabla          
        }    
        //console.log("Mas verde tabla: " + aux)   
    
        // TODO Llama a la funcion que carga los datos de la receta
        // TODO en el div col4        
        let url = "./controller/listado_recetas_en_objetivo.php";
        let configFetch = {
            method: "POST",
            body: `id_r=${aux[0]}&id_u=${aux[1]}`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };
        
        //mandar la peticion
        let promesa = fetch(url, configFetch);
        //Ejecutar la promesa que devuelve la peticion    
        promesa
            .then((res) => res.text())
            .then((datos) => {
                //console.log(datos)
                //^ meter la respuesta en el html
                let tbody = document.getElementById('myBody')
                tbody.innerHTML += datos 
                col4.setAttribute('style','display:flex')
                //TODO realizar los cálculos de los objetivos
                sumarTablaADD()
            }) 
        });
});

//* Operaciones de sumatorios con la tabla

let arraySumas= []
let arrayTD=[]

function sumarTablaADD(){
    var total_col1 = 0;
    var total_col2 = 0;
    var total_col3 = 0;
    var total_col4 = 0;
    
    let t = document.getElementById('tablaADD')
    /*let bdy = t.getElementsByTagName('tbody')*/
    let td = t.querySelectorAll('tbody tr')

    //* Añade las sumas de cada fila
    for (let i = 0; i < td.length; i++) {
        const element = td[0].querySelector('td + td + td');
        total_col1 += parseFloat(td[i].querySelector('td + td + td').innerHTML)
        total_col2 += parseFloat(td[i].querySelector('td + td + td + td').innerHTML)
        total_col3 += parseFloat(td[i].querySelector('td + td + td + td + td ').innerHTML)
        total_col4 += parseFloat(td[i].querySelector('td + td + td + td + td + td ').innerHTML)        
    }

    let tdC=""
    if(parseFloat(inputC.value) < total_col1){
        tdC = document.createElement('td')
        tdC.setAttribute('style','background-color:red')
        tdC.innerHTML = total_col1        
    }else if(parseFloat(inputC.value) > total_col1){
        let tdC = document.createElement('td')
        tdC.setAttribute('style','background-color:green')
        tdC.innerHTML = total_col1   
    }else{
        let tdC = document.createElement('td')
        tdC.setAttribute('style','background-color:yellow')
        tdC.innerHTML = total_col1
    }

    let tdG=""
    if(parseFloat(inputG.value) < total_col2){
        tdG = document.createElement('td')
        tdG.setAttribute('style','background-color:red')
        tdG.innerHTML = total_col2        
    }else if(parseFloat(inputG.value) > total_col2){
        let tdG = document.createElement('td')
        tdG.setAttribute('style','background-color:green')
        tdG.innerHTML = total_col2   
    }else{
        let tdG = document.createElement('td')
        tdG.setAttribute('style','background-color:yellow')
        tdG.innerHTML = total_col2
    }

    let tdH=""
    if(parseFloat(inputH.value) < total_col3){
        tdH = document.createElement('td')
        tdH.setAttribute('style','background-color:red')
        tdH.innerHTML = total_col3        
    }else if(parseFloat(inputH.value) > total_col3){
        let tdH = document.createElement('td')
        tdH.setAttribute('style','background-color:green')
        tdH.innerHTML = total_col3   
    }else{
        let tdH = document.createElement('td')
        tdH.setAttribute('style','background-color:yellow')
        tdH.innerHTML = total_col3
    }

    let tdP=""
    if(parseFloat(inputP.value) < total_col4){
        tdP = document.createElement('td')
        tdP.setAttribute('style','background-color:red')
        tdP.innerHTML = total_col4        
    }else if(parseFloat(inputP.value) > total_col4){
        let tdP = document.createElement('td')
        tdP.setAttribute('style','background-color:green')
        tdP.innerHTML = total_col4   
    }else{
        let tdP = document.createElement('td')
        tdP.setAttribute('style','background-color:yellow')
        tdP.innerHTML = total_col4
    }

    let tdVacia = document.createElement('td')
    let tr = document.createElement('tr');
    let th = document.createElement('th');
   
    tr.appendChild(tdVacia)
   
    tr.appendChild(tdC)
    tr.appendChild(tdG)
    tr.appendChild(tdH)
    tr.appendChild(tdP)

    //* Añade las sumas a la tabla
    //let filaTotal = "<tr><td>Total</td>" + filaC  + filaG + filaH + filaP + "<td></td> </tr>"
    //console.log( total_col1 + "-" + total_col2 + "-" + total_col3 + "-" + total_col4)
    let tfoot = document.querySelector('#myBody')
    tfoot.appendChild(tr)
   
}
   


let col1 = document.getElementById('col1')
col1.addEventListener('click',()=> document.getElementById('o').innerHTML =id_obj)
