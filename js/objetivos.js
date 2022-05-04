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

let form = document.querySelector('#form');

window.addEventListener("load", function () {
  let fecha = document.querySelector("#fecha");
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
           arrayTotales.push(cantidades)//*Aqui estan las recetas que se han añadido            
         });        
   });

  console.log(id_r + " - " + id_u + " - " + nom_r)
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
  let a = document.createElement('a')
  a.setAttribute('href','#')
  a.setAttribute('onclick','borrarItem(this)')
  a.setAttribute('class','btn btn-primary')
  a.innerHTML = "X"

  //ul.setAttribute('id',ni)
  let li = document.createElement('li')
  li.innerHTML = `${cantidades.nombre_receta}: C-${cantidades.tcalorias}, G-${cantidades.tgrasas}, H-${cantidades.thidratos}, P-${cantidades.tproteinas} `  

  li.appendChild(a)
  //ul.appendChild(a)
  ul.appendChild(li)
  col4.appendChild(ul)

  col4.setAttribute("style", "display:flex;");

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
  //let d;
  //configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `id_u=${id_usu}&fecha=${f}&inputC=${inputC.value}&inputG=${inputG.value}&inputH=${inputH.value}&inputP=${inputP.value}`,

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
}

function ejecutar(e){
  console.log(e)
}





// ! ELiminar esto

// function llenarTablaFavoritos(){
//   let id_usu = $("#id_usu").text();
  
//   // * URL de la peticion
//   let url = "./controller/listado_favoritas.php";
  
//   //* configurar la peticion. AQUI CONFIGURO LA PETICION
//   let configFetch = {
//     method: "POST",
//     body: `id_usuario=${id_usu}`,
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   };

//   // * mandar la peticion
//   let promesa = fetch(url, configFetch);

//   // * Ejecutar la promesa que devuelve la peticion
//   promesa
//     .then((res) => res.json())
//     .then((datos) => {
//       let d = [];
     
//       // TODO llenar las recetas
//       let tbody = document.getElementsByTagName('tbody')[0]
      
//       for (let i = 0; i < datos.length; i++) {
//         let tr = document.createElement('tr')
//         tr.setAttribute('class','fila')

//         let td = document.createElement('td');        
//         td.style.display = "none"
//         td.innerHTML = datos[i].id_favorita
//         tr.appendChild(td)
        
//         td = document.createElement('td');
//         td.style.display = "none"
//         td.innerHTML = datos[i].id_rec
//         tr.appendChild(td)

//         td = document.createElement('td');
//         td.style.display = "none"
//         td.innerHTML = datos[i].id_usuarios
//         tr.appendChild(td)

//         td = document.createElement('td');
//         td.style.display = "none"
//         td.innerHTML = datos[i].id_usuario
//         tr.appendChild(td)

//         td = document.createElement('td');      
//         td.innerHTML = datos[i].nombre_receta
//         tr.appendChild(td)

//         td = document.createElement('td');
//         let btn = document.createElement('button')
//         btn.setAttribute('id','verBoton')
//         btn.addEventListener('click',ejecutar(e))
//         btn.innerHTML="VER"
//         td.appendChild(btn)
//         //td.innerHTML = datos[i].nick
//         tr.appendChild(td)

//         tr.appendChild(td)
//         tbody.appendChild(tr)
//       }

      

//     });
// }

// function llenarTablaMisRecetas(){
//   let id_usu = $("#id_usu").text();

//   // * URL de la peticion
//   let url = "./controller/listado_propias.php";

//   //* configurar la peticion. AQUI CONFIGURO LA PETICION
//   let configFetch = {
//     method: "POST",
//     body: `id_usuario=${id_usu}`,
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   };

//   // * mandar la peticion
//   let promesa = fetch(url, configFetch);

//   // * Ejecutar la promesa que devuelve la peticion
//   promesa
//     .then((res) => res.json())
//     .then((datos) => {
//       let d = [];
//       //d.push((datos));

//       console.log(datos);

//       // TODO llenar las recetas
//       let tbody = document.getElementsByTagName('tbody')[1]
      
//       for (let i = 0; i < datos.length; i++) {
//         let tr = document.createElement('tr')

//         let td = document.createElement('td');
//         td.style.display = "none"
//         td.innerHTML = datos[i].id_recetas
//         tr.appendChild(td)
        
//         td = document.createElement('td');
//         td.style.display = "none"
//         td.innerHTML = datos[i].id_usuario
//         tr.appendChild(td)    

//         td = document.createElement('td');
//         td.innerHTML = datos[i].nombre_receta
//         tr.appendChild(td)

//         // console.log(datos[i])
//         tr.appendChild(td)
//         tbody.appendChild(tr)
//       }

      

//     });
// }