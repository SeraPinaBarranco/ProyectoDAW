let form = document.querySelector('#form');

let btnGuardar = document.getElementById('guardar')
btnGuardar.addEventListener('click',guardarObjetivos)

let inputC = document.getElementById('objCal')
inputC.addEventListener('blur',mostrarBotones)
let inputG = document.getElementById('objGra')
inputG.addEventListener('blur',mostrarBotones)
let inputH = document.getElementById('objHid')
inputH.addEventListener('blur',mostrarBotones)
let inputP = document.getElementById('objPro')
inputP.addEventListener('blur',mostrarBotones)

let btnAgregarDia = document.getElementById('btnAgregarDia')
btnAgregarDia.addEventListener('click',agregarRecetasObjetivos)



//Pone a "guardar" el boton
// ^ Cada vez que cambie la fecha hay que consultar a la base de datos
// ^ y traer el id del objetivo y los datos para mostrarlos
let fecha = document.querySelector("#fecha");
fecha.addEventListener('change', traerIdOjetivo)

window.addEventListener("load", function () {
  
  const d = new Date();
  let mes = d.getMonth();
  let dia = d.getDate();

  if (mes.toString().length == 1) {
    // * Devuelve el mes actual condos digitos
    mes = "0" + (mes + 1);
  }
  if (dia.toString().length == 1) {
    // * Devuelve el dia actual condos digitos
    dia = "0" + (dia + 1);
  }

  let fecha_actual = `${d.getFullYear()}-${mes}-${dia}`;

  fecha.value = fecha_actual;
    
  form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
  })  
  traerIdOjetivo()
});

//^ Cuando cambie la fecha refrescar el array de los datos
//^ y el listado html 
fecha.addEventListener("change", (evt) => {
  console.log(evt.target.value);  
});

$(document).ready(function () {
    $(".btn-fav").click(function(){
      $(".col2").fadeToggle("slow");
      $(".col3").hide();
    });
    $(".btn-mis").click(function(){
      $(".col3").fadeToggle("slow");
      $(".col2").hide();
    });

    // ^ Cuando se pulse en + añadir al array para guardar los datos
    // ^ de la receta
    let arrayFila= []
    $('td>a').click(function(e){
      let tr = e.target.parentNode.parentNode.parentNode //fila de la tabla
      
      let aux=[]
      for (let i = 0; i < tr.cells.length; i++) {
        if(tr.cells[i].innerHTML.indexOf("<button>") < 0){          
          //console.log(tr.cells[i].innerHTML)        
          aux.push(tr.cells[i].innerHTML)          
        }
      }
      arrayFila.push(aux)
      //console.log(arrayFila)
      //});
      /*
      TODO llamar a funcion que traiga los datos
      TODO de la base de datos y los ponga en la lista
      */
      cargarDatos(aux)
    })      
    
});

 let ni = 0

//*Funcion que carga los datos de la receta
function cargarDatos(receta){
  let id_r = receta[0]
  let id_u = receta[1]
  let nom_r = receta[2]

  //TODO consulta a la base de datos
  //URL de la peticion
  let url = "./controller/listado_propias.php";
  //let d;
  //configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `id_r=${id_r}&id_u=${id_u}&nom_r=${nom_r}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  //mandar la peticion
  let promesa = fetch(url, configFetch);

  //Ejecutar la promesa que devuelve la peticion
  
   promesa
      .then((res) => res.json())
      .then((datos) => {
         let d = datos;        
         datos.forEach(cantidades => {
           listarCantidades(cantidades)
           cantidades.idr= id_r            
           arrayTotales.push(cantidades)//*Aqui estan las recetas que se han añadido
         });        
   });

  console.log(id_r + " - " + id_u + " - " + nom_r)
}

//!Funcion que llena el arrayTotales
function llenaArrayTotales(totales){
  arrayTotales = []
  totales.forEach(cantidades => {
    //listarCantidades(cantidades)
    //cantidades.idr= id_r            
    arrayTotales.push(cantidades)//*Aqui estan las recetas que se han añadido    
  }); 
  console.log(arrayTotales)
}

let arrayTotales= [];
//Añadir una fila mas al listado
let col4 = document.querySelector('#col4')

// ^Carga el listado con las filas de la base de datos
function listarCantidades(cantidades){
  //arrayTotales.push(cantidades)//Aqui estan las recetas que se han añadido

  let ul = document.querySelector('#ulDetalle')
  //let ul = document.createElement('ul')
  //ul.setAttribute('class','ulDetalle')
  let btn = document.createElement('button')
  //a.setAttribute('href','#')
  btn.setAttribute('onclick','borrarItem(this)')
  btn.setAttribute('class','btn')
  btn.setAttribute('class','btn-danger')
  btn.innerHTML = "X"

  //ul.setAttribute('id',ni)
  let li = document.createElement('li')
  li.innerHTML = `${cantidades.nombre_receta}: C-${cantidades.tcalorias}, G-${cantidades.tgrasas}, H-${cantidades.thidratos}, P-${cantidades.tproteinas} `  

  li.appendChild(btn)
  //ul.appendChild(a)
  ul.appendChild(li)
  //col4.appendChild(ul)

  col4.setAttribute("style", "display:flex;");
  document.getElementById('agregarDia').setAttribute("style", "display:block;")
  console.log(arrayTotales)  
}

//^Borrar un LI y actualiza el array
function borrarItem(removeA){  
  let ulDetalle = document.getElementById('ulDetalle')// * obtengo el UL
 
  let padre = removeA.parentNode.parentNode
  let liObjetivo = removeA.parentNode

  let nHijo = 0
  for (let i = 0; i < padre.children.length; i++) {    
    if(padre.children[i] == removeA.parentNode){
      nHijo = i;//* Aqui obtengo el indice para eliminar el array
      break;}    
  }

  liObjetivo.remove()
     
  arrayTotales.splice(nHijo, 1)// *Aqui esta el array filtrado
  
  console.log(arrayTotales)
  
  if(arrayTotales.length == 0){
    col4.setAttribute("style", "display:none;");
    document.getElementById('agregarDia').setAttribute("style", "display:none;")
  }

}

function mostrarBotones(){
  let inputs = document.getElementsByClassName('objetivo')

  for (let i = 0; i < inputs.length; i++) {
    if(inputs[i].value == ""){
      document.getElementById('mis').setAttribute("style", "display:none;");
      document.getElementById('fav').setAttribute("style", "display:none;");
      break
    }else{
      document.getElementById('mis').setAttribute("style", "display:block;");
      document.getElementById('fav').setAttribute("style", "display:block;");
    }
    
  }
}

//^Funcion que guarda los objetivos y la fecha
function guardarObjetivos(){
  //* En la variable id_usu esta el id de usuario de forma
  let f = document.getElementById('fecha').value 

  //TODO consulta a la base de datos
  //URL de la peticion
  let url = "./controller/guardar_objetivos.php";
  // // //let d;
  // // //configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `id_u=${id_usu}&fecha=${f}&inputC=${inputC.value}&inputG=${inputG.value}&inputH=${inputH.value}&inputP=${inputP.value}&boton=${this.innerHTML}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  console.log(configFetch.body)
  // //mandar la peticion
  let promesa = fetch(url, configFetch);

  // // //Ejecutar la promesa que devuelve la peticion
  
  promesa
     .then((res) => res.json())
     .then((datos) => {
        let d = datos;   
        console.log(datos) 
        
        //Si hay error o exito al guardar el objetivo
        if(d.codigo == 1){
          Swal.fire({                                      
            icon: "success",
            title: "",
            text: "Objetivo Guardado!",
          });
        }else{
          Swal.fire({                                      
            icon: "error",
            title: "",
            text: "Error al guardar, ¿Datos duplicados? Puedes Editar",
          });
        }        
  });

   //*Si el boton tiene el texto guardar
  
    if(this.innerHTML == "Guardar" && (inputC.value !== "" && inputG.value !== "" && inputH.value !== "" && inputP.value !== "")){
      this.innerHTML = "Editar"
    }else{
      this.innerHTML = "Guardar"
    }

 

}

function ejecutar(e){
  console.log(e)
}


let id_obj = ""
//* Tiene guarda el id del objetivo
function traerIdOjetivo(){
  btnGuardar.innerHTML = "Guardar"
  //URL de la peticion
  let url = "./controller/obtener_objetivo.php";
  //let d;
  //configurar la peticion. AQUI CONFIGURO LA PETICION
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
         let d = datos;        
         //console.log(datos)  
         id_obj = datos.id_objetivo    
   }).finally(()=>{
     traer_recetas_objetivo(id_obj)
   }); 
   
   
}

function traer_recetas_objetivo(objetivo){
  console.log(objetivo)
  // * Traer los datos de las recetas añadidas al objetivo
  let d;
  let url = "./controller/traer_recetas_objetivo.php";
  let configFetch = {
    method: "POST",
    body: `id_objetivo=${objetivo}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  let promesa = fetch(url, configFetch);
  promesa
    .then((res) => res.json())
    .then((datos) => {
       d = datos;        
       //console.log(datos)  
       //id_obj = datos.id_objetivo    
 }).finally(()=>{
    llenaArrayTotales(d)
 });
 
}

//*Añade el listado de recetas a la tabla suma objetivos
//* id_obj esta el id del objetivo
function agregarRecetasObjetivos(){
  
  //Si el arrayTotales no esta vacio, guarda los datos
  if(arrayTotales.length > 0){ 

    //*Recorrer el array para guardar en la BBDD fila a fila
    arrayTotales.forEach(fila => {
      //console.log(fila);    
      const cuerpo = `id_obj=${id_obj}&id_u=${id_usu}&id_r=${fila.idr}&tcalorias=${fila.tcalorias}&tgrasas=${fila.tgrasas}&thidratos=${fila.thidratos}&tproteinas=${fila.tproteinas}`
      //URL de la peticion
      let url = "./controller/graba_totales_obj.php";
      //let d;
      //configurar la peticion. AQUI CONFIGURO LA PETICION
      let configFetch = {
        method: "POST",
        body: cuerpo,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };

      //mandar la peticion
      let promesa = fetch(url, configFetch);
      //Ejecutar la promesa que devuelve la peticion      
      promesa
          .then((res) => res.json())
          .then((datos) => {
            let d = datos;        
            console.log(datos)     
      });          
    });
    



  }
  
}

