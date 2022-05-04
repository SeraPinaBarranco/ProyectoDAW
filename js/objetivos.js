

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
    
  let form = document.querySelector('#form');

  form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    let objetivo = document.getElementsByClassName('objetivo')
    let cont = 0;

  })  
  
});

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
           listarCantidades(cantidades, ni)
           arrayTotales.push(cantidades)//*Aqui estan las recetas que se han añadido
            
         });
         

   });

  console.log(id_r + " - " + id_u + " - " + nom_r)

  

}

let arrayTotales= [];
//Añadir una fila mas al listado
function listarCantidades(cantidades, indice){
  //arrayTotales.push(cantidades)//Aqui estan las recetas que se han añadido

  let col4 = document.querySelector('#col4')
  let ul = document.createElement('ul')
  ul.setAttribute('class','ulDetalle')
  let a = document.createElement('a')
  a.setAttribute('href','#')
  a.setAttribute('onclick','borrarItem(this)')
  a.setAttribute('class','btn btn-primary')
  a.innerHTML = "X"

  ul.setAttribute('id',ni)
  let li = document.createElement('li')
  li.innerHTML = `${cantidades.nombre_receta}: C-${cantidades.tcalorias}, G-${cantidades.tgrasas}, H-${cantidades.thidratos}, P-${cantidades.tproteinas} `  

  ul.appendChild(li)
  ul.appendChild(a)
  col4.appendChild(ul)

  col4.setAttribute("style", "display:flex;");

  ni ++

 // console.log(arrayTotales)
  
}

function borrarItem(prueba){
  let idFila =  prueba.parentNode.id //Valor del id de la fila
  let ulDetalle = document.getElementsByClassName('ulDetalle')

  for (let i = 0; i < ulDetalle.length; i++) {
    console.log(ulDetalle[i])  
    ulDetalle[i].remove() 
  }
  

  let fila = document.getElementById(idFila)

  //fila.remove()
  
  
  arrayTotales.splice(idFila, 1)// *Aqui esta el array filtrado
  
  let ul = document.querySelector('#col4 ul')
  //ul.remove() // * Elimina el listado para volver a llenarlo
  // if(ni > 0){
  //   ni=0
  // }
  //* recorrer array para llenar el listado con el array
  // arrayTotales.forEach(element => {
  //     listarCantidades(element)
  //     //console.log(element)
  // });

  console.log(arrayTotales)
  


  //console.log(idFila)
}

function ejecutar(e){
  console.log("e")
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