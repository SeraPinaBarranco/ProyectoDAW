let form = document.querySelector("#form");

let btnGuardar = document.getElementById("guardar");
btnGuardar.addEventListener("click", guardarObjetivos);

let inputC = document.getElementById("objCal");
inputC.addEventListener("blur", mostrarBotones);
let inputG = document.getElementById("objGra");
inputG.addEventListener("blur", mostrarBotones);
let inputH = document.getElementById("objHid");
inputH.addEventListener("blur", mostrarBotones);
let inputP = document.getElementById("objPro");
inputP.addEventListener("blur", mostrarBotones);

let btnAgregarDia = document.getElementById("btnAgregarDia");
btnAgregarDia.addEventListener("click", agregarRecetasObjetivos);

//Pone a "guardar" el boton
// ^ Cada vez que cambie la fecha hay que consultar a la base de datos
// ^ y traer el id del objetivo y los datos para mostrarlos
let fecha_actual = "";

let fecha = document.querySelector("#fecha");
fecha.addEventListener("change", traerIdOjetivo);

window.addEventListener("load", function () {
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

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  traerIdOjetivo();
});

//^ Cuando cambie la fecha refrescar el array de los datos
//^ y el listado html
fecha.addEventListener("change", (evt) => {
  console.log(evt.target.value);
});

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
  $("td>a").click(function (e) {
    let tr = e.target.parentNode.parentNode.parentNode; //fila de la tabla

    let aux = [];
    for (let i = 0; i < tr.cells.length; i++) {
      if (tr.cells[i].innerHTML.indexOf("<button>") < 0) {
        //console.log(tr.cells[i].innerHTML)
        aux.push(tr.cells[i].innerHTML);
      }
    }
   
    console.log("Mas verde tabla" + aux)   
   
    cargarDatos(aux);//*Llama a la funcion que carga los datos de la receta
  });
});

let ni = 0;
//*Se ejecuta al dar al MAS de las recetas PROPIAS O FAVORITAS1
//*Funcion que carga los datos de la receta
function cargarDatos(receta) {
  let id_r = receta[0];
  let id_u = receta[1];
  let nom_r = receta[2];

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
  let d=""
  //Ejecutar la promesa que devuelve la peticion
  promesa
    .then((res) => res.json())
    .then((datos) => {
      let d = datos;
      arrayTotales =[]
      //llenaArrayTotales(datos)
      datos.forEach((cantidades) => {
        //listarCantidades(cantidades);
        cantidades.idr = id_r;
        arrayTotales.push(cantidades); //*Aqui estan las recetas que se han añadido
        //* a crear la tabla
        crearTablaEditable(arrayTotales)
        //console.log(arrayTotales)
      });
    });
    /*console.log("cargar datos: ")
    console.log( arrayTotales)*/
    
}

//!Funcion que llena el arrayTotales
function llenaArrayTotales(totales) {
  arrayTotales = [];
  totales.forEach((cantidades) => {
    //listarCantidades(cantidades)
    //cantidades.idr= id_r
    arrayTotales.push(cantidades); //*Aqui estan las recetas que se han añadido
  });
  console.log("llenaArrayTotales")
  console.log(arrayTotales)
}

let arrayTotales = [];
//Añadir una fila mas al listado
let col4 = document.querySelector("#col4");
let ul = document.querySelector("#ulDetalle");

// ^Carga el listado con las filas de la base de datos
function listarCantidades(cantidades) {
  //! PRUEBA. Crear tabla para listarla
  crearTablaEditable(cantidades)
/*
  //arrayTotales.push(cantidades)//Aqui estan las recetas que se han añadido

  //let ul = document.createElement('ul')
  //ul.setAttribute('class','ulDetalle')
  let btn = document.createElement("button");
  //a.setAttribute('href','#')
  btn.setAttribute("onclick", "borrarItem(this)");
  btn.setAttribute("class", "btn");
  btn.setAttribute("class", "btn-danger");
  btn.innerHTML = "X";

  //ul.setAttribute('id',ni)
  let li = document.createElement("li");
  li.innerHTML = `${cantidades.nombre_receta}: C-${cantidades.tcalorias}, G-${cantidades.tgrasas}, H-${cantidades.thidratos}, P-${cantidades.tproteinas} `;

  li.appendChild(btn);
  //ul.appendChild(a)
  ul.appendChild(li);
  ul.setAttribute("style", "display:flex");
  //col4.appendChild(ul)

  col4.setAttribute("style", "display:flex;");
  document.getElementById("agregarDia").setAttribute("style", "display:block;");
  //console.log(arrayTotales);*/
}

//^Borrar un LI y actualiza el array
function borrarItem(removeA) {
  let ulDetalle = document.getElementById("ulDetalle"); // * obtengo el UL

  let padre = removeA.parentNode.parentNode;
  let liObjetivo = removeA.parentNode;

  let nHijo = 0;
  for (let i = 0; i < padre.children.length; i++) {
    if (padre.children[i] == removeA.parentNode) {
      nHijo = i; //* Aqui obtengo el indice para eliminar el array
      break;
    }
  }

  liObjetivo.remove();

  arrayTotales.splice(nHijo, 1); // *Aqui esta el array filtrado

  console.log(arrayTotales);

  if (arrayTotales.length == 0) {
    col4.setAttribute("style", "display:none;");
    document
      .getElementById("agregarDia")
      .setAttribute("style", "display:none;");
  }
}

function mostrarBotones() {
  let inputs = document.getElementsByClassName("objetivo");

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      document.getElementById("mis").setAttribute("style", "display:none;");
      document.getElementById("fav").setAttribute("style", "display:none;");
      break;
    } else {
      document.getElementById("mis").setAttribute("style", "display:block;");
      document.getElementById("fav").setAttribute("style", "display:block;");
    }
  }
}

//^Funcion que guarda los objetivos y la fecha
function guardarObjetivos() {
  //* En la variable id_usu esta el id de usuario de forma
  //let f = document.getElementById('fecha').value

  //TODO consulta a la base de datos
  //URL de la peticion
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
    .finally(() => {
      id_obj = d.id_objetivo;
    });

  //*Si el boton tiene el texto guardar

  if (
    this.innerHTML == "Guardar" &&
    inputC.value !== "" &&
    inputG.value !== "" &&
    inputH.value !== "" &&
    inputP.value !== ""
  ) {
    this.innerHTML = "Editar";
  } else {
    this.innerHTML = "Guardar";
  }
}

let id_obj = "";
//* FUNCION QUE SE EJECUTA AL CAMBIAR LA FECHA
//* Tiene  el id del objetivo
function traerIdOjetivo() {
  btnGuardar.innerHTML = "Guardar";
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
      id_obj = datos.id_objetivo;
    })
    .finally(() => {
      traer_recetas_objetivo(id_obj); //^Una vez realice la consulta LLENA ARRAYTOTALES

      //^Comprobar la fecha actuar con la seleccionada
      if (Date.parse(fecha_actual) > Date.parse(fecha.value)) {
        if (parseInt(id_obj) == -1) {
          //*Si no hay objetivo, borrar la tabla
          borrarTablaTotales();
        } else {
          // ? Si la fecha es menor ocultar inputs y el boton guardar
          // ! MAYOR y mostrar el listado de las recetas trayendo los datos de PHP
          //btnGuardar.setAttribute("style", "display:none");
          //inputObjetivosSiNo("display:none;");
          //TODO Crear estructura HTML desde el php para crear el listado
          //TODO con el objetivo del dia y con la suma de los objetivos
          myFetch(
            "./controller/lista_objetivo_sumaobjetivo.php",
            "id_objetivo=" + id_obj
          );
        }
      } else if (Date.parse(fecha_actual) < Date.parse(fecha.value)) {
        // ? Si la fecha es  MENOR ocultar inputs y el boton guardar
        // ? y pone el formulario para ingresar datos
        // ? y si hay objetivo EDITAR
        // !MENOR
        if (parseInt(id_obj) == -1) {
          //*Si no hay objetivo, borrar la tabla
          borrarTablaTotales();
        } else {
          //? si hay datos EDITAR
          borrarTablaTotales();
          ul.innerHTML= ""
          //col4.removeChild(ul)
          arrayTotales = [];
          //URL de la peticion
          let url = "./controller/lista_sumaobjs_para_edit.php";
          let d;
          //configurar la peticion. AQUI CONFIGURO LA PETICION
          let configFetch = {
            method: "POST",
            body: `id_objetivo=${id_obj}`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          };

          //mandar la peticion
          let promesa = fetch(url, configFetch);
          let r="";
          //Ejecutar la promesa que devuelve la peticion
          promesa
            .then((res) => res.json())
            .then((datos) => {                
                console.log(datos)                
                //*Una vez realizada la consulta llena ArrayTotales
                //*y cargar el listado
                
                llenaArrayTotales(datos)
                arrayTotales.forEach(cantidades => {
                  listarCantidades(cantidades)
                  traeObjetivo()                  
                });
              });
              
            //*Recorre el array y muestra el listado para editar
            // arrayTotales.forEach(fila => {
            //   cargarDatos(fila)
            // });
          
        }
      } else {
        // ! IGUAL
        console.log("Fechas Iguales");
      }
    });

  function borrarTablaTotales() {
    btnGuardar.setAttribute("style", 'display:""');
    col4.setAttribute("style", "display:none;");
    let t = document.querySelector("#tabla-totales");
    if(col4.contains(t)){//*Si existe la tabla la elimina
      col4.removeChild(t);      
    }
    //!Creo la lista que cree para añadir recetas al dia
    // document.createElement("ul");
    // ul.setAttribute("class", "ulDetalle");
    // ul.setAttribute("id", "ulDetalle");
    // col4.appendChild(ul);
    // inputObjetivosSiNo(
    //   "display:block;",
    //   "Calorias",
    //   "Grasas",
    //   "Hidratos",
    //   "Grasas"
    //);
  }
}

//* TRAE los SUMAOBJETIVOS Y LLENA ARRAYTOTALES
function traer_recetas_objetivo(objetivo) {
  console.log(objetivo);
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
    })
    .finally(() => {
      llenaArrayTotales(d); //^Una vez traiga los SUMAOBJETIVOS LLENA ARRAYTOTALES
      //   col4.setAttribute("style", "display:none;")
      //   ul.innerHTML=""
      //   arrayTotales.forEach(cantidades => {//^RECORRE EL ARRAY PARA MOSTRAR EL LISTADO
      //     listarCantidades(cantidades)// ^ MOSTRAR EL LISTADO
      //     //TODO Crear estructura HTML desde el php para crear el listado
      //     //TODO con el objetivo del dia y con la suma de los objetivos

      // });
    });
}

//*Añade el listado de recetas a la tabla suma objetivos
//* id_obj esta el id del objetivo
function agregarRecetasObjetivos() {
  console.log(id_obj);
  //Si el arrayTotales no esta vacio, guarda los datos
  if (arrayTotales.length > 0) {
    //*Recorrer el array para guardar en la BBDD fila a fila
    arrayTotales.forEach((fila) => {
      //console.log(fila);
      const cuerpo = `id_obj=${id_obj}&id_u=${id_usu}&id_r=${fila.idr}&tcalorias=${fila.tcalorias}&tgrasas=${fila.tgrasas}&thidratos=${fila.thidratos}&tproteinas=${fila.tproteinas}`;
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
          console.log("agregarRecetasObjetivos(): " + datos);
        });
    });
  }
}

//Muestra u oculta input de objetivos
function inputObjetivosSiNo(valorAtributo, c = "", g = "", h = "", p = "") {
  inputC.setAttribute("style", valorAtributo);
  inputC.previousSibling.textContent = c;
  inputG.setAttribute("style", valorAtributo);
  inputG.previousSibling.textContent = g;
  inputH.setAttribute("style", valorAtributo);
  inputH.previousSibling.textContent = h;
  inputP.setAttribute("style", valorAtributo);
  inputP.previousSibling.textContent = p;
}
