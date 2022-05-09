//*Botones y variables globales
let form = document.getElementById('form')
let fecha = document.getElementById('fecha')
let fecha_actual = ""
fecha.addEventListener('change',comprobarId_Guarda_Edita)

let btnGuardarObjetivo= document.getElementById('guardar')
btnGuardarObjetivo.addEventListener('click',guardarObjetivoTraerIdObjetivo)
let inputC = document.getElementById("objCal");
inputC.addEventListener("change", sumarTablaADD); 
//inputC.addEventListener("blur", mostrarBotones);
let inputG = document.getElementById("objGra");
inputG.addEventListener("change", sumarTablaADD);
//inputG.addEventListener("blur", mostrarBotones);
let inputH = document.getElementById("objHid");
inputH.addEventListener("change", sumarTablaADD);
//inputH.addEventListener("blur", mostrarBotones);
let inputP = document.getElementById("objPro");
inputP.addEventListener("change", sumarTablaADD);
//inputP.addEventListener("blur", mostrarBotones);
let id_obj = ""
let id_obj_oculto = document.querySelector('#id_obj_oculto')//guardo el id del objetivo
let mis = document.getElementById("mis")
//mis.addEventListener('click', addRecetaListado)
let fav = document.getElementById("fav")

let tabla = document.getElementById('tabla')
//tabla.addEventListener('click', addRecetaListado)
let tablaADD = document.querySelector('#tablaADD')
tablaADD.addEventListener('change', sumarTablaADD)

let aGrabaAlDia = document.querySelector('#guardaRecetasAlDia')//boton que graba recetas al dia


window.addEventListener("load", function () {
    establecerFechaActual()
    comprobarId_Guarda_Edita()    
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
        id_obj = datos.id_objetivo//^Cada vez que cambia la fecha tengo el id del objetivo
        id_obj_oculto.innerHTML = datos.id_objetivo
        id_obj = parseInt(id_obj_oculto.innerHTML)
        
        cambiaTextoBotonGuardaEdita()
        mostrarBotonesTablas() // ^22 
        listarInputObjetivoDia()
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
    console.log(id_obj)
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
        console.log(datos);
        //Si la fecha del input es menor a la actual
        if(Date.parse(fecha.value) < Date.parse(fecha_actual)){
            llenarInhabilitarInputs(datos)
        }//Si la fecha del input es mayor a la actual
        else if(Date.parse(fecha.value) > Date.parse(fecha_actual)){
            btnGuardarObjetivo.setAttribute("style", "display:inline-block"); 
            console.log(datos)//! Viene NULL COMPROBAR ESTO           
            llenarHabilitarInputs(datos)
        }
        else{//Si la fecha del input es igual a la actual
            
            //si hay objetivos ese dia carga la tabla totales
            if(id_obj > 0){
                
            }                            
            if(parseInt(id_obj_oculto.innerHTML) == -1){//si no hay objetivos borra inputs, oculta, col4, y los botones mis y fav
                console.log(id_obj)
                vaciarHabilitarInputs()

            }
        }

    })  
}
//*Pone en blanco inputs y los habilita
function vaciarInputsInhabilitarBotonesRecetas(obj){     
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

//*Pone en blanco inputs y los habilita
function vaciarHabilitarInputs(obj){     
    mis.setAttribute("style", "display:none;");
    fav.setAttribute("style", "display:none;");
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

    //TODO carga la tabla de los totales
    creaTablaTotalesSiHayDatos()
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
    
    else if(Date.parse(fecha.value) > Date.parse(fecha_actual)){
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
    
        /*else {
            //document.getElementById("mis").setAttribute("style", "display:block;");
            //document.getElementById("fav").setAttribute("style", "display:block;");
            console.log(id_obj_oculto.innerHTML)
          }*/
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

//*Crea la tabla totales si hay datos guardados
function creaTablaTotalesSiHayDatos(){
    console.log(id_r)
}

//*Crea la tabla totales con los datos que estan en las tablas
//*si no hay datos ya

function sumarTablaADD(){
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
        id_recetas = td[i].querySelector('td').innerHTML
        nombre_receta = td[i].querySelector('td + td').innerHTML
        total_col1 += parseFloat(td[i].querySelector('td + td + td').innerHTML)
        total_col2 += parseFloat(td[i].querySelector('td + td + td + td').innerHTML)
        total_col3 += parseFloat(td[i].querySelector('td + td + td + td + td ').innerHTML)
        total_col4 += parseFloat(td[i].querySelector('td + td + td + td + td + td ').innerHTML)              
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
    foot.innerHTML = h + d
        
    
}

//TODO una vez creada la tabla totales, almacenar en la base de datos
function guarda_RecetasAlDia(){
    //Selecionar la tabla y el tfood  
    let t = document.getElementById('tablaADD')
    let tbody= document.querySelector('#myBody')
    let foot = document.querySelector('tfoot')
    let td = t.querySelectorAll('#myBody tr')

    let totales = []
    td.forEach(element => {        
        fetch_guarda_RecetasAlDia(element.cells[0].innerHTML, element.cells[0].innerHTML,element.cells[0].innerHTML,element.cells[0].innerHTML
            ,element.cells[0].innerHTML,element.cells[0].innerHTML)
    });
}

//* Ejecuta la consulta que guarda los datos de la tabla de totales
function fetch_guarda_RecetasAlDia(id, n, c, g, h, p){
    let url = "./controller/graba_totales_obj.php";
    // // //let d;
    // // //configurar la peticion. AQUI CONFIGURO LA PETICION
    let configFetch = {
        method: "POST",
        body: `id_obj=${id_obj}&id_u=${id_usu}&id_r=${id}&tcalorias=${c}&tgrasas=${g}&thidratos=${h}&tproteinas=${p}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    console.log(id_obj + "-" + id_usu + "-" + id)
    //mandar la peticion
    let promesa = fetch(url, configFetch);
    //Ejecutar la promesa que devuelve la peticion
    let d = "";
    promesa
        .then((res) => res.json())
        .then((datos) => {
        d = datos;
        console.log(datos);
    })  
}


let col1 = document.getElementById('col1')
col1.addEventListener('click',()=> document.getElementById('o').innerHTML =id_obj)





