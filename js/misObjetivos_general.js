//imports 

//*Botones y variables globales
let form = document.getElementById('form')
form.addEventListener('submit',(e)=>{e.preventDefault })
let fecha = document.getElementById('fecha')
let fecha_actual = ""
fecha.addEventListener('change',comprobarFechaMasMenosIgual)

let btnGuardarObjetivo= document.getElementById('guardar')
//btnGuardarObjetivo.addEventListener('click',guardarObjetivoTraerIdObjetivo)
let inputC = document.getElementById("objCal");
//inputC.addEventListener("change", sumaTotalesTabla); 
//inputC.addEventListener("blur", mostrarBotones);
let inputG = document.getElementById("objGra");
//inputG.addEventListener("change", sumaTotalesTabla);
//inputG.addEventListener("blur", mostrarBotones);
let inputH = document.getElementById("objHid");
//inputH.addEventListener("change", sumaTotalesTabla);
//inputH.addEventListener("blur", mostrarBotones);
let inputP = document.getElementById("objPro");
//inputP.addEventListener("change", sumaTotalesTabla);
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
    btnGuardarObjetivo.addEventListener('click',guardarObjetivoTraerIdObjetivo)
    inputC.addEventListener("change", sumaTotalesTabla); 
    inputG.addEventListener("change", sumaTotalesTabla);
    inputH.addEventListener("change", sumaTotalesTabla);
    inputP.addEventListener("change", sumaTotalesTabla);
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
        setTimeout(() => {
            textoBotonGuardarEditar()
            ocultaGuardarEditar()
            
        }, 300);

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
        //id_obj_oculto.innerHTML=""
        buscaIdOBjetivo()
        /setTimeout(() => {//^Uso settimeout para dar tiempo a la peticion a ser resuelta
            textoBotonGuardarEditar()                                       
        }, 500);
    }
}

//*Oculta boton Guardar Editar
function ocultaGuardarEditar(){
    btnGuardarObjetivo.setAttribute('style','display:none')
}
//*Muestra boton Guardar Editar
function mostrarGuardarEditar(){
    btnGuardarObjetivo.setAttribute('style','display:inline')
}

//*Borra datos tabla
function borrarDatosTablaTotales(){
    myBody.innerHTML= ""
}

//* Bloquea los inputs
function bloqueaInputs(){
       
    inputC.setAttribute('disabled','false') 
    inputG.removeAttribute('disabled')   
    inputH.removeAttribute('disabled')  
    inputP.removeAttribute('disabled')
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
        borrarDatosTablaTotales()//*borra tabla totales antes de cargarla
        btnGuardarObjetivo.innerHTML = "Editar"        
        traeValoresAInputs(io)//* esta funcion carga los datos en los inputs 
        //TODO cargar tabla totales                   
        cargaTablaTotales(io)//* esta funcion carga los datos de la tabla totales 
        setTimeout(() => {            
            sumaTotalesTabla()//* cargar la suma total de la tabla totales
        }, 500);
        mostrarGuardarEditar()
        mostrarBotonesMisFav()

    }else if(io == "-1"){
        console.log("-1")
        btnGuardarObjetivo.innerHTML = "Guardar"
        ocultarTablasMisFav()
        ocultarBotonesMisFav()
        ponInputsBlanco()
    }
    //Si NO hay ID OBJ pon el texto a GUARDAR
}

//* Mostrar botones Mis Y Fav
function mostrarBotonesMisFav(){
    mis.setAttribute("style", "display:block;");
    fav.setAttribute("style", "display:block;"); 
}

//* Ocluta botones Mis Y Fav
function ocultarBotonesMisFav(){
    mis.setAttribute("style", "display:none;");
    fav.setAttribute("style", "display:none;"); 
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
    }, 1000);
    
    tr.remove()
    comprobarHijosTbody()
}

//* AÑADE LA RECETA PULSADA AL LISTADO
function addRecetaListado(receta, usuarioCreacion){
    
        // TODO Llama a la funcion que carga los datos de la receta
        // TODO en el div col4        
        let url = "./controller/listado_recetas_en_objetivo.php";
        let configFetch = {
            method: "POST",
            body: `id_r=${receta}&id_u=${usuarioCreacion}&id_obj_detalle=${id_obj_oculto.innerHTML}`,
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
                sumaTotalesTabla()
            }) 
        //});
        
        
}


//* Recorre la tabla totales para guardar despues
function guarda_RecetasAlDia(){
    let idObj = id_obj_oculto.innerHTML //Guarda el id del objetivo para las comprobaciones
    let b = document.querySelector('#myBody')
    let tr = b.children

    for (let i = 0; i < tr.length; i++) {
        if(tr[i].children[0].innerHTML == idObj){//si coincide el id objetivo con la fila de la tabla, se guarda en base de datos
            console.log(tr[i])
            let r = tr[i].children[1].innerHTML
            let c = tr[i].children[3].innerHTML
            let g = tr[i].children[4].innerHTML
            let h = tr[i].children[5].innerHTML
            let p = tr[i].children[6].innerHTML
            //console.log(r + "-" + c + "-" + g + "-" + h + "-" + p + "-" + idObj + "-" + id_usu)
            addFila_a_sumaObjetivo(idObj, id_usu,r , c, g, h, p)
        }        
    }
    comprobarFechaMasMenosIgual()
}

//Si la tabla totales no tiene filas, la oculta
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

