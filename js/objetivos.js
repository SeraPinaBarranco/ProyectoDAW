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
  console.log(mes);
  console.log(fecha_actual);
  
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
    $('td>button').click(function(e){
      let tr = e.target.parentNode.parentNode.parentNode //fila de la tabla
      
      let aux=[]
      for (let i = 0; i < tr.cells.length; i++) {
        if(tr.cells[i].innerHTML.indexOf("<button>") < 0){          
          //console.log(tr.cells[i].innerHTML)        
          aux.push(tr.cells[i].innerHTML)          
        }
      }
      //arrayFila.push(aux)
      //console.log(arrayFila)
      //});
      /*
      TODO llamar a funcion que traiga los datos
      TODO de la base de datos y los ponga en la lista
      */
      cargarDatos(aux)
    })
    
});

function cargarDatos(receta){
  let id_r = receta[0]
  let id_u = receta[1]
  let nom_r = receta[2]

  console.log(id_r + " - " + id_u + " - " + nom_r)

  //TODO consulta a la base de datos

}

function ejecutar(e){
  console.log("e")
}





// ! ELiminaar esto

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