//imports 

//*Botones y variables globales
let form = document.getElementById('form')
let fecha = document.getElementById('fecha')
let fecha_actual = ""
fecha.addEventListener('change',comprobarFechaMasMenosIgual)

let btnGuardarObjetivo= document.getElementById('guardar')
//btnGuardarObjetivo.addEventListener('click',guardarObjetivoTraerIdObjetivo)
let inputC = document.getElementById("objCal");
//inputC.addEventListener("change", sumarTablaADD); 
//inputC.addEventListener("blur", mostrarBotones);
let inputG = document.getElementById("objGra");
//inputG.addEventListener("change", sumarTablaADD);
//inputG.addEventListener("blur", mostrarBotones);
let inputH = document.getElementById("objHid");
//inputH.addEventListener("change", sumarTablaADD);
//inputH.addEventListener("blur", mostrarBotones);
let inputP = document.getElementById("objPro");
//inputP.addEventListener("change", sumarTablaADD);
//inputP.addEventListener("blur", mostrarBotones);
var id_obj
let id_obj_oculto = document.querySelector('#id_obj_oculto')//guardo el id del objetivo
let mis = document.getElementById("mis")
//mis.addEventListener('click', addRecetaListado)
let fav = document.getElementById("fav")

let tabla = document.getElementById('tabla')
//tabla.addEventListener('click', addRecetaListado)
let tablaADD = document.querySelector('#tablaADD')
//tablaADD.addEventListener('change', sumarTablaADD)

let col4 = document.querySelector('#col4')
let myBody = document.querySelector('#myBody')
let aGrabaAlDia = document.querySelector('#guardaRecetasAlDia')//boton que graba recetas al dia


window.addEventListener("load", function () {
    establecerFechaActual()
    comprobarFechaMasMenosIgual()
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

//* Comprueba si la fecha es mayor, menor o igual a la actual
function comprobarFechaMasMenosIgual(){
    ocultarTablasMisFav()//*oculta las tablas MIS  y FAV
    col4.setAttribute('style','display:none')
    if(Date.parse(fecha.value) < Date.parse(fecha_actual)){
        console.log("Menor")       
        buscaIdOBjetivo()
    }    
    else if(Date.parse(fecha.value) > Date.parse(fecha_actual)){
        //* buscar objetivo
        console.log("Mayor")        
        buscaIdOBjetivo()
        setTimeout(() => {//^Uso settimeout para dar tiempo a la peticion a ser resuelta
            textoBotonGuardarEditar()                                       
        }, 500);
    }else{
        console.log("Igual")
        id_obj_oculto.innerHTML=""
        buscaIdOBjetivo()
    }
}

//* Pone los inputs en blanco
function ponInputsBlanco(){
    inputC.value = "";
    inputG.value = "";
    inputH.value = "";
    inputP.value = "";     
    inputC.removeAttribute('disabled')  
    inputG.removeAttribute('disabled')   
    inputH.removeAttribute('disabled')  
    inputP.removeAttribute('disabled')
}

//* Si hay id_obj pone boton en Editar
function textoBotonGuardarEditar(){
    let io = id_obj_oculto.innerHTML
    
    //Si hay ID OBJ pon el texto a EDITAR
    if(io != "-1"){
        console.log("> -1")
        btnGuardarObjetivo.innerHTML = "Editar"        
        traeValoresAInputs(io)//* esta funcion carga los datos en los inputs 
        //TODO cargar tabla totales                   
        cargaTablaTotales(io)//* esta funcion carga los datos de la tabla totales 
        setTimeout(() => {            
            sumaTotalesTabla()//* cargar la suma total de la tabla totales
        }, 500);
        mostrarBotonesMisFav()

    }else if(io == "-1"){
        console.log("-1")
        btnGuardarObjetivo.innerHTML = "Guardar"
    }
    //Si NO hay ID OBJ pon el texto a GUARDAR
}

//* Mostrar botones Mis Y Fav
function mostrarBotonesMisFav(){
    mis.setAttribute("style", "display:block;");
    fav.setAttribute("style", "display:block;"); 
}

//Oculta las tablas MIS Y FAV
function ocultarTablasMisFav(){
    $(".col2").hide();
    $(".col3").hide();
}

async function borrarFila(pero, padre){
    //capturar el id_obj_detalle
    let id_obj_detalle= pero
    let tr = padre.parentNode
    //TODO eliminar fila de la BD pasando el id_obj_detalle
    
    await    borrarFilaDeTotalesBBDD(id_obj_detalle)        
    
    // setTimeout(() => {
    //     cargaTablaTotales(id_obj_detalle)
    // }, 2500);
    
    setTimeout(() => {
        sumaTotalesTabla()
    }, 7000);
    
    tr.remove()
    comprobarHijosTbody()
}

function comprobarHijosTbody(){
    if(myBody.childElementCount == 0){
        col4.setAttribute('style','display:none')
        cargaTablaTotales(-1)
    }
}

//* Cuando se pulsa en MIS o FAV muestra u oculta la tabla correspondiente
$(".btn-fav").click(function () {
    $(".col2").fadeToggle("slow");
    $(".col3").hide();
    });
    $(".btn-mis").click(function () {
    $(".col3").fadeToggle("slow");
    $(".col2").hide();
});

