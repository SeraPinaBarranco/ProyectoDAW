window.addEventListener("load", function () {
  let fecha = document.querySelector("#fecha");
  const d = new Date();
  let mes = d.getMonth();

  if (mes.toString().length == 1) {
    // * Devuelve el mes actual condos digitos
    mes = "0" + (mes + 1);
  }

  let fecha_actual = `${d.getFullYear()}-${mes}-${d.getDate()}`;

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

  llenarTablaFavoritos();
  llenarTablaMisRecetas();

  $('#verBoton').click(function(){
    console.log(e)
  })
  
});


function llenarTablaFavoritos(){
  let id_usu = $("#id_usu").text();

  // * URL de la peticion
  let url = "./controller/listado_favoritas.php";

  //* configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `id_usuario=${id_usu}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  // * mandar la peticion
  let promesa = fetch(url, configFetch);

  // * Ejecutar la promesa que devuelve la peticion
  promesa
    .then((res) => res.json())
    .then((datos) => {
      let d = [];
     
      // TODO llenar las recetas
      let tbody = document.getElementsByTagName('tbody')[0]
      
      for (let i = 0; i < datos.length; i++) {
        let tr = document.createElement('tr')
        tr.setAttribute('class','fila')

        let td = document.createElement('td');        
        td.style.display = "none"
        td.innerHTML = datos[i].id_favorita
        tr.appendChild(td)
        
        td = document.createElement('td');
        td.style.display = "none"
        td.innerHTML = datos[i].id_rec
        tr.appendChild(td)

        td = document.createElement('td');
        td.style.display = "none"
        td.innerHTML = datos[i].id_usuarios
        tr.appendChild(td)

        td = document.createElement('td');
        td.style.display = "none"
        td.innerHTML = datos[i].id_usuario
        tr.appendChild(td)

        td = document.createElement('td');      
        td.innerHTML = datos[i].nombre_receta
        tr.appendChild(td)

        td = document.createElement('td');
        let btn = document.createElement('button')
        btn.setAttribute('id','verBoton')
        btn.innerHTML="VER"
        td.appendChild(btn)
        //td.innerHTML = datos[i].nick
        tr.appendChild(td)

        tr.appendChild(td)
        tbody.appendChild(tr)
      }

      

    });
}

function llenarTablaMisRecetas(){
  let id_usu = $("#id_usu").text();

  // * URL de la peticion
  let url = "./controller/listado_propias.php";

  //* configurar la peticion. AQUI CONFIGURO LA PETICION
  let configFetch = {
    method: "POST",
    body: `id_usuario=${id_usu}`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  // * mandar la peticion
  let promesa = fetch(url, configFetch);

  // * Ejecutar la promesa que devuelve la peticion
  promesa
    .then((res) => res.json())
    .then((datos) => {
      let d = [];
      //d.push((datos));

      console.log(datos);

      // TODO llenar las recetas
      let tbody = document.getElementsByTagName('tbody')[1]
      
      for (let i = 0; i < datos.length; i++) {
        let tr = document.createElement('tr')

        let td = document.createElement('td');
        td.style.display = "none"
        td.innerHTML = datos[i].id_recetas
        tr.appendChild(td)
        
        td = document.createElement('td');
        td.style.display = "none"
        td.innerHTML = datos[i].id_usuario
        tr.appendChild(td)    

        td = document.createElement('td');
        td.innerHTML = datos[i].nombre_receta
        tr.appendChild(td)

        // console.log(datos[i])
        tr.appendChild(td)
        tbody.appendChild(tr)
      }

      

    });
}